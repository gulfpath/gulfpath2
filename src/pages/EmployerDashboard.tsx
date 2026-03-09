import React, { useState } from 'react';
import { 
  Briefcase, Users, Database, BarChart2, Search, Globe, User, 
  ChevronRight, CheckCircle2, XCircle, FileText, Download, 
  ChevronDown, ChevronUp, MapPin, GraduationCap, Clock, Star,
  X, Check, AlertCircle, VideoOff, MessageSquare, Calendar, Send, Paperclip, CheckSquare, FileSignature, Filter, Video, PlayCircle, Columns, Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

// --- MOCK DATA ---
const MOCK_JOBS = [
  { id: 1, title: 'Senior Electrician', status: 'Active', views: 1243, applications: 45, date: '05 Mar 2026' },
  { id: 2, title: 'HVAC Technician', status: 'Active', views: 890, applications: 28, date: '01 Mar 2026' },
  { id: 3, title: 'Heavy Vehicle Driver', status: 'Closed', views: 2100, applications: 156, date: '15 Feb 2026' },
  { id: 4, title: 'Plumber / Pipefitter', status: 'Active', views: 560, applications: 12, date: '06 Mar 2026' },
];

const MOCK_APPLICANTS = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    location: 'Hyderabad, Telangana',
    experience: '5 years 2 months',
    education: 'ITI Electrical',
    skills: ['Wiring', 'Circuit Breakers', 'Troubleshooting', 'Safety Protocols'],
    trade: 'Electrician',
    score: 8.5,
    appliedDate: '2 days ago',
    match: 'Strong',
    status: 'Applied',
    phone: '+919876543210',
    strengths: ['Excellent understanding of safety protocols', 'Strong practical experience with commercial wiring'],
    gaps: ['Limited experience with smart home systems'],
    qa: [
      { q: 'How do you size a circuit breaker for a 20-amp load?', a: 'I would use a 25-amp breaker to allow for the 80% continuous load rule...', feedback: 'Accurate and demonstrates code knowledge.', score: 9 },
      { q: 'Explain the difference between grounding and bonding.', a: 'Grounding connects the system to the earth, bonding connects metallic parts together...', feedback: 'Clear and concise explanation.', score: 8 },
      { q: 'What steps do you take before working on a live panel?', a: 'First, I ensure I have the proper PPE. Then I verify the panel is actually live...', feedback: 'Good safety awareness, but missed mentioning LOTO procedures initially.', score: 7 },
    ]
  },
  {
    id: 2,
    name: 'Suresh Reddy',
    location: 'Secunderabad, Telangana',
    experience: '3 years',
    education: 'Diploma in Electrical Engineering',
    skills: ['Residential Wiring', 'Appliance Repair', 'Lighting'],
    trade: 'Electrician',
    score: 6.0,
    appliedDate: '3 days ago',
    match: 'Average',
    status: 'Shortlisted',
    phone: '+919876543211',
    strengths: ['Good theoretical knowledge', 'Enthusiastic learner'],
    gaps: ['Lacks commercial experience', 'Hesitant on complex troubleshooting'],
    qa: [
      { q: 'How do you size a circuit breaker for a 20-amp load?', a: 'I think a 20-amp breaker is fine.', feedback: 'Incorrect. Did not account for continuous load rules.', score: 4 },
      { q: 'Explain the difference between grounding and bonding.', a: 'They are mostly the same thing to keep people safe.', feedback: 'Vague and technically inaccurate.', score: 5 },
    ]
  },
  {
    id: 3,
    name: 'Mohammed Ali',
    location: 'Mumbai, Maharashtra',
    experience: '8 years',
    education: 'ITI HVAC',
    skills: ['Chillers', 'VRF Systems', 'Maintenance'],
    trade: 'HVAC Technician',
    score: 9.2,
    appliedDate: '1 week ago',
    match: 'Strong',
    status: 'Trade Test',
    phone: '+919876543212',
    strengths: ['Extensive GCC experience', 'Expert in VRF systems'],
    gaps: [],
    qa: []
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Jaipur, Rajasthan',
    experience: '4 years',
    education: '12th Pass',
    skills: ['Pipe Fitting', 'Drainage', 'Water Supply'],
    trade: 'Plumber',
    score: 7.5,
    appliedDate: '2 weeks ago',
    match: 'Good',
    status: 'Visa Processing',
    phone: '+919876543213',
    strengths: ['Fast worker', 'Good physical stamina'],
    gaps: ['Communication skills'],
    qa: []
  }
];

const MOCK_ANALYTICS_DATA = [
  { name: 'Jan', applicants: 400, hired: 24 },
  { name: 'Feb', applicants: 300, hired: 18 },
  { name: 'Mar', applicants: 550, hired: 35 },
  { name: 'Apr', applicants: 450, hired: 28 },
  { name: 'May', applicants: 600, hired: 42 },
  { name: 'Jun', applicants: 800, hired: 55 },
];

const MOCK_TRADE_DISTRIBUTION = [
  { name: 'Electrician', value: 35 },
  { name: 'Plumber', value: 25 },
  { name: 'HVAC', value: 20 },
  { name: 'Carpenter', value: 10 },
  { name: 'Mason', value: 10 },
];

