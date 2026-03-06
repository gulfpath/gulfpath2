import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search, MapPin, Briefcase, Mic, ShieldCheck, Home, FileText, Zap, Wrench, Truck, HardHat, Bell, X, Filter, ChevronDown } from "lucide-react";
import JobCard from "../components/JobCard";
import { jobsData } from "../data/jobs";

export default function Jobs() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [salaryRange, setSalaryRange] = useState<string>("all");
  const searchRef = useRef<HTMLDivElement>(null);

  const popularKeywords = [
    "AC Technician", "Heavy Driver", "Electrician", "Plumber", "Mason", "Dubai", "Saudi", "Qatar", "Oman"
  ];

  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    return popularKeywords.filter(k => k.toLowerCase().includes(searchTerm.toLowerCase()) && k.toLowerCase() !== searchTerm.toLowerCase());
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'hi-IN'; // Defaulting to Hindi for this demographic
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setSearchTerm(speechResult);
      setShowSuggestions(false);
      
      // Basic parsing logic
      if (speechResult.toLowerCase().includes("dubai")) setSelectedCountry("UAE");
      if (speechResult.toLowerCase().includes("saudi")) setSelectedCountry("KSA");
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const jobs = jobsData.map((job, index) => ({
    ...job,
    isQuickApply: index % 3 === 0 // Mocking quick apply for some jobs
  }));

  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry ? job.country === selectedCountry : true;
      const matchesVerified = activeFilters.includes('zero-fee') ? job.isEmployerVerified === true : true;
      const matchesHousing = activeFilters.includes('housing') ? job.housingProvided === true : true;
      const matchesEcr = activeFilters.includes('ecr') ? job.isEcrAccepted === true : true;
      const matchesFood = activeFilters.includes('food') ? job.benefits.includes("Free Food") : true;
      const matchesVisa = activeFilters.includes('visa') ? job.isFree === true : true;
      
      // Basic salary filter mock
      let matchesSalary = true;
      if (salaryRange === "high") {
        matchesSalary = job.salary.includes("3,") || job.salary.includes("4,") || job.salary.includes("5,");
      } else if (salaryRange === "medium") {
        matchesSalary = job.salary.includes("2,");
      }

      return matchesSearch && matchesCountry && matchesVerified && matchesHousing && matchesEcr && matchesFood && matchesVisa && matchesSalary;
    })
    .sort((a, b) => {
      // Move jobs older than 30 days to the bottom
      if (a.postedDaysAgo > 30 && b.postedDaysAgo <= 30) return 1;
      if (a.postedDaysAgo <= 30 && b.postedDaysAgo > 30) return -1;
      return a.postedDaysAgo - b.postedDaysAgo;
    });

  const isSearching = searchTerm !== "" || activeFilters.length > 0 || selectedCountry !== null || salaryRange !== "all";
  const recommendedJobs = jobs.slice(0, 3); // Mock recommended jobs

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Bar with Voice and Smart Suggestions */}
        <div className="relative mb-6" ref={searchRef}>
          <div className={`bg-white p-2 rounded-2xl shadow-sm border flex items-center transition-all ${showSuggestions ? 'border-blue-500 ring-4 ring-blue-50' : 'border-gray-200'}`}>
            <div className="flex-1 flex items-center px-4">
              <Search className="h-6 w-6 text-gray-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="e.g., Plumber in Dubai..."
                className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500 py-4 outline-none text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="p-2 text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <button 
              onClick={handleVoiceSearch}
              className={`p-4 rounded-xl transition-colors shrink-0 mr-2 ${isListening ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
            >
              <Mic className="h-6 w-6" />
            </button>
          </div>

          {/* Smart Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-20">
              {!searchTerm ? (
                <>
                  <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Trending Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {["AC Technician in Dubai", "Heavy Driver in Saudi", "Electrician in Qatar", "Plumber in Oman"].map((suggestion) => (
                      <button 
                        key={suggestion}
                        onClick={() => {
                          setSearchTerm(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="bg-gray-50 hover:bg-blue-50 hover:text-blue-700 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-gray-200 hover:border-blue-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {suggestions.length > 0 ? (
                    <ul className="py-2">
                      {suggestions.map((suggestion, index) => (
                        <li key={index}>
                          <button
                            onClick={() => {
                              setSearchTerm(suggestion);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-3"
                          >
                            <Search className="h-4 w-4 text-gray-400" />
                            {suggestion}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm p-2">Press enter to search for "{searchTerm}"</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Visual Categories Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
          <button onClick={() => setSearchTerm("Electrician")} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="bg-blue-50 p-3 rounded-full mb-2 group-hover:bg-blue-100 transition-colors">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-gray-700">Electrician</span>
          </button>
          <button onClick={() => setSearchTerm("Plumber")} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="bg-blue-50 p-3 rounded-full mb-2 group-hover:bg-blue-100 transition-colors">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-gray-700">Plumber</span>
          </button>
          <button onClick={() => setSearchTerm("Mason")} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="bg-blue-50 p-3 rounded-full mb-2 group-hover:bg-blue-100 transition-colors">
              <HardHat className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-gray-700">Mason</span>
          </button>
          <button onClick={() => setSearchTerm("Driver")} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="bg-blue-50 p-3 rounded-full mb-2 group-hover:bg-blue-100 transition-colors">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-gray-700">Driver</span>
          </button>
          
          {/* Country Flags */}
          <button onClick={() => setSelectedCountry(selectedCountry === "UAE" ? null : "UAE")} className={`flex flex-col items-center justify-center p-4 bg-white rounded-2xl border transition-all ${selectedCountry === "UAE" ? 'border-blue-500 shadow-md bg-blue-50/50' : 'border-gray-100 hover:border-blue-300'}`}>
            <span className="text-3xl mb-1">🇦🇪</span>
            <span className="text-xs font-bold text-gray-700">UAE</span>
          </button>
          <button onClick={() => setSelectedCountry(selectedCountry === "KSA" ? null : "KSA")} className={`flex flex-col items-center justify-center p-4 bg-white rounded-2xl border transition-all ${selectedCountry === "KSA" ? 'border-blue-500 shadow-md bg-blue-50/50' : 'border-gray-100 hover:border-blue-300'}`}>
            <span className="text-3xl mb-1">🇸🇦</span>
            <span className="text-xs font-bold text-gray-700">KSA</span>
          </button>
          <button onClick={() => setSelectedCountry(selectedCountry === "Qatar" ? null : "Qatar")} className={`flex flex-col items-center justify-center p-4 bg-white rounded-2xl border transition-all ${selectedCountry === "Qatar" ? 'border-blue-500 shadow-md bg-blue-50/50' : 'border-gray-100 hover:border-blue-300'}`}>
            <span className="text-3xl mb-1">🇶🇦</span>
            <span className="text-xs font-bold text-gray-700">Qatar</span>
          </button>
          <button onClick={() => setSelectedCountry(selectedCountry === "Oman" ? null : "Oman")} className={`flex flex-col items-center justify-center p-4 bg-white rounded-2xl border transition-all ${selectedCountry === "Oman" ? 'border-blue-500 shadow-md bg-blue-50/50' : 'border-gray-100 hover:border-blue-300'}`}>
            <span className="text-3xl mb-1">🇴🇲</span>
            <span className="text-xs font-bold text-gray-700">Oman</span>
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" /> Filters
            </h3>
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {showAdvancedFilters ? 'Hide Advanced' : 'Show Advanced'}
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => toggleFilter('zero-fee')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                activeFilters.includes('zero-fee') 
                  ? 'bg-green-50 border-green-500 text-green-700' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <ShieldCheck className={`h-4 w-4 ${activeFilters.includes('zero-fee') ? 'text-green-600' : 'text-gray-400'}`} />
              Verified Employers Only
            </button>
            <button 
              onClick={() => toggleFilter('housing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                activeFilters.includes('housing') 
                  ? 'bg-blue-50 border-blue-500 text-blue-700' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <Home className={`h-4 w-4 ${activeFilters.includes('housing') ? 'text-blue-600' : 'text-gray-400'}`} />
              Housing Provided
            </button>
            <button 
              onClick={() => toggleFilter('ecr')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                activeFilters.includes('ecr') 
                  ? 'bg-purple-50 border-purple-500 text-purple-700' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className={`h-4 w-4 ${activeFilters.includes('ecr') ? 'text-purple-600' : 'text-gray-400'}`} />
              ECR Accepted
            </button>
          </div>

          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <select 
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                >
                  <option value="all">Any Salary</option>
                  <option value="medium">Medium (2,000+)</option>
                  <option value="high">High (3,000+)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleFilter('food')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      activeFilters.includes('food') 
                        ? 'bg-orange-50 border-orange-500 text-orange-700' 
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Free Food
                  </button>
                  <button 
                    onClick={() => toggleFilter('visa')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      activeFilters.includes('visa') 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Visa Sponsored
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Job Alerts Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Bell className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Get Job Alerts on WhatsApp</h3>
              <p className="text-blue-100 text-sm">We'll message you when new {searchTerm || 'jobs'} are posted in {selectedCountry || 'the GCC'}.</p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap">
            Enable Alerts
          </button>
        </div>

        {/* Recommended for You Section (Only show when not searching) */}
        {!isSearching && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-500" fill="currentColor" /> 
                  Recommended for You
                </h2>
                <p className="text-gray-500 text-sm mt-1">Based on your profile and saved jobs</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.map((job) => (
                <JobCard key={`rec-${job.id}`} {...job} />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">{isSearching ? 'Search Results' : 'All Jobs'}</h2>
          <span className="text-sm text-gray-500 font-medium">Showing {filteredJobs.length} jobs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
