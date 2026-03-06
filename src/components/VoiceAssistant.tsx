import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, X, Loader2, Volume2, User, MessageCircle, MapPin, ClipboardCheck, CheckCircle2, AlertTriangle, Phone, Wifi } from 'lucide-react';

// --- Audio Utilities ---

class PCMPlayer {
  audioContext: AudioContext;
  nextStartTime: number;

  constructor(sampleRate = 24000) {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate });
    this.nextStartTime = this.audioContext.currentTime;
  }

  playBase64(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
    }

    const audioBuffer = this.audioContext.createBuffer(1, float32Array.length, this.audioContext.sampleRate);
    audioBuffer.getChannelData(0).set(float32Array);

    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);

    const startTime = Math.max(this.nextStartTime, this.audioContext.currentTime);
    source.start(startTime);
    this.nextStartTime = startTime + audioBuffer.duration;
  }

  stop() {
    if (this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    this.nextStartTime = this.audioContext.currentTime;
  }
}

class PCMRecorder {
  audioContext: AudioContext | null = null;
  stream: MediaStream | null = null;
  processor: ScriptProcessorNode | null = null;
  onData: (base64: string) => void;

  constructor(onData: (base64: string) => void) {
    this.onData = onData;
  }

  async start() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Media devices API not available.");
    }
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: {
        channelCount: 1,
        sampleRate: 16000,
    } });
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const source = this.audioContext.createMediaStreamSource(this.stream);
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
    
    this.processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const pcm16 = new Int16Array(inputData.length);
      for (let i = 0; i < inputData.length; i++) {
        let s = Math.max(-1, Math.min(1, inputData[i]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
      
      const buffer = new Uint8Array(pcm16.buffer);
      let binary = '';
      for (let i = 0; i < buffer.byteLength; i++) {
        binary += String.fromCharCode(buffer[i]);
      }
      this.onData(btoa(binary));
    };

    source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);
  }

  stop() {
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

const SuccessView = ({ userData }: { userData: any }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl max-w-md mx-auto border border-gray-100 animate-in fade-in zoom-in duration-300">
      <div className="text-green-500 mb-4 bg-green-50 p-4 rounded-full">
        <CheckCircle2 className="h-12 w-12" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Registration Complete!</h2>
      <p className="text-center text-gray-600 mt-2 text-lg">
        <span className="font-semibold text-gray-900">{userData.full_name}</span> bhai, your details are saved.
      </p>
      
      <div className="mt-8 p-5 bg-blue-50/50 border border-blue-100 rounded-xl w-full">
        <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
          <MapPin className="h-5 w-5 text-blue-600" /> Visit Our Hyderabad Office
        </h3>
        <p className="text-sm text-gray-700 font-medium leading-relaxed">
          H.NO. 04-009/NR. SURVEY NO. 43, Suchitra Rd, Kompally, Hyderabad, Telangana 500067
        </p>
        <a 
          href="https://maps.app.goo.gl/YourGoogleMapsLink" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 w-full bg-green-600 text-white text-center py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-sm"
        >
          <MapPin className="h-5 w-5" /> Open in Google Maps
        </a>
      </div>

      <div className="mt-6 w-full bg-gray-50 p-5 rounded-xl border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-gray-700" /> Office Visit Checklist
        </h3>
        <ul className="space-y-3 text-sm text-gray-700 font-medium">
          <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Original Passport (Check expiry date!)</li>
          <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Aadhaar Card (Linked to mobile)</li>
          <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> 10 White-Background Photos</li>
          <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Experience Certificates (If any)</li>
          <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Medical Fee Ready (Keep ₹15,000 aside for GAMCA)</li>
          <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Clean Clothes (For video profile)</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl w-full">
        <p className="text-sm text-red-700 font-medium flex items-start gap-2 leading-relaxed">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
          Reminder: No free flight tickets. Medical (GAMCA) is paid by the candidate.
        </p>
      </div>
    </div>
  );
};

