import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Briefcase,
  CheckCircle,
  Volume2,
  ShieldCheck,
  Banknote,
  MessageCircle,
  Home,
  FileText,
  Clock,
  Video,
  Bookmark,
  Zap,
  X
} from "lucide-react";

interface JobCardProps {
  key?: string | number;
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  salaryBreakdown?: {
    basic: string;
    overtime: string;
    food: string;
  };
  experience: string;
  isFree: boolean;
  benefits: string[];
  whatsappNumber?: string;
  isEcrAccepted?: boolean;
  housingProvided?: boolean;
  postedDaysAgo?: number;
  tradeTestRequired?: boolean;
  isEmployerVerified?: boolean;
  isQuickApply?: boolean;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
  salaryBreakdown,
  experience,
  isFree,
  benefits,
  whatsappNumber,
  isEcrAccepted,
  housingProvided,
  postedDaysAgo,
  tradeTestRequired,
  isEmployerVerified,
  isQuickApply,
}: JobCardProps) {
  const { t } = useTranslation();
  const [isSaved, setIsSaved] = useState(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    return savedJobs.includes(id);
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const [audioScript, setAudioScript] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);

  useEffect(() => {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '{}');
    if (appliedJobs[id]) {
      setApplicationStatus(appliedJobs[id]);
    }
  }, [id]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (isSaved) {
      if (!savedJobs.includes(id)) {
        savedJobs.push(id);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      }
    } else {
      const updatedJobs = savedJobs.filter((jobId: string) => jobId !== id);
      localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
    }
  }, [isSaved, id]);

  useEffect(() => {
    // Generate the script based on job details
    let script = "";
    if (title.toLowerCase().includes("electrician") && location.toLowerCase().includes("dubai")) {
      script = `Namaste! Main Sathi hoon. Aapke liye Dubai se ek bahut badhiya kaam aaya hai. Kaam hai Industrial Electrician ka. Company aapko har mahine 1,800 Dirham salary degi, jo India ke hisab se lagbhag 40,000 rupaye bante hain. Iske saath aapko rehne ki jagah, aane-jane ka kharcha, aur medical insurance bilkul FREE milega. Yaad rakhein, GulfPath par koi agent-fee nahi hai. Lekin flight ticket aur GAMCA medical ka kharcha aapko khud dena hoga. Is kaam ke liye aapko humare AI expert, Mr. Gulfpath, ka 10x10 Trade Test pass karna hoga taaki Dubai ki company aapka hunar dekh sake. Agar aap taiyar hain, toh neeche Apply button dabaiye aur phir mere saath apna Mock Interview shuru kijiye. Kuch bhi puchna ho, toh main yahin hoon!`;
    } else {
      script = `Namaste! Main Sathi hoon. Aapke liye ${location} se ek bahut badhiya kaam aaya hai. Kaam hai ${title} ka. Company aapko ${salary} salary degi. Iske saath aapko rehne ki jagah aur medical bilkul FREE milega. Yaad rakhein, GulfPath par koi agent-fee nahi hai. Is kaam ke liye aapko humare AI expert ka 10x10 Trade Test pass karna hoga. Agar aap taiyar hain, toh Apply button dabaiye!`;
    }
    setAudioScript(script);
    setWords(script.split(" "));
  }, [title, location, salary]);

  const handleListen = (e: React.MouseEvent) => {
    e.preventDefault();
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setHighlightedWordIndex(null);
        return;
      }
      
      window.speechSynthesis.cancel(); // stop any current speech
      const utterance = new SpeechSynthesisUtterance(audioScript);
      utterance.rate = 0.9; // Slower tempo for better clarity
      
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          // Calculate which word we are on based on charIndex
          const textUntilBoundary = audioScript.substring(0, event.charIndex);
          const wordIndex = textUntilBoundary.split(" ").length - 1;
          setHighlightedWordIndex(wordIndex);
        }
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setHighlightedWordIndex(null);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setHighlightedWordIndex(null);
      };
      
      // Try to find a Hindi voice
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(v => v.lang.includes('hi-IN') || v.lang.includes('hi'));
      if (hindiVoice) utterance.voice = hindiVoice;
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col h-full relative overflow-hidden">
      {isFree && (
        <div className="absolute top-4 -right-10 bg-green-500 text-white text-xs font-bold px-10 py-1 rotate-45 shadow-sm z-10">
          {t('Verified Free')}
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className="pr-12">
          <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">{title}</h3>
          <p className="text-sm text-gray-600 font-medium flex items-center gap-1">
            {company}
            {isEmployerVerified && <CheckCircle className="h-4 w-4 text-blue-500" />}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleListen}
            className={`p-2 rounded-full transition-colors ${isPlaying ? 'bg-indigo-100 text-indigo-600 animate-pulse' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
            title="Listen to job details"
          >
            <Volume2 className="h-5 w-5" />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(!isSaved);
            }}
            className={`p-2 rounded-full transition-colors ${isSaved ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-1">
          <Banknote className="h-6 w-6 text-green-600" />
          {salary}
        </div>
        {salaryBreakdown && (
          <div className="text-xs text-gray-500 mb-2 flex gap-2 flex-wrap">
            <span className="bg-gray-100 px-2 py-1 rounded">Basic: {salaryBreakdown.basic}</span>
            <span className="bg-gray-100 px-2 py-1 rounded">OT: {salaryBreakdown.overtime}</span>
            <span className="bg-gray-100 px-2 py-1 rounded">Food: {salaryBreakdown.food}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-600 font-medium mt-2">
          <MapPin className="h-5 w-5 text-gray-400" />
          {location}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {housingProvided && (
          <div className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 border border-blue-200">
            <Home className="h-4 w-4" />
            {t('Housing')}
          </div>
        )}
        {isEcrAccepted && (
          <div className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 border border-purple-200">
            <FileText className="h-4 w-4" />
            {t('ECR Accepted')}
          </div>
        )}
        {tradeTestRequired && (
          <div className="bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 border border-orange-200">
            <Video className="h-4 w-4" />
            {t('Trade Test')}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6 text-sm text-gray-600 mt-auto">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-gray-400" />
          <span>{experience}</span>
        </div>
        {postedDaysAgo !== undefined && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className={postedDaysAgo > 30 ? "text-red-500 font-medium" : ""}>
              {postedDaysAgo === 0 ? 'Today' : `${postedDaysAgo}d ago`}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        {whatsappNumber ? (
          <a 
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2.5 rounded-xl font-bold transition-colors flex-1"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only md:not-sr-only md:text-sm">Quick Chat</span>
          </a>
        ) : (
          <button 
            onClick={handleListen}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors flex-1 ${isPlaying ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            <Volume2 className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
            <span className="sr-only md:not-sr-only md:text-sm">{isPlaying ? 'Stop Listening' : t('Listen')}</span>
          </button>
        )}
        {applicationStatus ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-2.5 rounded-xl font-bold text-center flex-1 flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {applicationStatus}
          </div>
        ) : isQuickApply ? (
          <Link to={`/apply/${id}`} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg text-center flex-1 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
            <Zap className="h-4 w-4" fill="currentColor" />
            {t('Quick Apply')}
          </Link>
        ) : (
          <Link to={`/apply/${id}`} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg text-center flex-1 flex items-center justify-center transform hover:-translate-y-0.5">
            {t('Apply Now')}
          </Link>
        )}
      </div>

      {/* Karaoke Text Overlay */}
      {isPlaying && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-indigo-600 font-bold">
              <Volume2 className="h-5 w-5 animate-pulse" />
              Sathi is speaking...
            </div>
            <button onClick={handleListen} className="text-gray-500 hover:text-gray-700 bg-gray-100 p-2 rounded-full">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-lg leading-relaxed font-medium text-gray-400">
              {words.map((word, index) => (
                <span 
                  key={index} 
                  className={`transition-colors duration-200 ${
                    index === highlightedWordIndex 
                      ? 'text-indigo-600 bg-indigo-50 px-1 rounded font-bold' 
                      : index < (highlightedWordIndex || 0) 
                        ? 'text-gray-800' 
                        : ''
                  }`}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
