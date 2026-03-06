import { useState } from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";

export default function Home() {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const trendingJobs = [
    {
      id: "1",
      title: "Residential Electrician",
      company: "Al Futtaim Group",
      location: "Dubai, UAE",
      salary: "2,500 AED / month",
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
      salary: "3,000 SAR / month",
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
      salary: "2,800 QAR / month",
      experience: "1-3 Years",
      isFree: true,
      benefits: ["Free Food", "Accommodation", "Transportation"],
      whatsappNumber: "97450123456",
      isEcrAccepted: true,
      housingProvided: true,
      postedDaysAgo: 3,
    },
  ];

  const partnerLogos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/DP_World_2021_logo.svg/218px-DP_World_2021_logo.svg.png", alt: "DP World" },
    { src: "https://afdshd01.adnoc.ae/adn-prd/-/media/adnoc-v2/images/logo/adnoc-logo-updated.ashx?la=en&hash=8498D0A29A70897F9F61D3DDABE6D204", alt: "ADNOC" },
    { src: "https://ayc-me.com/wp-content/uploads/2023/06/asgc-logo.jpg", alt: "ASGC Construction" },
    { src: "https://www.farnek.com/wp-content/uploads/2019/08/Farnek-facilities-management.jpg", alt: "Farnek" },
    { src: "https://www.cbnme.com/wp-content/uploads/2024/07/Imdaad_Logo-1024x979.png", alt: "Imdaad" },
    { src: "https://res.cloudinary.com/protenders/image/upload/s--91li-RxN--/c_limit,d_default_logo,dpr_auto,f_auto,fl_progressive:semi,q_auto:eco,w_auto:100/7912130a9a6a987a664bde3795acc94f.png", alt: "Protenders" },
    { src: "https://www.khidmah.com/images/logo.png", alt: "Khidmah" },
    { src: "https://www.hospitality-interiors.net/wp-content/uploads/2023/04/untitled-1.w_28-1.jpg", alt: "Hospitality Interiors" },
    { src: "https://cdb.rotana.com/rcnimagelib/nx_logo_w_10.png", alt: "Rotana" },
    { src: "https://cdn-gddog.nitrocdn.com/BPgPjcmRmbafwoTOcDjuDVfWTJplhtTj/assets/images/optimized/rev-e80e843/wp-content/uploads/2022/06/alfanar.png", alt: "Alfanar" },
    { src: "https://iconape.com/wp-content/png_logo_vector/%D8%B4%D8%B9%D8%A7%D8%B1-%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9-%D8%A8%D9%86-%D9%84%D8%A7%D8%AF%D9%86-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9.png", alt: "Saudi Binladin Group" },
    { src: "https://yc.com.sa/_next/static/media/logo-light.0a3c2bb7.png", alt: "YC" },
    { src: "https://www.qatarenergy.qa/Style%20Library/QPRevamp2021/imgs/QP%20logo%20vertical-big.jpg", alt: "QatarEnergy" },
    { src: "https://www.nbtcgroup.com/logo.png", alt: "NBTC Group" },
    { src: "https://kw.muqawlat.com/uploads/images/15954136902295.png", alt: "Muqawlat" },
    { src: "https://dynamic.placementindia.com/recruiter_comp_logo/1273105_20250305140819.jpg", alt: "Recruiter" },
    { src: "https://www.bahrainiindustri.com/wp-content/uploads/alba.png", alt: "Alba" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-800/50 rounded-full px-4 py-2 border border-blue-700/50 backdrop-blur-sm">
                <ShieldCheck className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-blue-100">
                  MEA Registered & Verified Platform
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                {t("Find Verified Visa-Free Jobs in GCC")}
              </h1>
              <p className="text-xl text-blue-200 font-medium max-w-lg">
                {t("No Recruitment Fees. 100% Employer Sponsored.")}
              </p>

              <div className="bg-white rounded-2xl p-2 flex items-center shadow-xl max-w-xl">
                <div className="flex-1 flex items-center px-4 border-r border-gray-200">
                  <Search className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="e.g., Plumber, Electrician, Driver..."
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500 py-3 outline-none"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors ml-2">
                  {t("Search Jobs")}
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-blue-200 mt-6">
                <div className="bg-blue-800/50 px-4 py-2 rounded-xl flex items-center gap-3 border border-blue-700/50">
                  <div className="bg-blue-500 p-2 rounded-full animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                  </div>
                  <div>
                    <p className="text-white font-bold">Try Voice Search</p>
                    <p className="text-xs text-blue-300">Speak to Sathi AI</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-blue-200 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Zero Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Direct Company Visa</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>eMigrate Support</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
              <img
                src="https://picsum.photos/seed/construction/800/600"
                alt="Construction workers"
                className="rounded-3xl shadow-2xl relative z-10 border-4 border-white/10 object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />

              {/* Floating Trust Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <ShieldCheck className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Verified by
                  </p>
                  <p className="text-gray-900 font-bold">
                    GulfPath Trust & Safety
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
                className="h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works (Accessibility Focus) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Easy, Safe, and Transparent
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We designed GulfPath specifically for blue-collar workers. No
              complicated forms, no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <PlayCircle className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Listen to Jobs
              </h3>
              <p className="text-gray-600">
                Don't want to read? Just tap the play button on any job to hear
                the details in your language.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                No Resume Needed
              </h3>
              <p className="text-gray-600">
                Apply instantly using our step-by-step form or WhatsApp chatbot.
                Upload a short video of your skills instead.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">100% Verified</h3>
              <p className="text-gray-600">
                Every employer is checked. Every job is verified. We ensure you
                get the exact salary and benefits promised.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mock Interview Suite */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full border border-blue-500/30 text-sm font-bold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                New Feature
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Mock Interview Suite <br className="hidden md:block" />
                <span className="text-blue-400">(Mr. Gulfpath)</span>
              </h2>
              <p className="text-xl text-slate-300">
                Live Voice & Video Agent: A real-time, immersive interview simulation with "Mr. Gulfpath," a specialized GCC recruitment persona.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-center gap-3 text-slate-200">
                  <CheckCircle className="h-6 w-6 text-green-400 shrink-0" />
                  <span>Practice technical questions for your specific trade.</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <CheckCircle className="h-6 w-6 text-green-400 shrink-0" />
                  <span>Get instant feedback on your answers and confidence.</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <CheckCircle className="h-6 w-6 text-green-400 shrink-0" />
                  <span>Overcome interview fear before facing real employers.</span>
                </li>
              </ul>
              <div className="pt-6">
                <Link 
                  to="/mock-interview"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors inline-flex items-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  <PlayCircle className="h-6 w-6" />
                  Start Mock Interview
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl relative">
                <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-700">
                  <img 
                    src="https://picsum.photos/seed/interview/800/450" 
                    alt="Mock Interview Interface" 
                    className="w-full h-full object-cover opacity-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 relative">
                      <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping opacity-20"></div>
                      <img 
                        src="https://picsum.photos/seed/mrgulfpath/150/150" 
                        alt="Mr. Gulfpath Avatar" 
                        className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-600">
                      <p className="text-white font-medium flex items-center gap-2">
                        <Volume2 className="h-5 w-5 text-blue-400 animate-pulse" />
                        "Tell me about your experience as an Electrician..."
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating UI Elements */}
                <div className="absolute -bottom-6 -left-6 bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Mic className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium">Your Turn</p>
                    <p className="text-white font-bold">Listening...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Jobs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t("Trending Jobs")}
              </h2>
              <p className="text-gray-600 mb-6">
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      selectedCountry === country.code 
                        ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50'
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
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              View all jobs <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingJobs
              .filter(job => !selectedCountry || job.location.includes(selectedCountry))
              .map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
            {trendingJobs.filter(job => !selectedCountry || job.location.includes(selectedCountry)).length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 font-medium">No trending jobs found for this country.</p>
                <button 
                  onClick={() => setSelectedCountry(null)}
                  className="mt-4 text-blue-600 font-medium hover:underline"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 bg-blue-50 px-6 py-3 rounded-xl"
            >
              View all jobs <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Worker of the Month Spotlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-50 rounded-3xl overflow-hidden shadow-sm border border-blue-100 flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative">
              <img 
                src="https://picsum.photos/seed/worker/800/800" 
                alt="Ramesh, AC Tech in Dubai" 
                className="w-full h-full object-cover aspect-square lg:aspect-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button className="bg-white/90 hover:bg-white text-blue-600 rounded-full p-4 shadow-lg transition-transform hover:scale-105">
                  <PlayCircle className="h-12 w-12" />
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold mb-6 w-max">
                <span className="text-lg">🏆</span> Worker of the Month
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                "GulfPath changed my life. No agents, no fees."
              </h2>
              <p className="text-xl text-gray-600 mb-8 italic">
                "I used to pay agents thousands of rupees and wait for months. With GulfPath, I applied directly to a verified company. Now I'm working as an AC Technician in Dubai, and my company paid for my visa and flight."
              </p>
              <div>
                <p className="font-bold text-gray-900 text-lg">Ramesh Kumar</p>
                <p className="text-gray-500">AC Technician • Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 pb-24">
        <div className="max-w-5xl mx-auto bg-red-50 rounded-3xl p-8 md:p-12 border border-red-100 flex flex-col md:flex-row items-center gap-8">
          <div className="bg-red-100 p-4 rounded-full shrink-0">
            <ShieldCheck className="h-12 w-12 text-red-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-900 mb-2">
              Beware of Fraudulent Agents
            </h3>
            <p className="text-red-800 mb-4">
              GulfPath will NEVER ask you for money to secure a job. Reputable
              GCC employers pay all recruitment fees, including visa and flight
              tickets.
            </p>
            <Link
              to="/fraud-report"
              className="inline-flex items-center gap-2 text-red-700 font-bold hover:text-red-800 underline underline-offset-4"
            >
              Report a fraudulent agent or company
            </Link>
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
