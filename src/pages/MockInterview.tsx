import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type } from '@google/genai';
import { Mic, Video, VideoOff, PlayCircle, StopCircle, User, CheckCircle2, ChevronRight, Download, MapPin, Phone, Briefcase, Star, AlertCircle, ClipboardCheck, MessageCircle, Share2, Navigation } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

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

type Phase = 'intro' | 'info' | 'interview' | 'results';

interface AssessmentData {
  score: number;
  summary: string;
  questions: {
    q: string;
    a: string;
    feedback: string;
    score: number;
  }[];
}

export default function MockInterview() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [userData, setUserData] = useState({ name: '', trade: '', phone: '', location: '' });
  const [language, setLanguage] = useState('Hindi');
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [latestAiTranscript, setLatestAiTranscript] = useState<string>("Waiting for Mr. Gulfpath to speak...");
  const [confidenceScore, setConfidenceScore] = useState(85);
  
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const sessionRef = useRef<any>(null);
  const playerRef = useRef<PCMPlayer | null>(null);
  const recorderRef = useRef<PCMRecorder | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const frameIntervalRef = useRef<number | null>(null);

  // Simulate confidence meter fluctuation
  useEffect(() => {
    if (phase === 'interview' && isConnected) {
      const interval = setInterval(() => {
        setConfidenceScore(prev => {
          const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
          return Math.min(100, Math.max(60, prev + change));
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [phase, isConnected]);

  const generateProfessionalImage = async () => {
    if (!latestFrame) {
      setImageError("No video frame captured. Please ensure your camera was on during the interview.");
      return;
    }

    try {
      setIsGeneratingImage(true);
      setImageError(null);

      // Check for API key
      const win = window as any;
      if (win.aistudio && !(await win.aistudio.hasSelectedApiKey())) {
        await win.aistudio.openSelectKey();
        // Assume success after triggering
      }

      // Create a new instance right before making the call to ensure the latest key is used
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: latestFrame,
                mimeType: 'image/jpeg',
              },
            },
            {
              text: 'Enhance this image to look like a professional passport photo. The person should be wearing a clean, professional uniform or suit suitable for a skilled trade worker. The background should be a solid light blue or white. High quality, professional lighting.',
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        }
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/jpeg;base64,${part.inlineData.data}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        setImageError("Failed to generate image. Please try again.");
      }
    } catch (err: any) {
      console.error("Image generation error:", err);
      setImageError(err.message || "An error occurred while generating the image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const startVideo = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        setIsVideoEnabled(false);
        return;
      }
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideo = devices.some(device => device.kind === 'videoinput');
      if (!hasVideo) {
        setIsVideoEnabled(false);
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setIsVideoEnabled(false);
    }
  };

  const stopVideo = () => {
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach(track => track.stop());
      videoStreamRef.current = null;
    }
    if (frameIntervalRef.current) {
      clearInterval(frameIntervalRef.current);
      frameIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (phase === 'interview' || phase === 'results') {
      if (isVideoEnabled) startVideo();
      else stopVideo();
    }
    return () => stopVideo();
  }, [isVideoEnabled, phase]);

  useEffect(() => {
    if (phase === 'interview' && isConnected && userData.name && sessionRef.current) {
      const trade = userData.trade || 'General Labor';
      
      const startPrompt = `
        The user is now ready. Start the interview immediately.
        Address them as: Namaste ${userData.name} bhai. 
        Identify yourself as Mr. Gulfpath.
        State the rules: 10 minutes, 10 questions, all about ${trade}.
        State the cheating policy: No cheating allowed, any form of cheating will result in a permanent ban from the platform.
        Ask if they are ready, and wait for their confirmation before asking the first question.
      `;

      try {
        sessionRef.current.sendClientContent({
          turns: [
            {
              role: "user",
              parts: [{ text: startPrompt }],
            },
          ],
          turnComplete: true,
        });
      } catch (err) {
        console.error("Failed to send start prompt:", err);
      }
    }
  }, [phase, isConnected, userData.name, userData.trade]);

  const [latestFrame, setLatestFrame] = useState<string | null>(null);

  const captureAndSendFrame = () => {
    if (!videoRef.current || !canvasRef.current || !sessionRef.current || !isConnected) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64Data = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];
        setLatestFrame(base64Data);
        sessionRef.current.sendRealtimeInput({
          media: { data: base64Data, mimeType: 'image/jpeg' }
        });
      }
    }
  };

  const startInterview = async () => {
    setPhase('interview');
    setIsConnecting(true);
    setError(null);
    setLatestAiTranscript("Connecting to Mr. Gulfpath...");

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
          systemInstruction: `**Role:** You are "Mr. Gulfpath," the Senior Recruitment Officer. You are professional, strict but fair, and highly knowledgeable about GCC trades.
**Candidate Info:** Name: ${userData.name}, Trade: ${userData.trade}, Location: ${userData.location}.
**Language:** Speak primarily in ${language}. You must use respectful cultural honorifics (e.g., "Bhai", "Garu", "Anna"). Avoid corporate jargon.

**Immediate Trigger (Phase 3 Start):**
As soon as you receive the user's Name and Trade, start speaking immediately. 
- **Greeting:** "Namaste ${userData.name} bhai. Main Mr. Gulfpath hoon. Aapka data mere paas aa gaya hai."
- **The Terms:** "Aaj ka interview 10 minute ka hoga, aur main aapse aapke kaam, yaani ${userData.trade}, se jude 10 zaruri sawal puchunga. Dhyan rahe, kisi bhi tarah ki cheating (jaise kisi aur se madad lena ya internet ka istemal karna) sakht mana hai. Agar aap cheating karte hue paye gaye, toh aapko platform se permanently ban kar diya jayega. Kya aap taiyar hain?"

**Scam-Shield Interrupt (CRITICAL):**
If the user ever mentions "security deposit", "advance payment", or "agent fee", IMMEDIATELY stop the interview flow and say: "Savdhaan! GulfPath kabhi bhi advance ya security deposit nahi mangta. Agar kisi ne aapse paise mange hain, toh woh fraud hai. Kripya turant hamare Hyderabad office mein report karein."

**Interview Structure (The 10-Question Trade Test):**
1. **Pacing & Listening (CRITICAL):** You have 10 minutes. Ask ONE question at a time and WAIT for the user to answer. DO NOT rush. Listen carefully to their answer before asking the next question. Give them ample time to respond.
2. **Trade-Specific Content:** 
   - 8 Questions must be technical (e.g., for an Electrician: "3-phase motor wiring," "Safety fuse vs MCB," "Tool names").
   - 2 Questions must be about GCC life/Safety (e.g., "Heatstroke prevention," "Worksite safety").
3. **Progress Tracking:** After every 3 questions, tell them: "Aapne 3 sawal pure kar liye hain, 7 aur baaki hain."

**Final Transition & Feedback Logic:**
After Question 10, you MUST do the following IN ORDER:
1. Call the \`submitAssessment\` tool. Calculate the final score. The score MUST be a single integer from 1 to 10 (e.g., 6, 7, 8). ABSOLUTELY NO SCORES ABOVE 10.
2. Wait for the tool response.
3. Once the tool is submitted, speak to the candidate. Give them a short, natural verbal feedback on how they did. Tell them their score out of 10.
4. Close the interview by asking them to visit the GulfPath office and informing them that our executive will get in touch with them shortly.
5. DO NOT hallucinate any job offers, visas, or salaries. Stick strictly to your role as an assessor.

When generating the feedback for the tool, look for these 3 specific markers:
1. **Technical Accuracy:** Did they use the right names for tools?
2. **Language Confidence:** Did they answer clearly in their chosen language?
3. **Safety Mindset:** Did they mention safety gear (PPE) or precautions?`,
          tools: [{
            functionDeclarations: [{
              name: "submitAssessment",
              description: "Submit the final assessment report after the mock interview is complete.",
              parameters: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.INTEGER, description: "Final score. MUST be an integer between 1 and 10. Maximum value is 10." },
                  summary: { type: Type.STRING, description: "Short paragraph summary of the candidate's performance" },
                  questions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        q: { type: Type.STRING, description: "The question asked" },
                        a: { type: Type.STRING, description: "The candidate's answer" },
                        feedback: { type: Type.STRING, description: "Internshala-style critique. Must evaluate Technical Accuracy, Language Confidence, and Safety Mindset." },
                        score: { type: Type.NUMBER, description: "Score for this answer out of 5" }
                      }
                    }
                  }
                },
                required: ["score", "summary", "questions"]
              }
            }]
          }],
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            setLatestAiTranscript("Interview started. Mr. Gulfpath is speaking...");
            
            recorderRef.current = new PCMRecorder((base64Data) => {
              sessionPromise.then((session) => {
                session.sendRealtimeInput({
                  media: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            });
            recorderRef.current.start().catch((err) => {
              setError("Microphone access denied.");
              stopInterview();
            });

            if (isVideoEnabled) {
              frameIntervalRef.current = window.setInterval(captureAndSendFrame, 1000);
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            // Play audio
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && playerRef.current) {
              playerRef.current.playBase64(base64Audio);
            }
            
            // Update Live Transcript
            if (message.serverContent?.modelTurn?.parts[0]?.text) {
              setLatestAiTranscript(message.serverContent.modelTurn.parts[0].text);
            }
            
            // Handle tool calls
            if (message.toolCall) {
              const call = message.toolCall.functionCalls.find(c => c.name === 'submitAssessment');
              if (call) {
                const args = call.args as unknown as AssessmentData;
                setAssessment(args);
                setPhase('results');
                
                // Trigger Confetti if score >= 7
                if (args.score >= 7) {
                  confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#2563EB', '#F59E0B', '#10B981'] // GulfPath colors
                  });
                  
                  // Trigger WhatsApp Webhook (Simulated)
                  fetch('/api/webhook/whatsapp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      phone: userData.phone,
                      name: userData.name,
                      score: args.score,
                      reportUrl: `https://gulfpath.in/verify/${userData.phone}`
                    })
                  }).catch(console.error); // Ignore errors for demo
                }

                // Send tool response to continue the conversation
                sessionPromise.then(session => {
                  session.sendToolResponse({
                    functionResponses: [{
                      id: call.id,
                      name: call.name,
                      response: { status: "success" }
                    }]
                  });
                });
              }
            }
            
            if (message.serverContent?.interrupted && playerRef.current) {
              playerRef.current.stop();
            }
          },
          onerror: (err) => {
            setError("Connection error. Please try again.");
            stopInterview();
          },
          onclose: () => {
            stopInterview();
          }
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err: any) {
      setError(err.message || "Failed to start mock interview.");
      setIsConnecting(false);
    }
  };

  const stopInterview = () => {
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
    if (frameIntervalRef.current) {
      clearInterval(frameIntervalRef.current);
      frameIntervalRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
  };

  useEffect(() => {
    return () => {
      stopInterview();
      stopVideo();
    };
  }, []);

  const renderStepper = () => (
    <div className="flex items-center justify-center mb-12 print:hidden">
      {['Identity', 'Trade Check', '10x10 Interview', 'Result'].map((step, index) => {
        const stepPhases = ['intro', 'info', 'interview', 'results'];
        const isActive = phase === stepPhases[index];
        const isPast = stepPhases.indexOf(phase) > index;
        
        return (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-sm transition-colors
              ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 
                isPast ? 'bg-emerald-500 border-emerald-500 text-white' : 
                'bg-slate-800 border-slate-600 text-slate-400'}`}>
              {isPast ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
            </div>
            <span className={`ml-3 font-medium hidden sm:block ${isActive ? 'text-white' : isPast ? 'text-emerald-400' : 'text-slate-500'}`}>
              {step}
            </span>
            {index < 3 && (
              <div className={`w-12 sm:w-24 h-1 mx-4 rounded-full ${isPast ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B1120] pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans print:bg-white print:pt-0 print:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Financial Transparency Banner */}
        {phase !== 'results' && (
          <div className="bg-amber-500/10 border border-amber-500/50 rounded-xl p-4 mb-8 flex items-start gap-3 print:hidden">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-400 font-bold text-sm">GulfPath Transparency Notice</p>
              <p className="text-amber-200/80 text-sm mt-1">
                We charge ZERO recruitment fees. However, Flight Tickets are NOT free and GAMCA Medical (approx. ₹5,000-₹8,000) is paid by the candidate.
              </p>
            </div>
          </div>
        )}

        {renderStepper()}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8 text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* PHASE 1: INTRO */}
        {phase === 'intro' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-2xl">
            <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-12 h-12 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6">Welcome to the Mock Interview</h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Mr. Gulfpath is here to help you practice so you don't get nervous with the real Dubai boss. 
              This is a safe space to test your skills and get a "Report Card" to show at our Kompally office.
            </p>
            <button 
              onClick={() => setPhase('info')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 mx-auto shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-1"
            >
              Let's Get Started <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* PHASE 2: INFO COLLECTION */}
        {phase === 'info' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Tell us about yourself</h2>
            <p className="text-slate-400 text-center mb-8">This helps Mr. Gulfpath ask the right questions.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    value={userData.name}
                    onChange={e => setUserData({...userData, name: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Trade / Job Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    value={userData.trade}
                    onChange={e => setUserData({...userData, trade: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Electrician, Plumber, Welder"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="tel" 
                      value={userData.phone}
                      onChange={e => setUserData({...userData, phone: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="10-digit number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Current City</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="text" 
                      value={userData.location}
                      onChange={e => setUserData({...userData, location: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g. Hyderabad"
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={startInterview}
                disabled={!userData.name || !userData.trade}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                Start Mock Interview <PlayCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* PHASE 3: INTERVIEW */}
        {phase === 'interview' && (
          <div className="flex flex-col h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
              {/* Left Side: Mr. Gulfpath */}
              <div className="bg-slate-800 rounded-3xl border border-slate-700 flex flex-col overflow-hidden relative">
                <div className="absolute top-4 left-4 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/30 backdrop-blur-sm z-10">
                  Interviewer
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-slate-900/50"></div>
                  
                  <div className="w-48 h-48 bg-slate-900 rounded-full flex items-center justify-center mb-8 relative shadow-2xl">
                    {isConnected && (
                      <>
                        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-20"></div>
                        <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-pulse opacity-40"></div>
                      </>
                    )}
                    <img 
                      src="https://picsum.photos/seed/mrgulfpath/300/300" 
                      alt="Mr. Gulfpath" 
                      className="w-44 h-44 rounded-full object-cover border-4 border-slate-800 relative z-10"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white relative z-10">Mr. Gulfpath</h2>
                  <p className="text-blue-400 font-medium mb-8 relative z-10">Senior Recruitment Officer</p>
                  
                  {/* Live Transcript Box */}
                  <div className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 relative z-10 min-h-[120px] flex items-center justify-center text-center">
                    <p className="text-lg text-slate-300 font-medium italic">
                      "{latestAiTranscript}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: User Video */}
              <div className="bg-slate-800 rounded-3xl border border-slate-700 flex flex-col overflow-hidden relative">
                <div className="absolute top-4 left-4 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30 backdrop-blur-sm z-10">
                  Candidate
                </div>
                
                {/* Confidence Meter */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 px-4 py-2 rounded-xl z-10 flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-bold uppercase">Confidence</span>
                  <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${confidenceScore > 75 ? 'bg-emerald-500' : confidenceScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${confidenceScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-white">{confidenceScore}%</span>
                </div>

                <div className="flex-1 bg-slate-900 relative">
                  {isVideoEnabled ? (
                    <>
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="w-full h-full object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                      <VideoOff className="h-16 w-16 mb-4 opacity-50" />
                      <p>Camera is disabled</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Control Bar */}
            <div className="mt-6 bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-400">Language:</span>
                <div className="flex bg-slate-900 rounded-lg p-1">
                  {['Hindi', 'Telugu', 'Tamil'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${language === lang ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`p-3 rounded-full transition-colors ${isVideoEnabled ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
                >
                  {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </button>
                <button 
                  onClick={stopInterview}
                  className="bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2"
                >
                  <StopCircle className="h-5 w-5" />
                  End Early
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 4: RESULTS DASHBOARD */}
        {phase === 'results' && assessment && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 print:space-y-4">
            {/* Top Summary Card (Certificate Style) */}
            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl print:bg-white print:border-gray-300 print:shadow-none print:text-black">
              <div className="relative w-40 h-40 shrink-0 print:hidden">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1E293B" strokeWidth="10" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke={Math.min(assessment.score, 10) >= 7 ? "#10B981" : Math.min(assessment.score, 10) >= 5 ? "#F59E0B" : "#EF4444"} 
                    strokeWidth="10" 
                    strokeDasharray={`${(Math.min(assessment.score, 10) / 10) * 283} 283`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">{Math.min(assessment.score, 10)}</span>
                  <span className="text-sm text-slate-400 font-bold">/ 10</span>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-500/20 print:bg-gray-100 print:text-gray-800 print:border-gray-300">
                  <Star className="w-4 h-4" /> Official GulfPath Assessment
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 print:text-black">
                  {userData.name} - {userData.trade}
                </h2>
                <div className="text-xl font-semibold mb-4 print:text-gray-800">
                  <span className={Math.min(assessment.score, 10) >= 7 ? "text-emerald-400" : Math.min(assessment.score, 10) >= 5 ? "text-yellow-400" : "text-red-400"}>
                    Score: {Math.min(assessment.score, 10)}/10
                  </span>
                  <span className="text-slate-400 mx-2">|</span>
                  <span className="text-slate-400">{userData.location}</span>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed print:text-gray-700 mb-6">
                  {assessment.summary}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start print:hidden">
                  {assessment.score >= 7 && (
                    <>
                      <a 
                        href={`https://wa.me/?text=Wah!%20Mubarak%20ho,%20${userData.name}%20bhai!%20%F0%9F%8E%89%0AAapne%20Mr.%20Gulfpath%20ka%2010x10%20Trade%20Test%20kamyabi%20se%20pura%20kar%20liya%20hai.%0A%F0%9F%93%8A%20Score:%20${assessment.score}/10%0A%F0%9F%93%84%20Report:%20https://gulfpath.in/verify/${userData.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Share2 className="w-5 h-5" /> Ghar walo ko dikhayein
                      </a>
                      <a 
                        href="https://maps.google.com/?q=Suchitra+Road,+Kompally,+Hyderabad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Navigation className="w-5 h-5" /> Route to Office
                      </a>
                    </>
                  )}
                  <button 
                    onClick={() => window.print()}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Download className="w-5 h-5" /> Download Report
                  </button>
                  {isConnected && (
                    <button 
                      onClick={stopInterview}
                      className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <StopCircle className="w-5 h-5" /> End Session
                    </button>
                  )}
                </div>
              </div>

              {/* QR Code for Print */}
              <div className="hidden print:flex flex-col items-center justify-center border-l border-gray-200 pl-8 ml-4">
                <QRCodeSVG value={`https://gulfpath.in/verify/${userData.phone}`} size={100} />
                <span className="text-xs text-gray-500 mt-2 font-mono">SCAN TO VERIFY</span>
              </div>
            </div>

            {/* Q&A Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 print:text-black">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center print:bg-gray-200">
                    <ClipboardCheck className="w-4 h-4 text-white print:text-gray-800" />
                  </div>
                  Technical Evaluation
                </h3>
                
                {assessment.questions.map((q, i) => (
                  <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 relative overflow-hidden print:bg-white print:border-gray-200 print:break-inside-avoid">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 print:bg-gray-400"></div>
                    
                    <div className="mb-4">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 block print:text-gray-500">Q{i+1}: Mr. Gulfpath</span>
                      <p className="text-white font-medium text-lg print:text-black">{q.q}</p>
                    </div>
                    
                    <div className="mb-6 pl-4 border-l-2 border-slate-700 print:border-gray-300">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 block print:text-gray-500">Candidate Answer</span>
                      <p className="text-slate-300 italic print:text-gray-700">"{q.a}"</p>
                    </div>
                    
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex gap-4 print:bg-gray-50 print:border-gray-200">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold print:bg-gray-200 print:text-gray-800">
                        {q.score}/5
                      </div>
                      <div>
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 block print:text-gray-500">AI Feedback (Timestamp: {Math.floor(Math.random() * 9) + 1}:{Math.floor(Math.random() * 50) + 10})</span>
                        <p className="text-indigo-200 text-sm print:text-gray-700">{q.feedback}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* The Kompally Bridge & AI Image */}
              <div className="lg:col-span-1 print:hidden space-y-8">
                {/* AI Profile Picture Generator */}
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" /> Professional Profile
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Use Gemini 3.1 Flash Image to enhance your interview frame into a professional passport photo.
                  </p>
                  
                  {generatedImage ? (
                    <div className="space-y-4">
                      <img src={generatedImage} alt="Professional Profile" className="w-full rounded-2xl border-4 border-slate-700" />
                      <button 
                        onClick={() => {
                          const a = document.createElement('a');
                          a.href = generatedImage;
                          a.download = 'professional_profile.jpg';
                          a.click();
                        }}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" /> Save Photo
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {latestFrame && (
                        <div className="relative rounded-2xl overflow-hidden border-4 border-slate-700 opacity-50">
                          <img src={`data:image/jpeg;base64,${latestFrame}`} alt="Captured Frame" className="w-full" />
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                            <span className="text-white font-medium text-sm">Original Frame</span>
                          </div>
                        </div>
                      )}
                      {imageError && (
                        <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{imageError}</p>
                      )}
                      <button 
                        onClick={generateProfessionalImage}
                        disabled={isGeneratingImage || !latestFrame}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                      >
                        {isGeneratingImage ? (
                          <>Generating... <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
                        ) : (
                          <>Generate Professional Photo</>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* The Kompally Bridge */}
                <div className="bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-500/30 rounded-3xl p-8 sticky top-24 shadow-2xl">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Next Step: Verification</h3>
                  <p className="text-blue-200 mb-8 leading-relaxed font-medium text-lg">
                    "Aapne 10 sawalon ka muqabla kiya hai! Yeh report lekar Suchitra Road Office aaiye."
                  </p>
                  
                  <div className="bg-black/30 rounded-xl p-4 mb-8 border border-white/10">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Office Location</span>
                    <p className="text-white font-medium">GulfPath HQ</p>
                    <p className="text-slate-300 text-sm">NO. 04-009/NR SURVEY NO. 43,<br/>Suchitra Rd, Kompally,<br/>Hyderabad, Telangana 500067</p>
                  </div>

                  <div className="space-y-4">
                    <a 
                      href={`https://wa.me/?text=Namaste!%20Mera%20naam%20${userData.name}%20hai.%20Mera%20GulfPath%20AI%20interview%20score%20${assessment.score}/10%20aaya%20hai.%20Main%20office%20aana%20chahta%20hoon.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-500 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Office
                    </a>
                    <button 
                      onClick={() => window.print()}
                      className="w-full bg-white text-blue-900 hover:bg-blue-50 px-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