const MOCK_SOURCE_DATA = [
  { name: 'Direct', value: 400 },
  { name: 'Referral', value: 300 },
  { name: 'Agency', value: 300 },
  { name: 'Social', value: 200 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const MOCK_DATABASE = [
  { id: 1, name: 'Arjun Patel', trade: 'Electrician', location: 'Dubai, UAE', experience: '6 Years', score: 9.2, status: 'Available', gulfReturn: true, technical_training: { verified: true } },
  { id: 2, name: 'Mohammed Ali', trade: 'HVAC Technician', location: 'Riyadh, KSA', experience: '4 Years', score: 8.5, status: 'Available', gulfReturn: false, technical_training: { verified: false } },
  { id: 3, name: 'Vikram Singh', trade: 'Plumber', location: 'Doha, Qatar', experience: '8 Years', score: 7.8, status: 'Hired', gulfReturn: true, technical_training: { verified: true } },
  { id: 4, name: 'Rahul Sharma', trade: 'Carpenter', location: 'Muscat, Oman', experience: '3 Years', score: 6.5, status: 'Available', gulfReturn: false, technical_training: { verified: false } },
  { id: 5, name: 'Imran Khan', trade: 'Mason', location: 'Manama, Bahrain', experience: '5 Years', score: 8.0, status: 'Available', gulfReturn: true, technical_training: { verified: true } },
  { id: 6, name: 'David Raj', trade: 'Welder', location: 'Kuwait City, Kuwait', experience: '7 Years', score: 9.0, status: 'Interviewing', gulfReturn: true, technical_training: { verified: false } },
];

const MOCK_USTADS = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    trade: 'Residential Electrician',
    experience: '4 Years (Residential & Commercial)',
    visaStatus: 'ECNR - Ready to Fly',
    score: 9.2,
    verified: false,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    matchScore: 98,
    aiInsight: "This candidate (Ramesh) has worked on 220V systems similar to your Dubai Hills project. His 10x10 test shows 100% accuracy in 'Troubleshooting.' He is a 98% Match for your Residential Electrician role."
  },
  {
    id: 2,
    name: 'Mohammed Ali',
    trade: 'HVAC Technician',
    experience: '6 Years (Chillers & VRF)',
    visaStatus: 'ECR - Clearance Pending',
    score: 8.8,
    verified: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    matchScore: 92,
    aiInsight: "Mohammed has extensive experience with Daikin VRF systems, which matches your current site requirements. Strong performance in pressure testing."
  },
  {
    id: 3,
    name: 'Vikram Singh',
    trade: 'Plumber / Pipefitter',
    experience: '5 Years (Commercial Plumbing)',
    visaStatus: 'ECNR - Ready to Fly',
    score: 9.5,
    verified: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    matchScore: 95,
    aiInsight: "Vikram is highly skilled in copper pipe brazing and PVC installations. Perfect match for the upcoming high-rise residential project."
  }
];

// --- COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
      active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </button>
);

