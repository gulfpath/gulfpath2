import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  Search,
  PlayCircle,
  FileText,
  CheckCircle,
  ArrowRight,
  Volume2,
  Mic,
  Briefcase,
  MapPin,
  FileBadge,
  Video,
  Building2,
  Bot,
  Plane,
  ChevronDown,
  ChevronUp,
  Banknote
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import { faqCategories } from "../components/FAQSection";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const [calcCurrency, setCalcCurrency] = useState('AED');
  const [calcAmount, setCalcAmount] = useState(2000);

  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingStatus, setTrackingStatus] = useState<number | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim().length > 5) {
      setTrackingStatus(Math.floor(Math.random() * 4));
    } else {
      setTrackingStatus(null);
    }
  };

  const currencyRates: Record<string, number> = {
    'AED': 22.6,
    'SAR': 22.3,
    'QAR': 22.9,
    'KWD': 272.5,
    'OMR': 217.3,
    'BHD': 221.8
  };

  const inrEquivalent = Math.round(calcAmount * currencyRates[calcCurrency]);
  const estimatedSavings = Math.round(inrEquivalent * 0.7);

  const jobSuggestions = [
    { name: "Driver", category: "Transport", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Heavy Vehicle Driver", category: "Transport", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Light Vehicle Driver", category: "Transport", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Plumber", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Pipefitter", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Electrician", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Residential Electrician", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Industrial Electrician", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Mason", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Carpenter", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Welder", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Painter", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Security Guard", category: "Services", icon: <ShieldCheck className="w-4 h-4 text-gray-400" /> },
    { name: "HVAC Technician", category: "Maintenance", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Crane Operator", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Scaffolder", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Steel Fixer", category: "Construction", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Helper", category: "General", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Cleaner", category: "Services", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
    { name: "Cook", category: "Hospitality", icon: <Briefcase className="w-4 h-4 text-gray-400" /> },
  ];

  const filteredSuggestions = jobSuggestions.filter(job => 
    job.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/jobs');
    }
  };

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const renderAnswer = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const trendingJobs = [
    {
      id: "1",
      title: "Residential Electrician",
      company: "Al Futtaim Group",
      location: "Dubai, UAE",
      salary: "2,500 AED (₹56,000) / month",
      experience: "2-5 Years",
      isFree: true,
      benefits: ["Free Food", "Accommodation", "Medical"],
      whatsappNumber: "971501234567",
      isEcrAccepted: true,
      housingProvided: true,
      postedDaysAgo: 1,
    },
    {
      id: "2",
      title: "Heavy Vehicle Driver",
      company: "Saudi Binladin Group",
      location: "Riyadh, KSA",
      salary: "3,000 SAR (₹66,000) / month",
      experience: "3+ Years",
      isFree: true,
      benefits: ["Accommodation", "Transportation", "Medical"],
      whatsappNumber: "966501234567",
      isEcrAccepted: false,
      housingProvided: true,
      postedDaysAgo: 0,
    },
    {
      id: "3",
      title: "HVAC Technician",
      company: "Qatar Airways Facilities",
      location: "Doha, Qatar",
      salary: "2,800 QAR (₹64,000) / month",
      experience: "1-3 Years",
      isFree: true,
      benefits: ["Free Food", "Accommodation", "Transportation"],
      whatsappNumber: "97450123456",
      isEcrAccepted: true,
      housingProvided: true,
      postedDaysAgo: 3,
    },
    {
      id: "4",
      title: "Plumber / Pipefitter",
      company: "ASGC Construction",
      location: "Abu Dhabi, UAE",
      salary: "2,200 AED (₹50,000) / month",
      experience: "2+ Years",
      isFree: true,
      benefits: ["Accommodation", "Medical", "Overtime"],
      whatsappNumber: "971501234568",
      isEcrAccepted: true,
      housingProvided: true,
      postedDaysAgo: 2,
    },
    {
      id: "5",
      title: "Security Guard",
      company: "Farnek Services",
      location: "Dubai, UAE",
      salary: "2,000 AED (₹45,000) / month",
      experience: "1+ Years",
      isFree: true,
      benefits: ["Accommodation", "Transportation", "Uniform"],
      whatsappNumber: "971501234569",
      isEcrAccepted: true,
      housingProvided: true,
      postedDaysAgo: 1,
    },
    {
      id: "6",
      title: "Mason (Block & Plaster)",
      company: "Alfanar",
      location: "Jeddah, KSA",
      salary: "2,400 SAR (₹53,000) / month",
      experience: "3+ Years",
      isFree: true,
      benefits: ["Free Food", "Accommodation", "Medical"],
      whatsappNumber: "966501234568",
      isEcrAccepted: true,
      housingProvided: true,
      postedDaysAgo: 4,
    },
    {
      id: "7",
      title: "Welder (6G)",
      company: "NBTC Group",
      location: "Ahmadi, Kuwait",
      salary: "250 KWD (₹68,000) / month",
      experience: "4+ Years",
      isFree: true,
      benefits: ["Accommodation", "Transportation", "Medical"],
      whatsappNumber: "96550123456",
      isEcrAccepted: false,
      housingProvided: true,
      postedDaysAgo: 0,
    },
    {
      id: "8",
      title: "General Helper",
      company: "Imdaad",
      location: "Dubai, UAE",
      salary: "1,200 AED (₹27,000) / month",
      experience: "Fresher Accepted",
      isFree: true,
      benefits: ["Free Food", "Accommodation", "Transportation"],
      whatsappNumber: "971501234570",
      isEcrAccepted: true,
      housingProvided: true,
      postedDaysAgo: 2,
    },
    {
      id: "9",
      title: "Carpenter (Shuttering)",
      company: "DP World",
      location: "Dubai, UAE",
      salary: "1,800 AED (₹40,000) / month",
      experience: "2+ Years",
      isFree: true,
      benefits: ["Accommodation", "Medical", "Overtime"],
      whatsappNumber: "971501234571",
      isEcrAccepted: true,
      housingProvided: true,
      postedDaysAgo: 5,
    }
  ];

  const partnerLogos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/DP_World_2021_logo.svg/218px-DP_World_2021_logo.svg.png", alt: "DP World" },
    { src: "https://afdshd01.adnoc.ae/adn-prd/-/media/adnoc-v2/images/logo/adnoc-logo-updated.ashx?la=en&hash=8498D0A29A70897F9F61D3DDABE6D204", alt: "ADNOC" },
    { src: "https://ayc-me.com/wp-content/uploads/2023/06/asgc-logo.jpg", alt: "ASGC Construction" },
    { src: "https://www.farnek.com/wp-content/uploads/2019/08/Farnek-facilities-management.jpg", alt: "Farnek" },
    { src: "https://www.cbnme.com/wp-content/uploads/2024/07/Imdaad_Logo-1024x979.png", alt: "Imdaad" },
    { src: "https://res.cloudinary.com/protenders/image/upload/s--91li-RxN--/c_limit,d_default_logo,dpr_auto,f_auto,fl_progressive:semi,q_auto:eco,w_auto:100/7912130a9a6a987a664bde3795acc94f.png", alt: "Protenders" },
    { src: "https://www.khidmah.com/images/logo.png", alt: "Khidmah" },
    { src: "https://www.hospitality-interiors.net/wp-content/uploads/2023/04/untitled-1.w_28-1.jpg", alt: "Jumeirah" },
    { src: "https://cdn-gddog.nitrocdn.com/BPgPjcmRmbafwoTOcDjuDVfWTJplhtTj/assets/images/optimized/rev-e80e843/wp-content/uploads/2022/06/alfanar.png", alt: "Alfanar" },
    { src: "https://iconape.com/wp-content/png_logo_vector/%D8%B4%D8%B9%D8%A7%D8%B1-%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9-%D8%A8%D9%86-%D9%84%D8%A7%D8%AF%D9%86-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9.png", alt: "Saudi Binladin Group" },
    { src: "https://www.qatarenergy.qa/Style%20Library/QPRevamp2021/imgs/QP%20logo%20vertical-big.jpg", alt: "QatarEnergy" },
    { src: "https://www.nbtcgroup.com/logo.png", alt: "NBTC Group" },
    { src: "https://kw.muqawlat.com/uploads/images/15954136902295.png", alt: "Muqawlat" },
    { src: "https://dynamic.placementindia.com/recruiter_comp_logo/1273105_20250305140819.jpg", alt: "Recruiter" },
    { src: "https://www.bahrainiindustri.com/wp-content/uploads/alba.png", alt: "Alba" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-500/20 blur-[120px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-800/20 blur-[120px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
                  MEA Registered & Verified Platform
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-white">
                {t("Find Verified")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  {t("Visa-Free Jobs")}
                </span> <br />
                {t("in GCC")}
              </h1>
              
              <p className="text-xl text-slate-400 font-light max-w-xl leading-relaxed">
                {t("No Recruitment Fees. 100% Employer Sponsored. Direct access to top companies in UAE, Saudi Arabia, Qatar, and Kuwait.")}
              </p>

              <div className="relative max-w-2xl" ref={searchRef}>
                <div className="glass-dark rounded-2xl p-2 flex items-center shadow-2xl relative z-20 transition-all border-2 border-blue-500/30 hover:border-blue-500/60 focus-within:border-blue-500">
                  <div className="flex-1 flex items-center px-2 sm:px-4">
                    <button 
                      type="button"
                      onClick={() => {
                        const event = new CustomEvent('open-voice-assistant');
                        window.dispatchEvent(event);
                      }}
                      className="relative p-3 bg-blue-600/20 rounded-xl flex items-center justify-center group hover:bg-blue-600/40 transition-colors mr-3"
                      title="Speak your job"
                    >
                      <Mic className="w-6 h-6 text-blue-400 relative z-10 group-hover:text-blue-300" />
                      <span className="absolute inset-0 rounded-xl bg-blue-500/40 animate-ping"></span>
                    </button>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setShowSuggestions(false);
                          handleSearch(searchQuery);
                        }
                      }}
                      placeholder="Apna kaam boliye (e.g. 'Bijli ka kaam')..."
                      className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-400 py-4 outline-none text-lg font-medium"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      setShowSuggestions(false);
                      handleSearch(searchQuery);
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-8 py-4 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] ml-2 flex items-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">{t("Search")}</span>
                  </button>
                </div>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchQuery.trim().length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-30">
                    {filteredSuggestions.length > 0 ? (
                      <ul className="py-2">
                        {filteredSuggestions.map((suggestion, index) => (
                          <li key={index}>
                            <button
                              onClick={() => {
                                setSearchQuery(suggestion.name);
                                setShowSuggestions(false);
                                handleSearch(suggestion.name);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center justify-between group transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                                  {suggestion.icon}
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-blue-700">
                                  {suggestion.name.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => 
                                    part.toLowerCase() === searchQuery.toLowerCase() ? (
                                      <span key={i} className="text-blue-600 font-bold">{part}</span>
                                    ) : (
                                      <span key={i}>{part}</span>
                                    )
                                  )}
                                </span>
                              </div>
                              <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                {suggestion.category}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-4 text-gray-500 text-sm flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        No exact matches found. Press Enter to search all jobs for "{searchQuery}".
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mt-8">
                <button 
                  onClick={() => {
                    const event = new CustomEvent('open-voice-assistant');
                    window.dispatchEvent(event);
                  }}
                  className="glass-dark px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all text-left border border-white/10 group"
                >
                  <div className="bg-blue-500/20 p-2 rounded-full group-hover:bg-blue-500/30 transition-colors relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                    <Mic className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Talk to Sathi</p>
                    <p className="text-xs text-slate-400">Fast, voice-based onboarding</p>
                  </div>
                </button>

                <div className="flex flex-wrap items-center gap-4 ml-2">
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-300">Zero Fees</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-300">Direct Visa</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-300">eMigrate Support</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl animate-float">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
                <img
                  src="https://picsum.photos/seed/dubai-construction/800/1000"
                  alt="Construction workers in Dubai"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Sathi AI Interaction Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 pb-8">
                  {/* Sathi Message */}
                  <div className="self-start max-w-[85%] mb-4 animate-fade-in-up">
                    <div className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border border-blue-400/30 shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="glass-dark px-4 py-3 rounded-2xl rounded-bl-none border border-white/10 shadow-xl">
                        <p className="text-sm text-white font-medium">Namaste bhai! Aapka trade kya hai?</p>
                      </div>
                    </div>
                  </div>

                  {/* Worker Voice Input */}
                  <div className="self-end max-w-[85%] mb-6 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                    <div className="flex items-end gap-2 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg border border-emerald-400/30 shrink-0">
                        <Mic className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-emerald-500/20 backdrop-blur-md px-4 py-3 rounded-2xl rounded-br-none border border-emerald-500/30 shadow-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="flex gap-0.5">
                            <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
                            <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></span>
                            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1 h-5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                          </span>
                          <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">Speaking Hindi</span>
                        </div>
                        <p className="text-sm text-white font-medium">Main 5 saal se Dubai mein electrician tha...</p>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Profile Generation Card */}
                  <div className="glass-dark p-4 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.2)] animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '2s' }}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-500/20 p-1.5 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">AI Profile Generated</span>
                      </div>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-xs text-slate-400">Trade</span>
                        <span className="text-sm text-white font-semibold">Residential Electrician</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-xs text-slate-400">Experience</span>
                        <span className="text-sm text-white font-semibold">5 Years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">Gulf Return</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-medium border border-emerald-500/20">Yes (Dubai)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Trust Badge */}
              <div className="absolute top-12 -left-12 glass-dark p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-4 border border-white/10 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <Bot className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Powered by
                  </p>
                  <p className="text-white font-bold">
                    Sathi AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Trusted Partners / Sliding Logos */}
      <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Trusted by Top GCC Employers</p>
        </div>
        <div className="relative flex overflow-hidden w-full bg-white group">
          <div className="animate-marquee flex items-center gap-16 whitespace-nowrap py-2 w-max group-hover:[animation-play-state:paused]">
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="h-16 w-32 object-contain transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reputation Anchors */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/50 rounded-3xl p-8 flex items-start gap-6 border border-emerald-100/50 hover:bg-emerald-50 transition-colors">
              <div className="bg-emerald-100 p-4 rounded-2xl shrink-0">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Zero-Fee Policy</h3>
                <p className="text-slate-600 leading-relaxed">Ethical recruitment at its core. We charge zero agency fees. We provide total transparency on flight and medical costs so you can plan your future safely.</p>
              </div>
            </div>
            <div className="bg-blue-50/50 rounded-3xl p-8 flex items-start gap-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
              <div className="bg-blue-100 p-4 rounded-2xl shrink-0">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Kompally HQ Verify</h3>
                <p className="text-slate-600 leading-relaxed">We are real. Visit our physical office at Suchitra Road, Kompally, Hyderabad to verify your AI scores and complete your documentation in person.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Trust Feature Suite */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
              More Than a Job Board. <br className="hidden md:block" />
              <span className="text-blue-600">A Verified Career Path.</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
              We solve the biggest pain points: Scams, Lack of Skill Proof, and Complex Paperwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 01 Sathi */}
            <div 
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              onClick={() => {
                const event = new CustomEvent('open-voice-assistant');
                window.dispatchEvent(event);
              }}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <Mic className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4">Sathi: Voice Assistant</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                "Namaste! Main Sathi hoon." Forget complex forms. Talk to our AI assistant in Hindi, Telugu, or Tamil to build your profile effortlessly using just your voice.
              </p>
            </div>

            {/* 02 Audio Jobs */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-300">
                <Volume2 className="h-7 w-7 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4">Audio Job Postings</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Don't want to read? Tap the 'Listen' button on any job. We read out the salary, duties, and benefits in your mother tongue so you never miss a detail.
              </p>
            </div>

            {/* 03 10x10 AI Trade Test */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300">
                <Bot className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4">10x10 AI Trade Test</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                The ultimate mock interview. Take a 10-minute technical stress test with Mr. Gulfpath. Answer 10 real-world trade questions to prove you are ready for the Gulf.
              </p>
            </div>

            {/* 04 AI Report Card */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-300">
                <FileBadge className="h-7 w-7 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4">AI Report Card</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Get an Internshala-style feedback report after your interview. See your technical score, strengths, and areas to improve. Download it as a verified PDF.
              </p>
            </div>

            {/* 05 Resume-Free Video */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-rose-600 group-hover:scale-110 transition-all duration-300">
                <Video className="h-7 w-7 text-rose-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4">Resume-Free Video</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Show, don't just tell. Upload a 30-second video of your hands performing your trade. Let the employer see your skill and confidence before they even call you.
              </p>
            </div>

            {/* 06 Verified B2B Network */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-600 group-hover:scale-110 transition-all duration-300">
                <Briefcase className="h-7 w-7 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4">Verified B2B Network</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Direct access to real companies. We only allow employers with verified business emails and trade licenses. No middle-men. No fake agents. Just real jobs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sathi AI Profile Builder Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-blue-50 rounded-[3rem] transform -rotate-3 scale-105 z-0"></div>
              <div className="relative z-10 bg-white rounded-[3rem] p-8 shadow-xl border border-slate-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Sathi AI</h3>
                    <p className="text-sm text-slate-500">Your Personal Career Assistant</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Speak in Your Language</h4>
                      <p className="text-sm text-slate-600">Talk to Sathi in Hindi, Telugu, Tamil, or English. Just tell us what you do, like you're talking to a friend.</p>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">AI Understands Your Trade</h4>
                      <p className="text-sm text-slate-600">Sathi automatically translates your words into professional GCC trade titles (e.g., "Wiring ka kaam" becomes "Residential Electrician").</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Instant Professional Profile</h4>
                      <p className="text-sm text-slate-600">Within seconds, your voice is turned into a verified, professional profile ready to be sent to top employers in Dubai, Saudi, and Qatar.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      const event = new CustomEvent('open-voice-assistant');
                      window.dispatchEvent(event);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                  >
                    <Mic className="w-5 h-5" />
                    Try Sathi AI Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full border border-blue-100 text-sm font-semibold tracking-wide uppercase">
                <Bot className="w-4 h-4" />
                AI Profile Builder
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight tracking-tight">
                No Resume? No Problem. <br />
                <span className="text-blue-600">Let Sathi Build It For You.</span>
              </h2>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                We know writing a CV is hard. That's why we built Sathi. Just tap the microphone and tell us about your experience. Our AI does the rest, creating a profile that GCC employers trust.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">30s</div>
                  <p className="text-sm text-slate-600 font-medium">Average time to build a complete profile</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">4+</div>
                  <p className="text-sm text-slate-600 font-medium">Regional languages supported natively</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mock Interview Suite */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20 text-sm font-semibold tracking-wide uppercase">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                New Feature
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight">
                Mock Interview Suite <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  (Mr. Gulfpath)
                </span>
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                Live Voice & Video Agent: A real-time, immersive interview simulation with "Mr. Gulfpath," a specialized GCC recruitment persona.
              </p>
              <ul className="space-y-5 mt-8">
                <li className="flex items-start gap-4 text-slate-300">
                  <div className="bg-emerald-500/20 p-1.5 rounded-full mt-1">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                  </div>
                  <span className="text-lg font-light">Practice technical questions for your specific trade.</span>
                </li>
                <li className="flex items-start gap-4 text-slate-300">
                  <div className="bg-emerald-500/20 p-1.5 rounded-full mt-1">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                  </div>
                  <span className="text-lg font-light">Get instant feedback on your answers and confidence.</span>
                </li>
                <li className="flex items-start gap-4 text-slate-300">
                  <div className="bg-emerald-500/20 p-1.5 rounded-full mt-1">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                  </div>
                  <span className="text-lg font-light">Overcome interview fear before facing real employers.</span>
                </li>
              </ul>
              <div className="pt-8">
                <Link 
                  to="/mock-interview"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all inline-flex items-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-1"
                >
                  <PlayCircle className="h-6 w-6" />
                  Start Mock Interview
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="glass-dark rounded-[2.5rem] p-6 border border-white/10 shadow-2xl relative">
                <div className="aspect-video bg-slate-900 rounded-[2rem] overflow-hidden relative border border-white/5 shadow-inner">
                  {/* Abstract AI/Tech Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950"></div>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(96, 165, 250, 0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                  
                  {/* Animated glowing orbs for "AI thinking" effect */}
                  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse-slow"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center mb-8 relative shadow-2xl border border-white/10">
                      {/* Outer animated rings */}
                      <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping opacity-20"></div>
                      <div className="absolute -inset-4 border border-blue-400/20 rounded-full animate-spin-slow"></div>
                      <div className="absolute -inset-8 border border-indigo-400/10 rounded-full animate-reverse-spin"></div>
                      
                      {/* AI Avatar Icon */}
                      <div className="w-28 h-28 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-inner">
                        <Bot className="h-14 w-14 text-white" />
                      </div>
                    </div>
                    
                    <div className="glass-dark px-8 py-5 rounded-2xl border border-white/10 shadow-2xl max-w-[85%] text-center">
                      <p className="text-white font-medium flex items-center justify-center gap-4 text-lg">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                        "Tell me about your experience as an Electrician..."
                      </p>
                    </div>
                  </div>
                  
                  {/* Top bar of the "video call" */}
                  <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent z-20">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Live Interview</span>
                    </div>
                    <div className="text-xs font-mono text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                      02:45
                    </div>
                  </div>
                </div>
                
                {/* Floating UI Elements */}
                <div className="absolute -bottom-8 -left-8 glass-dark p-5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-5 animate-float">
                  <div className="bg-emerald-500/20 p-3.5 rounded-full">
                    <Mic className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Your Turn</p>
                    <p className="text-white font-bold text-lg">Listening...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Jobs Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div>
              <h2 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
                {t("Trending Jobs")}
              </h2>
              <p className="text-slate-500 text-lg font-light mb-8">
                Recently verified opportunities with top GCC employers.
              </p>
              
              {/* Country Flags Filter */}
              <div className="flex flex-wrap gap-3">
                {[
                  { code: 'UAE', flag: '🇦🇪', name: 'UAE' },
                  { code: 'KSA', flag: '🇸🇦', name: 'Saudi Arabia' },
                  { code: 'Qatar', flag: '🇶🇦', name: 'Qatar' },
                  { code: 'Kuwait', flag: '🇰🇼', name: 'Kuwait' }
                ].map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedCountry(selectedCountry === country.code ? null : country.code)}
                    className={`flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-300 ${
                      selectedCountry === country.code 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="font-medium text-sm">{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link
              to="/jobs"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
            >
              View all jobs <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingJobs
              .filter(job => !selectedCountry || job.location.includes(selectedCountry))
              .map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
            {trendingJobs.filter(job => !selectedCountry || job.location.includes(selectedCountry)).length === 0 && (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-lg font-light">No trending jobs found for this country.</p>
                <button 
                  onClick={() => setSelectedCountry(null)}
                  className="mt-4 text-blue-600 font-semibold hover:underline"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
            >
              View all jobs <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Paisa Ki Baat - Salary Calculator */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full border border-white/20 text-sm font-semibold tracking-wide uppercase">
                <Banknote className="w-4 h-4" />
                Paisa Ki Baat
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight">
                How much will I save?
              </h2>
              <p className="text-xl text-blue-100 font-light leading-relaxed">
                See your GCC salary in Indian Rupees. With free food and accommodation provided by most verified employers, you can send more money back home.
              </p>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-4">
                  <img className="w-12 h-12 rounded-full border-2 border-blue-600" src="https://picsum.photos/seed/family1/100/100" alt="Family" referrerPolicy="no-referrer" />
                  <img className="w-12 h-12 rounded-full border-2 border-blue-600" src="https://picsum.photos/seed/family2/100/100" alt="Family" referrerPolicy="no-referrer" />
                  <img className="w-12 h-12 rounded-full border-2 border-blue-600" src="https://picsum.photos/seed/family3/100/100" alt="Family" referrerPolicy="no-referrer" />
                </div>
                <p className="text-sm text-blue-200 font-medium">Build a better future<br/>for your family.</p>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-slate-900 relative">
                <div className="absolute -top-6 -right-6 bg-emerald-500 text-white w-24 h-24 rounded-full flex items-center justify-center font-bold text-xl shadow-xl rotate-12 border-4 border-white">
                  70%<br/>Save
                </div>
                
                <h3 className="text-2xl font-bold mb-8">Salary Calculator</h3>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-slate-500 font-medium">Select Currency</label>
                      <select 
                        value={calcCurrency}
                        onChange={(e) => {
                          setCalcCurrency(e.target.value);
                          // Adjust default amount based on currency
                          if (['KWD', 'OMR', 'BHD'].includes(e.target.value)) {
                            if (calcAmount > 1000) setCalcAmount(250);
                          } else {
                            if (calcAmount < 1000) setCalcAmount(2000);
                          }
                        }}
                        className="bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="AED">AED (UAE)</option>
                        <option value="SAR">SAR (Saudi)</option>
                        <option value="QAR">QAR (Qatar)</option>
                        <option value="KWD">KWD (Kuwait)</option>
                        <option value="OMR">OMR (Oman)</option>
                        <option value="BHD">BHD (Bahrain)</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-between items-end mb-2">
                      <label className="text-slate-500 font-medium">Monthly Salary</label>
                      <span className="text-3xl font-bold text-blue-600">{calcAmount} {calcCurrency}</span>
                    </div>
                    <input 
                      type="range" 
                      min={['KWD', 'OMR', 'BHD'].includes(calcCurrency) ? 100 : 800} 
                      max={['KWD', 'OMR', 'BHD'].includes(calcCurrency) ? 1000 : 8000} 
                      step={['KWD', 'OMR', 'BHD'].includes(calcCurrency) ? 10 : 100}
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                      <span>{['KWD', 'OMR', 'BHD'].includes(calcCurrency) ? '100' : '800'} {calcCurrency}</span>
                      <span>{['KWD', 'OMR', 'BHD'].includes(calcCurrency) ? '1000+' : '8000+'} {calcCurrency}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                      <p className="text-emerald-800 font-medium mb-1">In Indian Rupees (Approx)</p>
                      <p className="text-4xl md:text-5xl font-display font-bold text-emerald-600 mb-4">
                        ₹{inrEquivalent.toLocaleString('en-IN')} <span className="text-lg text-emerald-600/60 font-medium">/ month</span>
                      </p>
                      
                      <div className="flex items-center gap-3 text-sm text-emerald-700 font-medium bg-white/60 px-4 py-3 rounded-xl border border-emerald-200/50">
                        <div className="bg-emerald-100 p-1.5 rounded-full">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        Estimated Savings: <strong className="text-lg">₹{estimatedSavings.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 text-center">
                    * Exchange rates are approximate. Savings estimate assumes 70% of salary saved due to free food & accommodation provided by employers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Ledger (Aapka Kharcha) */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100 text-sm font-semibold tracking-wide uppercase mb-4">
              <ShieldCheck className="w-4 h-4" />
              100% Transparent Ledger
            </div>
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              Aapka Kharcha <span className="text-slate-500 font-light">(Your Expenses)</span>
            </h2>
            <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
              No hidden agent commissions. You only pay for official government and medical fees.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-5 px-8 font-semibold text-slate-900">Expense Type</th>
                    <th className="py-5 px-8 font-semibold text-slate-900">Amount</th>
                    <th className="py-5 px-8 font-semibold text-slate-900">Paid To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-6 px-8 font-medium text-slate-900 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-lg">GulfPath Fee</span>
                    </td>
                    <td className="py-6 px-8">
                      <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-bold px-4 py-1.5 rounded-full text-lg border border-emerald-200">
                        <CheckCircle className="w-5 h-5" /> ₹0 (Free)
                      </span>
                    </td>
                    <td className="py-6 px-8 text-slate-500 text-lg">None</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-6 px-8 font-medium text-slate-900 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-amber-600" />
                      </div>
                      <span className="text-lg">Medical (GAMCA)</span>
                    </td>
                    <td className="py-6 px-8 font-semibold text-slate-700 text-lg">₹8,000 to ₹12,000</td>
                    <td className="py-6 px-8 text-slate-500 text-lg">Paid directly to Clinic</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-6 px-8 font-medium text-slate-900 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                        <FileBadge className="w-6 h-6 text-indigo-600" />
                      </div>
                      <span className="text-lg">Passport/PCC</span>
                    </td>
                    <td className="py-6 px-8 font-semibold text-slate-700 text-lg">₹1,500</td>
                    <td className="py-6 px-8 text-slate-500 text-lg">Govt Fee</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
              <p className="text-slate-600 font-medium flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                We will never ask you for cash. Report any agent asking for money in our name.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Visa & Flight Tracker */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              Live "Visa & Flight" Tracker
            </h2>
            <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
              Track your journey to the Gulf in real-time. No need to call the agent!
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                  <Plane className="w-6 h-6" />
                  Application Status
                </h3>
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                  Application ID: #GP-8924
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-8 bottom-8 w-1 bg-slate-100 rounded-full z-0"></div>
                
                {/* Progress Line */}
                <div className="absolute left-[27px] top-8 h-[40%] w-1 bg-emerald-500 rounded-full z-0 transition-all duration-1000"></div>

                <div className="space-y-8 relative z-10">
                  {/* Step 1: Trade Test */}
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30 border-4 border-white transition-transform group-hover:scale-110">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="pt-3">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        Trade Test Passed
                        <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Completed</span>
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">You scored 8.5/10 in your Residential Electrician test.</p>
                      <p className="text-xs text-slate-400 mt-2 font-medium">Oct 12, 2023 • 10:30 AM</p>
                    </div>
                  </div>

                  {/* Step 2: Medical */}
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-400/30 border-4 border-white transition-transform group-hover:scale-110 relative">
                      <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-20"></div>
                      <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <div className="pt-3">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        Medical in Progress
                        <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full animate-pulse">In Progress</span>
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">GAMCA medical appointment scheduled at Al-Razi Clinic.</p>
                      <button className="mt-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> View Clinic Location
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Visa */}
                  <div className="flex items-start gap-6 group opacity-50">
                    <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border-4 border-white transition-transform group-hover:scale-110">
                      <FileText className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="pt-3">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        Visa Stamping
                        <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Pending</span>
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">Waiting for medical clearance to submit passport to embassy.</p>
                    </div>
                  </div>

                  {/* Step 4: Flight */}
                  <div className="flex items-start gap-6 group opacity-50">
                    <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border-4 border-white transition-transform group-hover:scale-110">
                      <Plane className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="pt-3">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        Flight Ticket Issued
                        <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Pending</span>
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">Final step before departure. Ticket details will appear here.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Need help? <button className="text-blue-600 font-semibold hover:underline">Talk to Sathi</button>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Track My File Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <div className="relative z-10 text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6">
                <Plane className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
                Track My File
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Enter your Passport Number or Application ID to check your visa progress. No need to call the office!
              </p>
            </div>

            <form onSubmit={handleTrack} className="relative z-10 max-w-2xl mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                  <input 
                    type="text" 
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter Passport No. (e.g. Z1234567)" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Search className="w-5 h-5" />
                  Check Status
                </button>
              </div>
            </form>

            {trackingStatus !== null && (
              <div className="relative z-10 max-w-3xl mx-auto bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">
                  Application Status for <span className="text-blue-600">{trackingNumber.toUpperCase()}</span>
                </h3>
                
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full hidden sm:block"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 rounded-full transition-all duration-1000 hidden sm:block"
                    style={{ width: `${(trackingStatus / 3) * 100}%` }}
                  ></div>

                  {/* Steps */}
                  <div className="relative flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">
                    {[
                      { label: "Selected", icon: <CheckCircle className="w-5 h-5" /> },
                      { label: "Medical Done", icon: <FileBadge className="w-5 h-5" /> },
                      { label: "Visa Stamped", icon: <FileText className="w-5 h-5" /> },
                      { label: "Ticket Issued", icon: <Plane className="w-5 h-5" /> }
                    ].map((step, index) => {
                      const isCompleted = index <= trackingStatus;
                      const isCurrent = index === trackingStatus;
                      
                      return (
                        <div key={index} className="flex sm:flex-col items-center gap-4 sm:gap-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 relative z-10 transition-colors duration-500 shrink-0 ${
                            isCompleted 
                              ? 'bg-emerald-500 border-white text-white shadow-lg' 
                              : 'bg-slate-100 border-white text-slate-400'
                          }`}>
                            {step.icon}
                            {isCurrent && (
                              <span className="absolute -inset-2 rounded-full border-2 border-emerald-500 opacity-20 animate-ping"></span>
                            )}
                          </div>
                          <p className={`sm:mt-4 text-sm font-bold sm:text-center sm:w-24 ${
                            isCompleted ? 'text-slate-900' : 'text-slate-400'
                          }`}>
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Worker of the Month Spotlight */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-50 rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col lg:flex-row group hover:shadow-xl transition-all duration-500">
            <div className="lg:w-1/2 relative overflow-hidden">
              <img 
                src="https://picsum.photos/seed/worker/800/800" 
                alt="Ramesh, AC Tech in Dubai" 
                className="w-full h-full object-cover aspect-square lg:aspect-auto group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-center justify-center">
                <button className="bg-white/90 hover:bg-white text-blue-600 rounded-full p-5 shadow-2xl transition-all hover:scale-110 backdrop-blur-sm">
                  <PlayCircle className="h-12 w-12" />
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
              
              <div className="inline-flex items-center gap-3 bg-white text-slate-800 px-4 py-2 rounded-full text-sm font-bold mb-8 w-max shadow-sm border border-slate-100 relative z-10">
                <span className="text-xl">🏆</span> Worker of the Month
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight relative z-10">
                "GulfPath changed my life. No agents, no fees."
              </h2>
              <p className="text-xl text-slate-600 mb-10 font-light leading-relaxed relative z-10">
                "I used to pay agents thousands of rupees and wait for months. With GulfPath, I applied directly to a verified company. Now I'm working as an AC Technician in Dubai, and my company paid for my visa and flight."
              </p>
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-700">
                  R
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">Ramesh Kumar</p>
                  <p className="text-slate-500 text-sm">AC Technician • Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              Latest from GulfPath Blog
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
              Stay updated with the latest news, tips, and guides for working in the GCC.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "How to Prepare for a Technical Interview in Dubai",
                image: "https://picsum.photos/seed/blog1/600/400",
                date: "March 1, 2026",
                category: "Interview Tips"
              },
              {
                title: "Understanding Your Rights as a Worker in Saudi Arabia",
                image: "https://picsum.photos/seed/blog2/600/400",
                date: "February 25, 2026",
                category: "Legal & Rights"
              },
              {
                title: "Top 5 High-Demand Blue-Collar Jobs in Qatar for 2026",
                image: "https://picsum.photos/seed/blog3/600/400",
                date: "February 18, 2026",
                category: "Career Guide"
              }
            ].map((blog, index) => (
              <div key={index} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                <div className="overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">{blog.category}</span>
                    <span className="text-xs text-slate-400 font-medium">{blog.date}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                  <Link to="#" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2 group/link">
                    Read more <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top 5 FAQs Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full border border-blue-100 text-sm font-semibold tracking-wide uppercase mb-4">
              <ShieldCheck className="w-4 h-4" />
              The Trust Manual
            </div>
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              Top 5 Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
              Everything you need to know about working in the Gulf safely and securely.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
            <div className="divide-y divide-slate-100">
              {faqCategories[0].faqs.slice(0, 5).map((faq) => (
                <div key={faq.id} className="group">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors pr-8">
                      {faq.question}
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {openFaqId === faq.id ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </span>
                  </button>
                  
                  <div 
                    className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaqId === faq.id ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="text-slate-600 text-lg font-light leading-relaxed bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                      {renderAnswer(faq.answer)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link 
              to="/faq" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Read All FAQs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact / Newsletter Form */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100 pb-32">
        <div className="max-w-5xl mx-auto bg-slate-950 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full w-[600px] h-[600px] -top-40 -right-40 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
              Get Job Alerts on WhatsApp
            </h2>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg font-light">
              Subscribe to receive the latest verified job opportunities directly to your phone. No spam, only real jobs.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="flex-1 glass-dark border border-white/10 text-white placeholder-slate-400 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
                required
              />
              <input 
                type="tel" 
                placeholder="WhatsApp Number" 
                className="flex-1 glass-dark border border-white/10 text-white placeholder-slate-400 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all whitespace-nowrap shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] text-lg"
              >
                Subscribe Now
              </button>
            </form>
            <p className="text-sm text-slate-500 mt-6 font-light">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </section>

      {/* Live Hiring Ticker */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white py-2 z-50 overflow-hidden border-t border-blue-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-12 w-max hover:[animation-play-state:paused]">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <strong className="text-green-400">New:</strong> 50 Mason roles just opened in Riyadh
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            20 Workers just moved to 'Medical' stage for Galfar Oman
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <strong className="text-green-400">Hired:</strong> 15 Electricians selected for DP World, Dubai
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <strong className="text-green-400">Urgent:</strong> 30 Heavy Vehicle Drivers needed in Qatar
          </span>
          {/* Duplicate for infinite scroll effect */}
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <strong className="text-green-400">New:</strong> 50 Mason roles just opened in Riyadh
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            20 Workers just moved to 'Medical' stage for Galfar Oman
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <strong className="text-green-400">Hired:</strong> 15 Electricians selected for DP World, Dubai
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <strong className="text-green-400">Urgent:</strong> 30 Heavy Vehicle Drivers needed in Qatar
          </span>
        </div>
      </div>
    </div>
  );
}
