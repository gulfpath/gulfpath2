import { useState } from "react";
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
  Zap
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
  const [isSaved, setIsSaved] = useState(false);

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
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(!isSaved);
          }}
          className={`p-2 rounded-full transition-colors ${isSaved ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
          aria-label={isSaved ? "Unsave job" : "Save job"}
        >
          <Bookmark className="h-6 w-6" fill={isSaved ? "currentColor" : "none"} />
        </button>
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
          <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium transition-colors flex-1">
            <Volume2 className="h-5 w-5" />
            <span className="sr-only md:not-sr-only md:text-sm">{t('Listen')}</span>
          </button>
        )}
        {isQuickApply ? (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors text-center flex-1 flex items-center justify-center gap-2">
            <Zap className="h-4 w-4" fill="currentColor" />
            {t('Quick Apply')}
          </button>
        ) : (
          <Link to={`/jobs/${id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors text-center flex-1">
            {t('Apply')}
          </Link>
        )}
      </div>
    </div>
  );
}