const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status === 'Active';
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
      isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
    }`}>
      {status}
    </span>
  );
};

const ScoreRing = ({ score }: { score: number }) => {
  const percentage = (score / 10) * 100;
  const color = score >= 8 ? 'text-emerald-400' : score >= 6 ? 'text-yellow-400' : 'text-red-400';
  
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-slate-700"
          strokeWidth="3"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={color}
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-lg font-bold text-white leading-none">{score}</span>
        <span className="text-[8px] text-slate-400">/10</span>
      </div>
    </div>
  );
};

export default function EmployerDashboard() {
  const [currentView, setCurrentView] = useState<'jobs' | 'applicants' | 'database' | 'analytics' | 'post-job' | 'profile' | 'ats' | 'ustad-stream'>('ustad-stream');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<typeof MOCK_APPLICANTS[0] | null>(null);
  const [expandedQa, setExpandedQa] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<'assignment' | 'interview' | 'chat' | 'hire' | null>(null);
  const [actionApplicant, setActionApplicant] = useState<typeof MOCK_APPLICANTS[0] | null>(null);
  const [interviewType, setInterviewType] = useState<'video' | 'phone' | 'office'>('video');
  const [selectedApplicantsForBulk, setSelectedApplicantsForBulk] = useState<number[]>([]);

  const [ustads, setUstads] = useState(MOCK_USTADS);

  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'ustad_verified_1') {
        setUstads(prev => prev.map(u => u.id === 1 ? { ...u, verified: true } : u));
      }
    };
    window.addEventListener('storage', handleStorage);
    // Also check on mount
    if (localStorage.getItem('ustad_verified_1')) {
      setUstads(prev => prev.map(u => u.id === 1 ? { ...u, verified: true } : u));
    }
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const [dbSearchQuery, setDbSearchQuery] = useState('');
  const [dbFilterTrade, setDbFilterTrade] = useState('All');
  const [dbFilterGulfReturn, setDbFilterGulfReturn] = useState(false);
  const [showDbFilters, setShowDbFilters] = useState(false);

  const [employerProfile, setEmployerProfile] = useState({
    name: 'John Doe',
    phone: '+971 50 123 4567',
    email: 'john.doe@alfuttaim.com',
    companyName: 'Al-Futtaim Group',
    companyOverview: 'Al-Futtaim Group is a large conglomerate based in Dubai, United Arab Emirates, with operations in automotive, retail, real estate, and finance.',
    logoUrl: 'https://picsum.photos/seed/alfuttaim/150/150'
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmployerProfile(prev => ({ ...prev, [name]: value }));
  };

  const filteredDatabase = MOCK_DATABASE.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(dbSearchQuery.toLowerCase()) || 
                          candidate.trade.toLowerCase().includes(dbSearchQuery.toLowerCase()) ||
                          candidate.location.toLowerCase().includes(dbSearchQuery.toLowerCase());
    const matchesTrade = dbFilterTrade === 'All' || candidate.trade === dbFilterTrade;
    const matchesGulfReturn = !dbFilterGulfReturn || candidate.gulfReturn;
    return matchesSearch && matchesTrade && matchesGulfReturn;
  });

  const uniqueTrades = ['All', ...Array.from(new Set(MOCK_DATABASE.map(c => c.trade)))];

  const handleViewApplications = (jobId: number) => {
    setSelectedJob(jobId);
    setCurrentView('applicants');
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-[#0B1120] text-slate-200 flex font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">GulfPath <span className="text-blue-500">Employer</span></span>
          </div>
        </div>
        
        <div className="p-4 space-y-2 flex-1">
          <SidebarItem icon={Video} label="Ustad Stream" active={currentView === 'ustad-stream'} onClick={() => setCurrentView('ustad-stream')} />
          <SidebarItem icon={Briefcase} label="Job Postings" active={currentView === 'jobs'} onClick={() => setCurrentView('jobs')} />
          <SidebarItem icon={Users} label="Applicants" active={currentView === 'applicants'} onClick={() => setCurrentView('applicants')} />
          <SidebarItem icon={Columns} label="Smart ATS" active={currentView === 'ats'} onClick={() => setCurrentView('ats')} />
          <SidebarItem icon={Database} label="Verified Database" active={currentView === 'database'} onClick={() => setCurrentView('database')} />
          <SidebarItem icon={BarChart2} label="Analytics" active={currentView === 'analytics'} onClick={() => setCurrentView('analytics')} />
          <SidebarItem icon={User} label="My Profile" active={currentView === 'profile'} onClick={() => setCurrentView('profile')} />
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-700 transition-colors" onClick={() => setCurrentView('profile')}>
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center overflow-hidden">
              {employerProfile.logoUrl ? (
                <img src={employerProfile.logoUrl} alt="Company Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User className="w-5 h-5 text-slate-300" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-white truncate w-32">{employerProfile.companyName}</p>
              <p className="text-xs text-slate-400">Premium Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* TOP BAR */}
        <header className="h-20 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search applicants by name or ID..." 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button 
              onClick={() => setCurrentView('post-job')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Post New Job
            </button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-auto p-8">
          
          {/* VIEWS */}
          {currentView === 'ustad-stream' && (
            <div className="max-w-7xl mx-auto h-full flex gap-6">
              {/* MAIN FEED */}
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between mb-6 shrink-0">
                  <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Video className="w-6 h-6 text-blue-500" /> Ustad Stream
                    </h1>
                    <p className="text-sm text-slate-400">High-volume technical hiring feed</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium border border-slate-700 transition-colors flex items-center gap-2">
                      <Filter className="w-4 h-4" /> Filter Stream
                    </button>
                    <button 
                      onClick={() => alert('All Gold Ustads selected for Bulk Hire.')}
                      className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <CheckSquare className="w-4 h-4" /> Select All Gold Ustads
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-8 pb-12">
                  {ustads.map(ustad => (
                    <div key={ustad.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex shadow-xl">
                      {/* VIDEO SECTION */}
                      <div className="w-[300px] shrink-0 bg-black relative">
                        <video 
                          src={ustad.videoUrl} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                              <PlayCircle className="w-3 h-3" /> 30s Intro
                            </span>
                            {ustad.verified && (
                              <span className="bg-yellow-500/20 backdrop-blur-md text-yellow-400 border border-yellow-500/30 text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400" /> Kompally Verified
                              </span>
                            )}
                          </div>
                          <p className="text-white text-sm font-medium line-clamp-2 leading-snug">
                            "Hello, my name is {ustad.name}. I have {ustad.experience}..."
                          </p>
                        </div>
                      </div>

                      {/* DETAILS SECTION */}
                      <div className="flex-1 p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-2xl font-bold text-white mb-1">{ustad.name}</h2>
                            <p className="text-blue-400 font-medium">{ustad.trade}</p>
                          </div>
                          <div className="text-right cursor-pointer hover:opacity-80 transition-opacity" title="Click to watch Trade Test video">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xl border border-emerald-500/30 mb-1">
                              {ustad.score}
                            </div>
                            <p className="text-xs text-slate-400 flex items-center gap-1"><PlayCircle className="w-3 h-3" /> 10x10 Trade Score</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Experience</p>
                            <p className="text-sm text-slate-200 font-medium">{ustad.experience}</p>
                          </div>
                          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Globe className="w-3 h-3" /> Visa Status</p>
                            <p className="text-sm text-emerald-400 font-medium">{ustad.visaStatus}</p>
                          </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center gap-3">
                          <button 
                            onClick={() => alert(`Conditional Offer Sent to ${ustad.name} via WhatsApp.\n\nFinal Visa Processing will unlock once the worker completes 100% of the PDB Hub.\n\nDisclaimer hardcoded in Digital Offer: "GulfPath is a Zero-Fee platform. Do not pay anyone."`)}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                          >
                            <Zap className="w-5 h-5" /> Hire Now
                          </button>
                          <button 
                            onClick={() => alert(`Deep-Dive interview requested with ${ustad.name}.`)}
                            className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                          >
                            <Video className="w-5 h-5" /> Schedule Deep-Dive
                          </button>
                          <button 
                            onClick={() => alert(`${ustad.name} added to shortlist.`)}
                            className="w-12 h-12 shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl flex items-center justify-center transition-colors"
                            title="Shortlist"
                          >
                            <Star className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI MATCH SIDEBAR */}
              <div className="w-80 shrink-0 flex flex-col h-full">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-400" />
                    </div>
                    <h2 className="text-lg font-bold text-white">AI Match Analytics</h2>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
                    {ustads.map(ustad => (
                      <div key={`ai-${ustad.id}`} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-slate-200 text-sm">{ustad.name}</h3>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                            {ustad.matchScore}% Match
                          </span>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 relative">
                          <div className="absolute -left-1.5 top-4 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-900"></div>
                          <p className="text-sm text-slate-300 leading-relaxed pl-2">
                            <span className="font-medium text-blue-400">AI Insight: </span>
                            {ustad.aiInsight}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 mt-6 border-t border-slate-800">
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                      <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Data Security Active
                      </p>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        Only verified businesses with a G-ID can view these profiles. Videos are protected from unauthorized downloading.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'jobs' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Active Job Postings</h1>
                <div className="text-sm text-slate-400">Showing {MOCK_JOBS.length} jobs</div>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 bg-slate-800/50">
                      <th className="p-4 font-medium">Job Title</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Total Views</th>
                      <th className="p-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {MOCK_JOBS.map(job => (
                      <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-white">{job.title}</div>
                          <div className="text-xs text-slate-500 mt-1">Posted {job.date}</div>
                        </td>
                        <td className="p-4"><StatusBadge status={job.status} /></td>
                        <td className="p-4 text-slate-300">{job.views.toLocaleString()}</td>
                        <td className="p-4">
                          <button 
                            onClick={() => handleViewApplications(job.id)}
                            className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            View Applications
                            <span className="bg-blue-600 text-white text-xs py-0.5 px-2 rounded-full">{job.applications}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentView === 'applicants' && (
            <div className="max-w-6xl mx-auto flex gap-6 h-full">
              {/* FILTERS SIDEBAR */}
              <div className="w-64 shrink-0 space-y-6 overflow-y-auto pr-2 pb-8 custom-scrollbar">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-white">Filters</h2>
                  <button className="text-xs text-blue-400 hover:text-blue-300">Clear all</button>
                </div>
                
                <div className="space-y-4">
                  {/* Most Popular */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900" />
                      <span className="text-sm text-slate-300">Most Popular</span>
                    </label>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">Experience</label>
                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
                      <option>Any Experience</option>
                      <option>0-1 years (Fresher)</option>
                      <option>1-3 years</option>
                      <option>3-5 years</option>
                      <option>5+ years</option>
                    </select>
                  </div>

                  {/* Education */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">Education</label>
                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
                      <option>Any Education</option>
                      <option>10th Pass</option>
                      <option>12th Pass</option>
                      <option>ITI</option>
                      <option>Diploma</option>
                      <option>Degree</option>
                    </select>
                  </div>

                  {/* Application Progress */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">Application Progress</label>
                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
                      <option>All Statuses</option>
                      <option>Applied</option>
                      <option>Shortlisted</option>
                      <option>Interviewed</option>
                      <option>Hired</option>
                      <option>Rejected</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">Gender</label>
                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
                      <option>Any Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">Location</label>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-1 flex items-center">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 m-1">
                        Hyderabad <X className="w-3 h-3 cursor-pointer" />
                      </span>
                    </div>
                  </div>
                  
                  {/* AI Score */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">AI Score</label>
                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
                      <option>Any Score</option>
                      <option>&gt; 8/10 (Top Candidates)</option>
                      <option>&gt; 6/10</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* APPLICANTS LIST */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold text-white">
                    Applications for {selectedJob ? MOCK_JOBS.find(j => j.id === selectedJob)?.title : 'All Jobs'}
                  </h1>
                  <div className="flex items-center gap-3">
                    {selectedApplicantsForBulk.length > 0 && (
                      <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 animate-in fade-in">
                        <span className="text-sm text-slate-300">{selectedApplicantsForBulk.length} selected</span>
                        <div className="w-px h-4 bg-slate-600 mx-1"></div>
                        <button className="text-xs font-medium text-blue-400 hover:text-blue-300">Shortlist</button>
                        <button className="text-xs font-medium text-emerald-400 hover:text-emerald-300">WhatsApp</button>
                        <button className="text-xs font-medium text-slate-400 hover:text-white"><Download className="w-3 h-3" /></button>
                      </div>
                    )}
                    <span className="text-sm text-slate-400">Showing {MOCK_APPLICANTS.length} results</span>
                  </div>
                </div>

                {MOCK_APPLICANTS.map(applicant => (
                  <div key={applicant.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4">
                        <div className="pt-1">
                          <input 
                            type="checkbox" 
                            checked={selectedApplicantsForBulk.includes(applicant.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedApplicantsForBulk([...selectedApplicantsForBulk, applicant.id]);
                              } else {
                                setSelectedApplicantsForBulk(selectedApplicantsForBulk.filter(id => id !== applicant.id));
                              }
                            }}
                            className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900" 
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{applicant.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-400 mt-2">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {applicant.location}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {applicant.experience}</span>
                            <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> {applicant.education}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 mb-2">Applied {applicant.appliedDate}</div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                          applicant.match === 'Strong' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                          Resume Match: {applicant.match}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-[120px_1fr] gap-4 mb-4">
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider pt-1">Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {applicant.skills.map(skill => (
                          <span key={skill} className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md border border-slate-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <Star className="w-3 h-3 text-blue-400" /> AI Interview
                      </div>
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={() => setSelectedApplicant(applicant)}
                          className="group flex items-center gap-3 bg-blue-900/20 border border-blue-500/30 hover:bg-blue-900/40 hover:border-blue-500/50 rounded-xl p-2 pr-4 transition-all"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                            applicant.score >= 8 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {applicant.score}
                          </div>
                          <div className="text-sm font-medium text-blue-100">
                            {applicant.trade} Trade Test
                          </div>
                          <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform ml-auto" />
                        </button>
                        
                        <div className="relative">
                          <button 
                            onClick={() => setActiveDropdown(activeDropdown === applicant.id ? null : applicant.id)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Next Steps <ChevronDown className="w-4 h-4" />
                          </button>
                          
                          {activeDropdown === applicant.id && (
                            <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-10 overflow-hidden">
                              <button 
                                onClick={() => { setActiveModal('assignment'); setActionApplicant(applicant); setActiveDropdown(null); }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left"
                              >
                                <CheckSquare className="w-4 h-4" /> Send Assignment
                              </button>
                              <button 
                                onClick={() => { setActiveModal('interview'); setActionApplicant(applicant); setActiveDropdown(null); }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left"
                              >
                                <Calendar className="w-4 h-4" /> Schedule Interview
                              </button>
                              <button 
                                onClick={() => { setActiveModal('chat'); setActionApplicant(applicant); setActiveDropdown(null); }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left"
                              >
                                <MessageSquare className="w-4 h-4" /> Start Chat
                              </button>
                              <div className="border-t border-slate-700 my-1"></div>
                              <button 
                                onClick={() => { setActiveModal('hire'); setActionApplicant(applicant); setActiveDropdown(null); }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-emerald-400 hover:bg-slate-700 hover:text-emerald-300 transition-colors text-left"
                              >
                                <FileSignature className="w-4 h-4" /> Hire Candidate
                              </button>
                              <div className="border-t border-slate-700 my-1"></div>
                              <a 
                                href={`https://wa.me/${applicant.phone.replace('+', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#25D366] hover:bg-slate-700 hover:text-[#128C7E] transition-colors text-left"
                              >
                                <MessageSquare className="w-4 h-4" /> WhatsApp Message
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'ats' && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-6 shrink-0">
                <h1 className="text-2xl font-bold text-white">Smart ATS Pipeline</h1>
                <div className="flex items-center gap-4">
                  <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                    <option>All Active Jobs</option>
                    {MOCK_JOBS.map(job => (
                      <option key={job.id}>{job.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar flex gap-6">
                {['Applied', 'Shortlisted', 'Trade Test', 'Visa Processing', 'Deployed'].map(column => (
                  <div key={column} className="w-80 shrink-0 flex flex-col bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                    <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex items-center justify-between">
                      <h3 className="font-semibold text-white">{column}</h3>
                      <span className="bg-slate-700 text-slate-300 text-xs font-bold px-2 py-1 rounded-full">
                        {MOCK_APPLICANTS.filter(a => a.status === column).length}
                      </span>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto custom-scrollbar space-y-4">
                      {MOCK_APPLICANTS.filter(a => a.status === column).map(applicant => (
                        <div key={applicant.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 cursor-grab hover:border-blue-500/50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-white text-sm">{applicant.name}</h4>
                            <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                              applicant.score >= 8 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {applicant.score}
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 mb-3">{applicant.trade} • {applicant.experience}</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                              applicant.match === 'Strong' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            }`}>
                              {applicant.match} Match
                            </span>
                            <a 
                              href={`https://wa.me/${applicant.phone.replace('+', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#25D366] hover:text-[#128C7E] transition-colors"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'database' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Verified Database</h1>
                <div className="text-sm text-slate-400">Search {MOCK_DATABASE.length} verified profiles</div>
              </div>
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search by name, trade, or location..." 
                      value={dbSearchQuery}
                      onChange={(e) => setDbSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <button 
                    onClick={() => setShowDbFilters(!showDbFilters)}
                    className={`border px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                      showDbFilters || dbFilterTrade !== 'All' || dbFilterGulfReturn 
                        ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
                        : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Filter className="w-4 h-4" /> Filters
                  </button>
                </div>
                
                {showDbFilters && (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap gap-6 animate-in fade-in slide-in-from-top-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Trade</label>
                      <select 
                        value={dbFilterTrade}
                        onChange={(e) => setDbFilterTrade(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 min-w-[150px]"
                      >
                        {uniqueTrades.map(trade => (
                          <option key={trade} value={trade}>{trade}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Experience</label>
                      <label className="flex items-center gap-2 cursor-pointer mt-2">
                        <input 
                          type="checkbox" 
                          checked={dbFilterGulfReturn}
                          onChange={(e) => setDbFilterGulfReturn(e.target.checked)}
                          className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
                        />
                        <span className="text-sm text-slate-300">Gulf Return Only</span>
                      </label>
                    </div>
                    <div className="flex-1 flex justify-end items-end">
                      <button 
                        onClick={() => {
                          setDbSearchQuery('');
                          setDbFilterTrade('All');
                          setDbFilterGulfReturn(false);
                        }}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 bg-slate-800/50">
                      <th className="p-4 font-medium">Candidate</th>
                      <th className="p-4 font-medium">Trade & Experience</th>
                      <th className="p-4 font-medium">Location</th>
                      <th className="p-4 font-medium">AI Score</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredDatabase.length > 0 ? (
                      filteredDatabase.map(candidate => (
                        <tr key={candidate.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4">
                            <div className="font-medium text-white flex items-center gap-2">
                              {candidate.name}
                              {candidate.technical_training?.verified && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" title="Certified Ustad">
                                  <Star className="w-3 h-3 fill-yellow-400" /> Certified Ustad
                                </span>
                              )}
                            </div>
                            {candidate.gulfReturn && (
                              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <CheckCircle2 className="w-3 h-3" /> Gulf Return
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="text-slate-200">{candidate.trade}</div>
                            <div className="text-xs text-slate-500 mt-1">{candidate.experience}</div>
                          </td>
                          <td className="p-4 text-slate-300 flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-slate-500" /> {candidate.location}
                          </td>
                          <td className="p-4">
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
                              candidate.score >= 8 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {candidate.score}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                              candidate.status === 'Available' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                              candidate.status === 'Hired' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            }`}>
                              {candidate.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          No candidates found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentView === 'analytics' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
                <div className="text-sm text-slate-400">Last 6 Months</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-slate-400 font-medium">Total Applicants</h3>
                  </div>
                  <div className="text-3xl font-bold text-white">3,100</div>
                  <div className="text-sm text-emerald-400 mt-2 flex items-center gap-1">
                    <ChevronUp className="w-4 h-4" /> 24% from previous period
                  </div>
                </div>
                
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-slate-400 font-medium">Hired Candidates</h3>
                  </div>
                  <div className="text-3xl font-bold text-white">202</div>
                  <div className="text-sm text-emerald-400 mt-2 flex items-center gap-1">
                    <ChevronUp className="w-4 h-4" /> 18% from previous period
                  </div>
                </div>
                
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-slate-400 font-medium">Active Jobs</h3>
                  </div>
                  <div className="text-3xl font-bold text-white">12</div>
                  <div className="text-sm text-slate-400 mt-2 flex items-center gap-1">
                    Same as last month
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Applicant Trend</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_ANALYTICS_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorApplicants" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                          itemStyle={{ color: '#3b82f6' }}
                        />
                        <Area type="monotone" dataKey="applicants" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorApplicants)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Hiring Conversion</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MOCK_ANALYTICS_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                          cursor={{fill: '#1e293b', opacity: 0.4}}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="hired" name="Hired Candidates" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Trade Distribution</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={MOCK_TRADE_DISTRIBUTION}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {MOCK_TRADE_DISTRIBUTION.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                          itemStyle={{ color: '#f8fafc' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Candidate Sources</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MOCK_SOURCE_DATA} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                        <XAxis type="number" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                          cursor={{fill: '#1e293b', opacity: 0.4}}
                        />
                        <Bar dataKey="value" name="Candidates" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'post-job' && (
            <div className="max-w-4xl mx-auto space-y-8 pb-12">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">Post Job/Internship</h1>
                <p className="text-slate-400">Hire early talent with work experience up to 2 years</p>
              </div>

              {/* Opportunity Type */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Opportunity type</h2>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="opp_type" className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900" defaultChecked />
                    <span className="text-slate-300">Job</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="opp_type" className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Internship</span>
                  </label>
                </div>
              </div>

              {/* Job Details */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white mb-4">Job details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Job title</label>
                  <input type="text" placeholder="e.g. Software Engineer Trainee" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Minimum experience required</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="exp_req" className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900" defaultChecked />
                      <span className="text-slate-300">0 year</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="exp_req" className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900" />
                      <span className="text-slate-300">1 year</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Skills required</label>
                  <input type="text" placeholder="e.g. Java" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Job type</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="job_type" className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900" defaultChecked />
                      <span className="text-slate-300">In office</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="job_type" className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900" />
                      <span className="text-slate-300">Hybrid</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="job_type" className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900" />
                      <span className="text-slate-300">Remote</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Part-time/Full-time</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="time_type" className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900" />
                      <span className="text-slate-300">Part-time</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="time_type" className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900" defaultChecked />
                      <span className="text-slate-300">Full-time</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Number of openings</label>
                  <input type="text" placeholder="e.g. 4" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Job description</label>
                  <textarea 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 h-32 resize-none"
                    placeholder="Key responsibilities:&#10;1.&#10;2.&#10;3."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Additional candidate preferences:</label>
                  <textarea 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                    placeholder="1. e.g. Computer Science Graduate Preferred&#10;2.&#10;3."
                  ></textarea>
                </div>
              </div>

              {/* Salary & perks */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white mb-4">Salary & perks</h2>
                
                <div>
                  <h3 className="text-sm font-medium text-slate-300 mb-4">CTC Breakup</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Fixed pay</label>
                      <p className="text-xs text-slate-500 mb-2">Fixed pay is the fixed component of the CTC</p>
                      <div className="flex items-center gap-3">
                        <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 w-24">
                          <option>₹</option>
                          <option>$</option>
                          <option>AED</option>
                        </select>
                        <input type="text" placeholder="Min" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
                        <span className="text-slate-400">to</span>
                        <input type="text" placeholder="Max" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
                        <span className="text-slate-400 text-sm">per year</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Variables/Incentives</label>
                      <p className="text-xs text-slate-500 mb-2">If the role includes incentives/variable pay, we recommend mentioning it to attract better talent.</p>
                      <div className="flex items-center gap-3">
                        <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 w-24">
                          <option>₹</option>
                          <option>$</option>
                          <option>AED</option>
                        </select>
                        <input type="text" placeholder="Min" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
                        <span className="text-slate-400">to</span>
                        <input type="text" placeholder="Max" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
                        <span className="text-slate-400 text-sm">per year</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-3">Perks <span className="text-xs text-slate-500 font-normal">(Select all that apply)</span></label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900" />
                      <span className="text-slate-300">5 days a week</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900" />
                      <span className="text-slate-300">Health Insurance</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900" />
                      <span className="text-slate-300">Life Insurance</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Screening Questions */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">Screening Questions</h2>
                  <p className="text-sm text-slate-400 mb-4">You can use these questions to filter relevant applications</p>
                </div>
                
                <div className="border border-slate-700 rounded-xl p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Availability <span className="text-slate-500 font-normal">(Default)</span></label>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm text-slate-300">
                      Please confirm your availability for this job. If not available immediately, how early would you be able to join?
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1">
                    + Add more questions (Optional)
                  </button>
                </div>

                <div className="border border-slate-700 rounded-xl p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Alternate mobile number for this listing</label>
                    <p className="text-xs text-slate-500 mb-3">Our team will call you on this number in case of any query regarding this listing only. Primary account number will not be updated.</p>
                    <div className="flex items-center gap-3 max-w-sm">
                      <input type="text" defaultValue="+91" className="w-16 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 text-center" />
                      <input type="text" placeholder="Mobile Number" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4">
                <button className="px-6 py-2.5 rounded-xl text-sm font-medium text-blue-400 hover:bg-blue-900/30 border border-blue-500/30 transition-colors">
                  Save draft
                </button>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-600/20">
                  Post job
                </button>
              </div>
            </div>
          )}
          {currentView === 'profile' && (
            <div className="max-w-4xl mx-auto space-y-8 pb-12">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">My Profile</h1>
                <p className="text-slate-400">Manage your company details and contact information</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8">
                {/* Logo Section */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Company Logo</h2>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                      {employerProfile.logoUrl ? (
                        <img src={employerProfile.logoUrl} alt="Company Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <User className="w-8 h-8 text-slate-500" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Upload New Logo
                        </button>
                        <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                          Remove
                        </button>
                      </div>
                      <p className="text-xs text-slate-500">Recommended size: 400x400px. Max file size: 2MB.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800"></div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={employerProfile.name}
                        onChange={handleProfileChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Contact Phone</label>
                      <input 
                        type="text" 
                        name="phone"
                        value={employerProfile.phone}
                        onChange={handleProfileChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-400 mb-2">Business Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={employerProfile.email}
                        onChange={handleProfileChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" 
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800"></div>

                {/* Company Details */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Company Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        name="companyName"
                        value={employerProfile.companyName}
                        onChange={handleProfileChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Company Overview</label>
                      <textarea 
                        name="companyOverview"
                        value={employerProfile.companyOverview}
                        onChange={handleProfileChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 h-32 resize-none"
                        placeholder="Briefly describe your company, its mission, and what you do..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4">
                <button 
                  onClick={() => setCurrentView('jobs')}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // In a real app, this would save to a backend
                    alert('Profile updated successfully!');
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-600/20"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* DETAILED ANALYSIS MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedApplicant(null)} />
          
          <div className="relative bg-[#0B1120] border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-6">
                <ScoreRing score={selectedApplicant.score} />
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedApplicant.name}</h2>
                  <p className="text-blue-400 font-medium flex items-center gap-2 mt-1">
                    <Briefcase className="w-4 h-4" /> {selectedApplicant.trade} Assessment
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedApplicant(null)}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Summary Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-2xl p-5">
                  <h3 className="text-emerald-400 font-semibold flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5" /> Key Strengths
                  </h3>
                  <ul className="space-y-3">
                    {selectedApplicant.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-5">
                  <h3 className="text-red-400 font-semibold flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5" /> Identified Gaps
                  </h3>
                  <ul className="space-y-3">
                    {selectedApplicant.gaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Q&A Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-blue-400" /> AI Interview Transcript
                  </h3>
                  <div className="flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 px-3 py-1.5 rounded-lg">
                    <Video className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-medium text-blue-200">Clip-and-Compare Enabled</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {selectedApplicant.qa.map((item, index) => (
                    <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                      <div 
                        className="p-4 flex items-start gap-4 cursor-pointer hover:bg-slate-800 transition-colors"
                        onClick={() => setExpandedQa(expandedQa === index ? null : index)}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                          item.score >= 8 ? 'bg-emerald-500/20 text-emerald-400' : item.score >= 6 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.score}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium mb-1">Q: {item.q}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className={`px-2 py-0.5 rounded border ${
                              item.score >= 8 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                              item.score >= 6 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                              'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                              AI Feedback
                            </span>
                            <span className="text-slate-400 truncate max-w-md">{item.feedback}</span>
                          </div>
                        </div>
                        {expandedQa === index ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                      </div>
                      
                      {expandedQa === index && (
                        <div className="p-4 border-t border-slate-700 bg-slate-900/50 space-y-4">
                          {/* Auto-Clipped Video Placeholder */}
                          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-slate-700 group">
                            <img 
                              src={`https://picsum.photos/seed/${selectedApplicant.id}${index}/800/450`} 
                              alt="Video Thumbnail" 
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button className="w-12 h-12 bg-blue-600/80 hover:bg-blue-600 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110">
                                <PlayCircle className="w-6 h-6 text-white" />
                              </button>
                            </div>
                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                              <span className="bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded font-medium">
                                0:15 / 0:45
                              </span>
                              <span className="bg-blue-600/80 backdrop-blur-md text-white text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                                <Video className="w-3 h-3" /> Auto-Clipped
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Candidate Answer (Transcribed)</p>
                            <p className="text-sm text-slate-300 italic">"{item.a}"</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Detailed AI Analysis</p>
                            <p className="text-sm text-slate-300">{item.feedback}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>



            </div>

            {/* Modal Footer / Actions */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between shrink-0">
              <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                <FileText className="w-4 h-4" /> View Original CV
              </button>
              <div className="flex items-center gap-3">
                <button className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 border border-slate-700 transition-colors">
                  Not Interested
                </button>
                <button className="px-6 py-2.5 rounded-xl text-sm font-medium text-blue-400 hover:bg-blue-900/30 border border-blue-500/30 transition-colors">
                  Shortlist
                </button>
                <button 
                  onClick={() => {
                    setSelectedApplicant(null);
                    setActionApplicant(selectedApplicant);
                    setActiveModal('hire');
                  }}
                  className="px-8 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  Hire Candidate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEND ASSIGNMENT MODAL */}
      {activeModal === 'assignment' && actionApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
          <div className="relative bg-[#111827] border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="bg-yellow-500/10 border-b border-yellow-500/20 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-200/80">Assignment must be fair and relevant to the role. Any attempt to obtain free work including but not limited to promoting app/social media via this assignment is against GulfPath policies.</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-blue-400" /> Send Assignment
                </h2>
                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">To:</label>
                  <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white inline-block">{actionApplicant.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                  <textarea 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 h-32 resize-none"
                    defaultValue={`Thank you for your interest in our job opening. As a next step, we are expecting you to complete a short assignment.`}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-400 mb-1 flex items-center gap-2 cursor-pointer hover:text-blue-300 w-max">
                    <Paperclip className="w-4 h-4" /> Attachment
                  </label>
                  <p className="text-xs text-slate-500">Maximum file size 5 MB • Only jpeg, jpg, png, gif, bmp, pdf, zip, xls, doc allowed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Submission deadline</label>
                  <input type="date" className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div className="pt-4">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">Send assignment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {activeModal === 'interview' && actionApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
          <div className="relative bg-[#111827] border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" /> Schedule Interview
                  <span className="ml-2 text-sm font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">AI Score: {actionApplicant.score}/10</span>
                </h2>
                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">To:</label>
                  <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white inline-block">{actionApplicant.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Add Title</label>
                  <input type="text" placeholder="e.g. First round interview with Tech lead" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Interview Type</label>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setInterviewType('video')} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${interviewType === 'video' ? 'bg-blue-600/20 text-blue-400 border-blue-500/50' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}>Video call</button>
                    <button onClick={() => setInterviewType('phone')} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${interviewType === 'phone' ? 'bg-blue-600/20 text-blue-400 border-blue-500/50' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}>Phone</button>
                    <button onClick={() => setInterviewType('office')} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${interviewType === 'office' ? 'bg-blue-600/20 text-blue-400 border-blue-500/50' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}>In-office</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Interview date</label>
                    <input type="date" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Interview time</label>
                    <div className="flex items-center gap-2">
                      <input type="time" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" />
                      <span className="text-slate-500">to</span>
                      <input type="time" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </div>
                {interviewType === 'video' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Share video call link</label>
                    <input type="text" placeholder="e.g. https://meet.google.com/..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                )}
                {interviewType === 'office' && (
                  <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-xl">
                    <p className="text-sm text-blue-300 font-medium flex items-center gap-2 mb-1"><MapPin className="w-4 h-4" /> Kompally HQ Address Appended</p>
                    <p className="text-xs text-slate-400">The candidate will receive directions to: GulfPath HQ, Suchitra Road, Kompally, Hyderabad.</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Add description</label>
                  <textarea 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 h-32 resize-none"
                    defaultValue={`Hi ${actionApplicant.name},\n\nCan you please confirm your availability for the mentioned date and time? Let me know in case of reschedule.\n\nI am available at +91-9876543210 for any further clarification.`}
                  ></textarea>
                </div>
                <div className="pt-4">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">Schedule Interview</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* START CHAT MODAL */}
      {activeModal === 'chat' && actionApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
          <div className="relative bg-[#111827] border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {actionApplicant.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-white">{actionApplicant.name}</h2>
                  <p className="text-xs text-slate-400">Applied for {actionApplicant.trade}</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0B1120]">
              <div className="text-center text-xs text-slate-500 my-4">Today</div>
              {/* Chat messages would go here */}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
              {actionApplicant.gaps.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-medium text-blue-400">Sathi Suggests (Based on AI Interview Gaps):</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <button className="shrink-0 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-full transition-colors">
                      Ask about: {actionApplicant.gaps[0]}
                    </button>
                  </div>
                </div>
              )}
              <div className="relative">
                <textarea 
                  placeholder="Write a message..." 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-white focus:outline-none focus:border-blue-500 resize-none h-24"
                ></textarea>
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-white transition-colors"><Paperclip className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-slate-500">Max file size: 10MB. File type allowed: zip, pdf, doc, docx, jpeg, jpg, png</span>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HIRE CONFIRMATION MODAL */}
      {activeModal === 'hire' && actionApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
          <div className="relative bg-[#111827] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileSignature className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Hire Candidate</h2>
            <p className="text-slate-300 mb-6">Are you sure you want to hire <span className="font-semibold text-white">{actionApplicant.name}</span>?</p>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-slate-400 mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI Interview Score: {actionApplicant.score}/10</p>
              <p className="text-sm text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Hire PDF will be generated</p>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Simulate hire action
                  alert(`Verified Hire PDF generated for ${actionApplicant.name}.`);
                  setActiveModal(null);
                }}
                className="px-8 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all"
              >
                Hire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
