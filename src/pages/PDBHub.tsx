import React from 'react';
import { PlayCircle, FileText, AlertTriangle, PhoneCall, Globe, BookOpen, Shield, Users } from 'lucide-react';

export default function PDBHub() {
  const videos = [
    { id: 1, title: 'UAE Labor Law Basics (Hindi)', duration: '5:30', thumbnail: 'https://picsum.photos/seed/uaelaw/400/225' },
    { id: 2, title: 'Safety at Construction Sites', duration: '8:15', thumbnail: 'https://picsum.photos/seed/safety/400/225' },
    { id: 3, title: 'Understanding Your Contract', duration: '6:45', thumbnail: 'https://picsum.photos/seed/contract/400/225' },
    { id: 4, title: 'Cultural Norms in Saudi Arabia', duration: '4:20', thumbnail: 'https://picsum.photos/seed/culture/400/225' },
  ];

  const guides = [
    { id: 1, title: 'Emergency Contacts Directory', icon: PhoneCall, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 2, title: 'Worker Rights & Responsibilities', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 3, title: 'Remittance & Banking Guide', icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 4, title: 'Dispute Resolution Process', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Pre-Departure Briefing (PDB) Hub</h1>
          <p className="text-blue-100 text-lg mb-8">
            Essential training, guides, and resources to prepare you for your new job in the GCC. Watch the videos and read the guides before your flight.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
              <PlayCircle className="w-5 h-5" /> Start Mandatory Training
            </button>
            <select className="bg-blue-700 border border-blue-500 text-white px-4 py-3 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-white/50">
              <option>Language: Hindi</option>
              <option>Language: English</option>
              <option>Language: Malayalam</option>
              <option>Language: Telugu</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-blue-600" />
            Training Videos
          </h2>
          <button className="text-blue-600 font-medium hover:text-blue-700">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden aspect-video mb-3">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                  {video.duration}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Essential Guides & Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className={`w-12 h-12 rounded-xl ${guide.bg} ${guide.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <guide.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{guide.title}</h3>
              <p className="text-sm text-gray-500 mb-4">Download or read online in your preferred language.</p>
              <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Guide &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
