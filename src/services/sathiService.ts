import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `
# ROLE
You are "Sathi," an expert Lead Recruitment Agent specializing in the India-to-GCC labor corridor. You convert informal audio or text inputs from blue-collar workers into structured, professional recruitment profiles.

# CORE CAPABILITIES
- Understand Hindi, Hinglish, Telugu, Tamil, and other Indian regional languages
- Map informal job descriptions to industry-standard trade titles
- Identify GCC-specific compliance requirements (ECR/ECNR, Gulf Return status)
- Extract experience, skills, and location from unstructured speech

# QUALIFICATION & EDUCATION INSTRUCTIONS
Your goal is to find out the user's educational status to determine if they are ECR or ECNR and if they qualify for high-salary 'Gold' roles.
1. Step 1: Ask: 'Bhai, kya aapne 10th pass kiya hai?' (Brother, have you passed 10th?). Explain that 10th pass means faster visa processing (ECNR).
2. Step 2: If they say yes, ask for their board (State/CBSE). If no, say: 'Koi baat nahi, aapke hunar (skill) ki zyada keemat hai. Hum tab bhi acchi naukri dhoondenge.'
3. Step 3: Ask about technical training: 'Kya aapne ITI ya koi diploma kiya hai?' (Have you done ITI or a diploma?).
4. Step 4: If they have a certificate, ask them to take a clear photo of it. Say: 'Iska ek saaf photo kheenchiye, main ise verify kar ke aapke profile par Gold Badge laga dungi!'

# TRADE MAPPING EXAMPLES
- "Mera kaam wiring ka hai" -> "Residential Electrician"
- "Main AC theek karta hoon" -> "HVAC Technician"
- "Pipe fitting aur plumbing" -> "Plumber / Pipefitter"
- "Crane chalata hoon" -> "Crane Operator"
- "Security guard ka kaam" -> "Security Personnel"
- "Tiles aur marble ka kaam" -> "Marble & Tile Fixer"
- "Painting ka kaam" -> "Industrial / Residential Painter"
- "Driver hoon, heavy vehicle" -> "Heavy Vehicle Driver (HVD)"

# GCC COMPLIANCE RULES
- ECR passport = Emigration Check Required (unskilled/semi-skilled workers, needs clearance to travel to GCC)
- ECNR = Emigration Check Not Required (skilled/educated workers, easier travel)
- Gulf Return = worker has prior GCC experience (highly valued by recruiters)
- Flag if passport status is unclear — never assume

# BEHAVIOR RULES
1. Always output ONLY a valid JSON object — no greetings, no explanations, no markdown
2. If information is missing, use null — never guess or hallucinate
3. If the worker mentions multiple trades, list the primary one first
4. Confidence score reflects how complete and clear the input was (0.0 = very unclear, 1.0 = all fields captured perfectly)
5. Summary must be in English, professional, and 2-3 sentences max
`;

export interface SathiProfileResponse {
  worker_profile: {
    name: string | null;
    age: number | null;
    trade_primary: string;
    trade_secondary: string | null;
    exp_years: number | null;
    is_gulf_return: boolean;
    previous_gulf_countries: string[];
    passport_type: "ECR" | "ECNR" | "Unknown";
    current_location: string | null;
    target_countries: string[];
    languages_spoken: string[];
    summary: string;
    qualification_meta?: {
      schooling_status: "BELOW_10TH" | "10TH_PASS" | "12TH_PASS";
      passport_status: "ECR" | "ECNR";
      technical_training: {
        type: string;
        trade: string;
        verified: boolean;
      };
    };
  };
  confidence_score: number;
  missing_fields: string[];
  follow_up_questions: string[];
}

export interface DocumentVerificationResponse {
  document_valid: boolean;
  type: string;
  ecnr_status: string;
  prn_number?: string;
  rejection_reason?: 'blurry' | 'mismatch' | 'fake' | 'other' | null;
}

