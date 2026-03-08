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
  };
  confidence_score: number;
  missing_fields: string[];
  follow_up_questions: string[];
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
                summary: { type: Type.STRING }
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
    throw error;
  }
};
