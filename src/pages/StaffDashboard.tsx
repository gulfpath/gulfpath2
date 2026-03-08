import React, { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle, Video, FileText, User, MapPin, Phone, Briefcase, Calendar, Star, Download, PlayCircle } from 'lucide-react';

export default function StaffDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [candidate, setCandidate] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Mock data for demonstration
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length > 5) {
      setCandidate({
        id: 'GP-2026-8942',
        name: 'Ramesh Kumar',
        phone: searchQuery,
        trade: 'Industrial Electrician',
        location: 'Hyderabad, Telangana',
        score: 8.5,
        status: 'Verified',
        date: '2026-03-07',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video
        summary: 'Excellent technical knowledge of 3-phase wiring and safety protocols. Clear communication in Hindi. Highly recommended for Dubai roles.',
        questions: [
          { q: 'Explain 3-phase motor wiring.', a: 'Explained delta and star connections clearly.', score: 5 },
          { q: 'What is the difference between MCB and fuse?', a: 'MCB is reusable, fuse burns out.', score: 4 },
          { q: 'How do you prevent heatstroke on site?', a: 'Drink water, take breaks in shade, wear proper PPE.', score: 5 },
        ]
      });
    } else {
      setCandidate(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kompally HQ Dashboard</h1>
            <p className="text-gray-500 mt-1">Staff Verification & Candidate Processing</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-gray-700">System Online</span>
          </div>
        </div>

        {/* Search / Scan Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Enter Candidate Phone Number or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </form>
            <button 
              onClick={() => setIsScanning(!isScanning)}
              className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isScanning ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'}`}
            >
              {isScanning ? 'Stop Scanner' : 'Scan QR Code'}
            </button>
          </div>
          
          {isScanning && (
            <div className="mt-6 bg-gray-900 rounded-xl h-64 flex flex-col items-center justify-center text-white relative overflow-hidden">
              <div className="absolute inset-0 border-4 border-blue-500/30 rounded-xl"></div>
              <div className="w-full h-1 bg-blue-500 absolute top-0 animate-[scan_2s_ease-in-out_infinite]"></div>
              <Video className="w-12 h-12 text-gray-500 mb-4" />
              <p className="font-medium text-gray-400">Camera Active - Point at Candidate's QR Code</p>
            </div>
          )}
        </div>

        {/* Candidate Profile */}
        {candidate ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Left Column: Profile & Video */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{candidate.name}</h2>
                    <p className="text-gray-500 font-medium">{candidate.id}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{candidate.trade}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{candidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">Interviewed: {candidate.date}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 font-medium">Verification Status</span>
                    {candidate.score >= 7 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> PENDING
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Video Evidence */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600" /> 10x10 Interview Video
                </h3>
                <div className="rounded-xl overflow-hidden bg-gray-900 relative group cursor-pointer">
                  <video src={candidate.videoUrl} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-medium">
                    10:00
                  </div>
                </div>
                <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download Video
                </button>
              </div>
            </div>

            {/* Right Column: Assessment Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Score Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-8">
                <div className="relative w-32 h-32 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#F3F4F6" strokeWidth="10" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" 
                      stroke={candidate.score >= 7 ? "#10B981" : candidate.score >= 5 ? "#F59E0B" : "#EF4444"} 
                      strokeWidth="10" 
                      strokeDasharray={`${(candidate.score / 10) * 283} 283`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-gray-900">{candidate.score}</span>
                    <span className="text-xs text-gray-500 font-bold">/ 10</span>
                  </div>
                </div>
                
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
                    <Star className="w-3 h-3" /> AI Assessment Result
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Executive Summary</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {candidate.summary}
                  </p>
                </div>
              </div>

              {/* Q&A Breakdown */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" /> Interview Transcript & Scoring
                </h3>
                <div className="space-y-6">
                  {candidate.questions.map((q: any, i: number) => (
                    <div key={i} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold shrink-0">
                          Q{i+1}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 mb-2">{q.q}</p>
                          <div className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100">
                            <p className="text-gray-700 italic">"{q.a}"</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">AI Evaluation</span>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${q.score >= 4 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              Score: {q.score}/5
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-colors shadow-lg">
                  Proceed to Visa Processing
                </button>
                <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-4 rounded-xl font-bold transition-colors shadow-sm">
                  Request Re-Interview
                </button>
              </div>

            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Candidate Selected</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter a phone number or candidate ID in the search bar above, or scan their QR code to view their verified profile and interview results.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