export const extractProfileFromText = async (text: string): Promise<SathiProfileResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: text,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            worker_profile: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, nullable: true },
                age: { type: Type.NUMBER, nullable: true },
                trade_primary: { type: Type.STRING },
                trade_secondary: { type: Type.STRING, nullable: true },
                exp_years: { type: Type.NUMBER, nullable: true },
                is_gulf_return: { type: Type.BOOLEAN },
                previous_gulf_countries: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                passport_type: {
                  type: Type.STRING,
                  enum: ["ECR", "ECNR", "Unknown"]
                },
                current_location: { type: Type.STRING, nullable: true },
                target_countries: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                languages_spoken: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                summary: { type: Type.STRING },
                qualification_meta: {
                  type: Type.OBJECT,
                  nullable: true,
                  properties: {
                    schooling_status: {
                      type: Type.STRING,
                      enum: ["BELOW_10TH", "10TH_PASS", "12TH_PASS"]
                    },
                    passport_status: {
                      type: Type.STRING,
                      enum: ["ECR", "ECNR"]
                    },
                    technical_training: {
                      type: Type.OBJECT,
                      properties: {
                        type: { type: Type.STRING },
                        trade: { type: Type.STRING },
                        verified: { type: Type.BOOLEAN }
                      },
                      required: ["type", "trade", "verified"]
                    }
                  },
                  required: ["schooling_status", "passport_status", "technical_training"]
                }
              },
              required: [
                "trade_primary",
                "is_gulf_return",
                "previous_gulf_countries",
                "passport_type",
                "target_countries",
                "languages_spoken",
                "summary"
              ]
            },
            confidence_score: { type: Type.NUMBER },
            missing_fields: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            follow_up_questions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["worker_profile", "confidence_score", "missing_fields", "follow_up_questions"]
        }
      }
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) {
      throw new Error("Empty response from Sathi");
    }
    
    return JSON.parse(jsonStr) as SathiProfileResponse;
  } catch (error) {
    console.error("Error extracting profile with Sathi:", error);
    throw new Error("We couldn't process your profile at this time. Please check your connection and try again.");
  }
};

export const verifyDocument = async (
  base64Image: string,
  mimeType: string,
  profileName: string
): Promise<DocumentVerificationResponse> => {
  try {
    const prompt = `Analyze the attached image of the educational document.
1. Identify Type: Is it a 10th Class Marksheet, an ITI National Trade Certificate (NCTVT), or an SCVT Diploma?
2. Extract Key Info: Look for Name, Date of Birth, Certificate Number, and the Year of Passing.
3. Validation Check: Does the name match the user's profile name ('${profileName}')? Is the seal of the 'National Council for Vocational Training' or 'State Board' visible? Is the image clear and readable?
4. Output (JSON): { "document_valid": true/false, "type": "ITI_NCTVT", "ecnr_status": "Eligible", "prn_number": "123456", "rejection_reason": "blurry" | "mismatch" | "fake" | null } (Look for the 2026 SID Permanent Registration Number for PRN. If document_valid is false, provide a rejection_reason: 'blurry' if unreadable, 'mismatch' if name doesn't match, 'fake' if it looks tampered or not a real document)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: mimeType,
            },
          },
          { text: prompt }
        ]
      },
      config: {
        // responseMimeType and responseSchema are not supported for nano banana series models
      }
    });

    let jsonStr = '';
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.text) {
        jsonStr += part.text;
      }
    }

    // Try to extract JSON from markdown if present
    const jsonMatch = jsonStr.match(/```json\n([\s\S]*?)\n```/) || jsonStr.match(/```\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      jsonStr = jsonMatch[1];
    }

    return JSON.parse(jsonStr.trim()) as DocumentVerificationResponse;
  } catch (error) {
    console.error("Error verifying document:", error);
    throw new Error("Failed to verify the document. Please ensure the image is clear and try again.");
  }
};