// --- Component ---

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<{role: string, text: string}[]>([]);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  
  const sessionRef = useRef<any>(null);
  const playerRef = useRef<PCMPlayer | null>(null);
  const recorderRef = useRef<PCMRecorder | null>(null);

  const startSession = async () => {
    setIsConnecting(true);
    setError(null);
    setTranscript([]);
    setIsRegistrationComplete(false);
    setUserData(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      playerRef.current = new PCMPlayer(24000);
      
      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } },
          },
          systemInstruction: `**Role:** You are "Sathi," the trusted Recruitment Assistant for GulfPath. You are currently helping a candidate register their basic details so our team at the Hyderabad office can help them find a GCC job.

**Information Collection Goals:**
1. **Full Name:** Ask for their full name as per their Aadhaar or Passport.
2. **Contact Number:** Confirm their WhatsApp number for job alerts.
3. **Email:** Ask for an email. If they don't have one, say: "Koi baat nahi, bina email ke bhi kaam chal jayega" (No problem, it will work without email too).
4. **City & State:** Find out where they are currently located in India.

**Assistance & Trust Guidelines (Strict):**
- **Help First:** If the user sounds confused, explain *why* we need the info. "Bhai, sahi naam aur number hoga tabhi toh Dubai ki company aapse baat kar payegi" (Brother, only with the right name and number can the Dubai company talk to you).
- **The Flight Ticket Rule:** If they ask about travel, state: "GulfPath free flight tickets nahi deta. Yeh contract pe depend karta hai."
- **The Medical Rule:** Remind them: "Medical ka kharcha (GAMCA) aapko khud dena hoga."
- **Privacy Disclaimer:** You MUST assure the user by saying: "Aapka data hamare paas surakshit hai. Hum ise kisi galat agent ko nahi bechenge."
- **Office Bridge:** Once the info is collected, invite them: "Aap hamare Hyderabad office (Suchitra Road, Kompally) aakar apni file check karwa sakte hain."

**Conversational Flow (Procedural):**
- Start with a warm greeting: "Namaste! Main Sathi hoon. Aapko sahi job dilane ke liye mujhe aapki thodi jankari chahiye. Sabse pehle, aapka pura naam kya hai?"
- After the name, use it: "Dhanyawad [Name] bhai. Aapka mobile number kya hai?"
- Move to location: "Aap abhi kaunse shehar aur state mein reh rahe hain?"

**Extraction Logic (JSON Output for Backend):**
At the end of the collection, output the following JSON strictly:
{
  "full_name": string,
  "phone": string,
  "email": string,
  "city": string,
  "state": string,
  "is_data_complete": boolean
}`,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            
            recorderRef.current = new PCMRecorder((base64Data) => {
              sessionPromise.then((session) => {
                session.sendRealtimeInput({
                  media: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            });
            recorderRef.current.start().catch((err) => {
              console.warn("Microphone access denied or unavailable:", err);
              setError("Microphone access denied or unavailable.");
              stopSession();
            });
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle audio output
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && playerRef.current) {
              playerRef.current.playBase64(base64Audio);
            }
            
            // Handle interruption
            if (message.serverContent?.interrupted && playerRef.current) {
              playerRef.current.stop();
            }

            // Handle Transcriptions
            if (message.serverContent?.modelTurn?.parts[0]?.text) {
                const text = message.serverContent.modelTurn.parts[0].text;
                setTranscript(prev => [...prev, { role: 'Sathi', text }]);
                
                try {
                  const match = text.match(/\{[\s\S]*\}/);
                  if (match) {
                    const data = JSON.parse(match[0]);
                    if (data.is_data_complete) {
                      setUserData(data);
                      setIsRegistrationComplete(true);
                      stopSession();
                    }
                  }
                } catch (e) {
                  // Ignore parsing errors
                }
            }
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setError("Bhai, network weak hai. Maine aapka naam note kar liya hai, baaki baatein call reconnect hone par karenge.");
            stopSession();
          },
          onclose: () => {
            stopSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err: any) {
      console.error("Failed to start session:", err);
      setError(err.message || "Failed to start voice assistant.");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current = null;
    }
    if (playerRef.current) {
      playerRef.current.stop();
      playerRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
  };

  const toggleAssistant = () => {
    if (isOpen) {
      stopSession();
      setIsOpen(false);
    } else {
      setIsOpen(true);
      startSession();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleAssistant}
        className={`fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 ${
          isOpen ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isOpen ? <X className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
        {!isOpen && <span className="font-bold hidden md:inline pr-2">Talk to Sathi</span>}
      </button>

      {/* Full Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col pt-20 pb-24 px-4 md:px-8 animate-in fade-in duration-300">
          <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sathi Voice Assistant</h2>
              <p className="text-gray-500 text-lg">Your personal job guide. Speak naturally.</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-center font-medium">
                {error}
              </div>
            )}

            {isRegistrationComplete && userData ? (
              <div className="flex-1 overflow-y-auto pb-8">
                <SuccessView userData={userData} />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center relative">
                {/* Low Bandwidth Toggle */}
                <div className="flex justify-center mb-8">
                  <label className="flex items-center cursor-pointer bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                    <Wifi className={`h-4 w-4 mr-2 ${isLowBandwidth ? 'text-yellow-500' : 'text-green-500'}`} />
                    <span className="text-sm font-medium text-gray-700 mr-3">Low Bandwidth Mode</span>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={isLowBandwidth} 
                        onChange={(e) => setIsLowBandwidth(e.target.checked)} 
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${isLowBandwidth ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isLowBandwidth ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                  </label>
                </div>

                {/* Pulsing Avatar */}
                <div className="relative mb-12">
                  <div className={`absolute inset-0 bg-blue-500 rounded-full opacity-20 ${isConnected ? 'animate-ping' : ''}`} style={{ transform: 'scale(1.5)' }}></div>
                  <div className={`absolute inset-0 bg-blue-400 rounded-full opacity-30 ${isConnected ? 'animate-pulse' : ''}`} style={{ transform: 'scale(1.2)' }}></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 w-32 h-32 rounded-full flex items-center justify-center shadow-xl z-10">
                    {isConnecting ? (
                      <Loader2 className="h-12 w-12 text-white animate-spin" />
                    ) : isConnected ? (
                      <Volume2 className="h-12 w-12 text-white animate-pulse" />
                    ) : (
                      <Mic className="h-12 w-12 text-white" />
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    {isConnecting ? "Connecting to Sathi..." : isConnected ? "Listening..." : "Ready to help"}
                  </p>
                  <p className="text-gray-500">
                    {isConnected ? "Speak now. Sathi will reply automatically." : "Click the microphone to start."}
                  </p>
                </div>
              </div>
            )}

            {/* Transcript Area (Optional, good for feedback) */}
            {!isRegistrationComplete && transcript.length > 0 && (
              <div className="mt-8 bg-gray-50 rounded-2xl p-6 max-h-48 overflow-y-auto border border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Conversation</h3>
                <div className="space-y-4">
                  {transcript.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'User' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'Sathi' && <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0"><Volume2 className="h-4 w-4 text-blue-700" /></div>}
                      <div className={`p-3 rounded-2xl max-w-[80%] ${msg.role === 'User' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                      {msg.role === 'User' && <div className="bg-gray-200 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0"><User className="h-4 w-4 text-gray-600" /></div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isConnected && !isConnecting && !error && !isRegistrationComplete && (
              <button 
                onClick={startSession}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-2xl font-bold text-xl transition-colors shadow-lg mx-auto block"
              >
                Start Conversation
              </button>
            )}

            {isConnected && !isRegistrationComplete && (
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://wa.me/?text=GulfPath%20Office%20Address:%20H.NO.%2004-009/NR.%20SURVEY%20NO.%2043,%20Suchitra%20Rd,%20Kompally,%20Hyderabad,%20Telangana%20500067.%20Working%20Hours:%209:00%20AM%20to%206:00%20PM." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Office Address to WhatsApp
                </a>
                <a 
                  href="tel:+914012345678"
                  className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Phone className="h-5 w-5" />
                  Talk to a Human
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
