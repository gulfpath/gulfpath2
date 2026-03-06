import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, X, Loader2, Volume2, Video, VideoOff, PlayCircle, StopCircle, User } from 'lucide-react';

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

export default function MockInterview() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  
  const sessionRef = useRef<any>(null);
  const playerRef = useRef<PCMPlayer | null>(null);
  const recorderRef = useRef<PCMRecorder | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const frameIntervalRef = useRef<number | null>(null);

  const startVideo = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.warn("Media devices API not available.");
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
      console.warn("Camera access denied or unavailable:", err);
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
    if (isVideoEnabled) {
      startVideo();
    } else {
      stopVideo();
    }
    return () => stopVideo();
  }, [isVideoEnabled]);

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
        
        sessionRef.current.sendRealtimeInput({
          media: { data: base64Data, mimeType: 'image/jpeg' }
        });
      }
    }
  };

  const startInterview = async () => {
    setIsConnecting(true);
    setError(null);

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
          systemInstruction: `You are "Mr. Gulfpath," a strict but fair GCC recruitment officer. You are conducting a mock interview with a blue-collar worker from India.
Your goal is to test their technical knowledge, safety awareness, and confidence.
If they have video enabled, you can see them. Comment on their appearance or environment if relevant (e.g., "I see you are in a workshop" or "Please look at the camera").
Start by asking them what trade they are applying for, and then ask 3-4 technical questions related to that trade.
Keep your responses concise and professional. Provide brief feedback after their answers.`,
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
              stopInterview();
            });

            // Start sending video frames if enabled
            if (isVideoEnabled) {
              frameIntervalRef.current = window.setInterval(captureAndSendFrame, 1000); // Send 1 frame per second
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && playerRef.current) {
              playerRef.current.playBase64(base64Audio);
            }
            
            if (message.serverContent?.interrupted && playerRef.current) {
              playerRef.current.stop();
            }
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
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
      console.error("Failed to start interview:", err);
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

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">Mock Interview Suite</h1>
          <p className="text-slate-400 text-lg">Practice with Mr. Gulfpath, our AI Recruitment Officer</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Avatar / Video Area */}
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/20"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-40 h-40 bg-slate-900 rounded-full flex items-center justify-center mb-6 relative shadow-2xl">
                {isConnected && (
                  <>
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-pulse opacity-40"></div>
                  </>
                )}
                <img 
                  src="https://picsum.photos/seed/mrgulfpath/200/200" 
                  alt="Mr. Gulfpath" 
                  className="w-36 h-36 rounded-full object-cover border-4 border-slate-800 relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Mr. Gulfpath</h2>
              <p className="text-blue-400 font-medium mb-6">Senior Recruitment Officer</p>
              
              {isConnected ? (
                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-full">
                  <Volume2 className="h-5 w-5 animate-pulse" />
                  <span className="font-semibold">Interview in Progress</span>
                </div>
              ) : isConnecting ? (
                <div className="flex items-center gap-2 text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-semibold">Connecting...</span>
                </div>
              ) : (
                <div className="text-slate-500 font-medium">Ready to begin</div>
              )}
            </div>
          </div>

          {/* User Video / Controls Area */}
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 flex flex-col">
            <div className="flex-1 bg-slate-900 rounded-2xl overflow-hidden relative mb-6 border border-slate-700">
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
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  You
                </div>
                <button 
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${isVideoEnabled ? 'bg-blue-600/80 hover:bg-blue-600 text-white' : 'bg-red-500/80 hover:bg-red-500 text-white'}`}
                >
                  {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              {!isConnected && !isConnecting ? (
                <button 
                  onClick={startInterview}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.4)] w-full justify-center"
                >
                  <PlayCircle className="h-6 w-6" />
                  Start Interview
                </button>
              ) : (
                <button 
                  onClick={stopInterview}
                  className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-3 shadow-[0_0_20px_rgba(220,38,38,0.4)] w-full justify-center"
                >
                  <StopCircle className="h-6 w-6" />
                  End Interview
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Interview Tips</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <div className="bg-blue-500/20 p-1 rounded mt-0.5"><Mic className="h-4 w-4 text-blue-400" /></div>
              <p>Speak clearly and confidently. Mr. Gulfpath is listening to your technical knowledge.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-blue-500/20 p-1 rounded mt-0.5"><Video className="h-4 w-4 text-blue-400" /></div>
              <p>If your camera is on, ensure you are in a well-lit environment. The AI can see your surroundings.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-blue-500/20 p-1 rounded mt-0.5"><Volume2 className="h-4 w-4 text-blue-400" /></div>
              <p>Wait for Mr. Gulfpath to finish speaking before you answer.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
