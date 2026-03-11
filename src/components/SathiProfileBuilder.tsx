import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Loader2, CheckCircle2, AlertCircle, User, Briefcase, MapPin, Globe, FileText, Languages } from 'lucide-react';
import { extractProfileFromText, SathiProfileResponse } from '../services/sathiService';

export const SathiProfileBuilder: React.FC<{ onProfileSaved?: (profile: SathiProfileResponse) => void }> = ({ onProfileSaved }) => {
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SathiProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState('hi-IN');
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      // Set to Hindi/Hinglish by default, but it can pick up English too
      recognitionRef.current.lang = 'hi-IN';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setTextInput((prev) => prev + (prev ? ' ' : '') + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        setTextInput('');
        recognitionRef.current.lang = language;
        recognitionRef.current.start();
        setIsRecording(true);
      } else {
        alert('Speech recognition is not supported in your browser.');
      }
    }
  };

  const handleProcess = async () => {
    if (!textInput.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    setResult(null);
    
    try {
      const profile = await extractProfileFromText(textInput);
      setResult(profile);
    } catch (err: any) {
      setError(err.message || 'Failed to process the input. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Mic className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-900">"Sathi" AI Voice Profile Builder</h2>
            <p className="text-sm text-slate-500">Speak in your preferred language to build your profile instantly.</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
            <Languages className="w-4 h-4 text-slate-500" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={isRecording || isProcessing}
              className="text-sm border-none bg-transparent focus:ring-0 text-slate-700 font-medium cursor-pointer outline-none"
            >
              <option value="hi-IN">Hindi (हिंदी)</option>
              <option value="te-IN">Telugu (తెలుగు)</option>
              <option value="ta-IN">Tamil (தமிழ்)</option>
              <option value="en-IN">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tell us about yourself (Experience, Trade, Location, Passport)
          </label>
          <div className="relative">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={
                language === 'hi-IN' ? "E.g., Mera naam Rahul hai, main 5 saal se Dubai mein electrician tha..." :
                language === 'te-IN' ? "E.g., Naa peru Rahul, nenu Dubai lo 5 yellu electrician ga pani chesanu..." :
                language === 'ta-IN' ? "E.g., En peyar Rahul, naan Dubai la 5 varushama electrician ah irunthen..." :
                "E.g., My name is Rahul, I worked as an electrician in Dubai for 5 years..."
              }
              className="w-full h-32 p-4 pr-12 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none transition-all"
              disabled={isProcessing}
            />
            <button
              onClick={toggleRecording}
              disabled={isProcessing}
              className={`absolute bottom-4 right-4 p-3 rounded-full transition-all ${
                isRecording 
                  ? 'bg-red-100 text-red-600 animate-pulse' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title={isRecording ? "Stop Recording" : "Start Recording"}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleProcess}
            disabled={!textInput.trim() || isProcessing || isRecording}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Build Profile
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 border border-red-100">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Extracted Profile</h3>
              <div className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                Confidence: {Math.round(result.confidence_score * 100)}%
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <User className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Personal Info</p>
                  <p className="font-medium text-slate-900">{result.worker_profile.name || 'Not provided'}</p>
                  <p className="text-sm text-slate-600">{result.worker_profile.age ? `${result.worker_profile.age} years old` : 'Age not provided'}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Trade & Experience</p>
                  <p className="font-medium text-slate-900">{result.worker_profile.trade_primary}</p>
                  <p className="text-sm text-slate-600">
                    {result.worker_profile.exp_years ? `${result.worker_profile.exp_years} years exp.` : 'Experience not provided'}
                    {result.worker_profile.trade_secondary && ` • Also: ${result.worker_profile.trade_secondary}`}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <Globe className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">GCC Status</p>
                  <p className="font-medium text-slate-900">
                    {result.worker_profile.is_gulf_return ? 'Gulf Return' : 'Fresher (No GCC Exp)'}
                  </p>
                  {result.worker_profile.previous_gulf_countries.length > 0 && (
                    <p className="text-sm text-slate-600">Previous: {result.worker_profile.previous_gulf_countries.join(', ')}</p>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Compliance</p>
                  <p className="font-medium text-slate-900">Passport: {result.worker_profile.passport_type}</p>
                  <p className="text-sm text-slate-600">
                    Target: {result.worker_profile.target_countries.length > 0 ? result.worker_profile.target_countries.join(', ') : 'Any GCC'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50 mb-6">
              <h4 className="text-sm font-semibold text-indigo-900 mb-2">AI Summary</h4>
              <p className="text-sm text-indigo-800 leading-relaxed">{result.worker_profile.summary}</p>
            </div>

            {(result.missing_fields.length > 0 || result.follow_up_questions.length > 0) && (
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50">
                <h4 className="text-sm font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Missing Information
                </h4>
                
                {result.missing_fields.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-amber-800 uppercase tracking-wider mb-1">Missing Fields</p>
                    <div className="flex flex-wrap gap-2">
                      {result.missing_fields.map((field, idx) => (
                        <span key={idx} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-md border border-amber-200">
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.follow_up_questions.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-amber-800 uppercase tracking-wider mb-1">Suggested Follow-up</p>
                    <ul className="list-disc list-inside text-sm text-amber-900 space-y-1">
                      {result.follow_up_questions.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => onProfileSaved && onProfileSaved(result)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
