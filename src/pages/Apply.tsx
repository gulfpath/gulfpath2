import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GoogleGenAI, Type } from "@google/genai";
import {
  Mic,
  Video,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  Loader2,
} from "lucide-react";

export default function Apply() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else navigate("/vault"); // Redirect to vault after success
  };

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Media devices API not available.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await analyzeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Please allow microphone access to use this feature.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const analyzeAudio = async (blob: Blob) => {
    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const base64String = base64data.split(',')[1];

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-lite",
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: "audio/webm",
                  data: base64String,
                },
              },
              {
                text: `You are the Data Extraction Engine for GulfPath. Your task is to analyze transcripts of blue-collar workers speaking about their work history and convert them into a structured JSON format.
Mapping Rules:
1. Trade: Map informal terms to standard categories.
2. Experience: Extract the number of years.
3. Medical Awareness: Flag as true if the worker acknowledges they need to do/pay for their own medical test.
4. Office Visit: Flag as true if they show interest in visiting the Hyderabad office.
5. Visa Status: Extract any mentioned visa status (e.g., ECR, ECNR, Visit Visa, Cancelled Visa).

Extract and save the following JSON fields from the conversation:
{
  "full_name": string,
  "trade": string,
  "experience": number,
  "medical_confirmed": boolean,
  "office_visit_interest": boolean,
  "visa_status": string
}
Return ONLY a valid JSON object. Do not include any conversational text.`,
              },
            ],
          },
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                full_name: { type: Type.STRING, description: "Full name of the candidate" },
                trade: { type: Type.STRING, description: "Standardized trade category" },
                experience: { type: Type.NUMBER, description: "Years of experience as a number" },
                medical_confirmed: { type: Type.BOOLEAN, description: "True if they know they pay for medical" },
                office_visit_interest: { type: Type.BOOLEAN, description: "True if they want to visit the Hyderabad office" },
                visa_status: { type: Type.STRING, description: "Visa status or passport type (e.g., ECR, ECNR)" }
              },
            },
          },
        });

        if (response.text) {
          setExtractedData(JSON.parse(response.text));
        }
        setIsAnalyzing(false);
      };
    } catch (err) {
      console.error("Error analyzing audio:", err);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Apply for Job</h1>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            Step {step} of 4
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-12">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mic className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Tell us about your experience
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Tap the microphone and tell us in your own language: How many
                  years have you worked as an electrician? Where did you work
                  before?
                </p>
              </div>

              {!isAnalyzing && !extractedData && (
                <div className="flex justify-center">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 animate-pulse shadow-red-500/30"
                        : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/30"
                    }`}
                  >
                    <Mic className="h-12 w-12 text-white" />
                  </button>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                  <p className="text-gray-600 font-medium animate-pulse">Sathi AI is analyzing your audio...</p>
                </div>
              )}

              {extractedData && (
                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mt-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      Live-Resume Generated
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-blue-600">Profile Strength</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 transition-all duration-1000" 
                          style={{ width: `${
                            (extractedData.trade ? 20 : 0) + 
                            (extractedData.experience ? 20 : 0) + 
                            (extractedData.visa_status ? 20 : 0) + 
                            (extractedData.medical_confirmed ? 20 : 0) + 
                            (extractedData.office_visit_interest ? 20 : 0)
                          }%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-gray-500 block text-xs uppercase tracking-wider font-semibold mb-1">Trade</span>
                      <span className="font-medium text-gray-900">{extractedData.trade || 'Not specified'}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-gray-500 block text-xs uppercase tracking-wider font-semibold mb-1">Experience</span>
                      <span className="font-medium text-gray-900">{extractedData.experience ? `${extractedData.experience} Years` : 'Not specified'}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-gray-500 block text-xs uppercase tracking-wider font-semibold mb-1">Visa Status</span>
                      <span className="font-medium text-gray-900">{extractedData.visa_status || 'Not specified'}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-gray-500 block text-xs uppercase tracking-wider font-semibold mb-1">Office Visit</span>
                      <span className="font-medium text-gray-900">{extractedData.office_visit_interest ? 'Interested' : 'Not mentioned'}</span>
                    </div>
                  </div>

                  {(!extractedData.medical_confirmed || !extractedData.visa_status) && (
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                      <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-900 text-sm">Action Required</h4>
                        <p className="text-amber-800 text-xs mt-1">
                          {!extractedData.visa_status && "• Please mention your visa status or passport type (ECR/ECNR). "}
                          {!extractedData.medical_confirmed && "• Remember: You will need to pay for your own GAMCA medical test in India (approx ₹10,000-₹15,000). Visa and tickets are free."}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={() => setExtractedData(null)}
                      className="text-sm text-gray-500 font-medium hover:text-gray-900 transition-colors"
                    >
                      Record Again
                    </button>
                  </div>
                </div>
              )}

              {!isAnalyzing && !extractedData && (
                <div className="text-center mt-6">
                  <p
                    className={`text-sm font-medium ${isRecording ? "text-red-500" : "text-gray-500"}`}
                  >
                    {isRecording
                      ? "Recording... Tap to stop"
                      : "Tap to start recording"}
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="h-10 w-10 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Upload a Trade Test Video
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Employers want to see your skills. Upload a short 1-minute
                  video showing you doing electrical work safely.
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-900 font-medium mb-2">
                  Tap to select a video from your phone
                </p>
                <p className="text-gray-500 text-sm">MP4, WebM up to 50MB</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Verify your Passport
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We need to check your ECR/ECNR status to ensure smooth visa
                  processing.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <UploadCloud className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Upload Passport Photo
                      </h3>
                      <p className="text-sm text-gray-500">
                        Front and back pages
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <ShieldCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Fetch from DigiLocker
                      </h3>
                      <p className="text-sm text-gray-500">Fast and secure</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Application Submitted!
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Your profile has been sent to Al Futtaim Group. We will notify
                you via WhatsApp when they review your application.
              </p>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-left max-w-md mx-auto">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Safety Reminder
                </h3>
                <p className="text-sm text-blue-800">
                  This employer covers all visa and flight costs. Do not pay
                  anyone who claims they can speed up your application.
                </p>
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-100">
            {step > 1 && step < 4 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-gray-500 font-medium hover:text-gray-900 px-6 py-3"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors flex items-center gap-2 ml-auto shadow-lg shadow-blue-600/20"
            >
              {step === 4 ? "Go to My Vault" : "Continue"}
              {step !== 4 && <ArrowRight className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
