import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plane, 
  PlayCircle, 
  CheckCircle, 
  BookOpen, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight,
  Lock,
  Award
} from "lucide-react";

export default function PDBHub() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const modules = [
    {
      id: 1,
      title: "Airport Navigation 101",
      description: "How to read your boarding pass, find your gate, and use airplane facilities.",
      icon: <Plane className="w-6 h-6 text-blue-500" />,
      duration: "5 mins",
      status: "completed", // completed, active, locked
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      id: 2,
      title: "Basic Arabic for the Worksite",
      description: "Learn essential phrases to communicate with your supervisor and colleagues.",
      icon: <MessageSquare className="w-6 h-6 text-emerald-500" />,
      duration: "8 mins",
      status: "active",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      id: 3,
      title: "Know Your Rights (GCC Labor Law)",
      description: "Important rules about your passport, working hours, and how to report issues.",
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      duration: "6 mins",
      status: "locked",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      id: 4,
      title: "Cultural Etiquette",
      description: "Do's and don'ts in the Gulf to ensure a smooth and respectful stay.",
      icon: <BookOpen className="w-6 h-6 text-amber-500" />,
      duration: "4 mins",
      status: "locked",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      {/* Header Section */}
      <div className="bg-slate-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 text-sm font-semibold tracking-wide uppercase mb-4">
                <Plane className="w-4 h-4" />
                Sathi Flying School
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Pre-Departure Briefing Hub
              </h1>
              <p className="text-lg text-slate-300 font-light leading-relaxed">
                Mandatory orientation to ensure you arrive in the Gulf confident, prepared, and ready to work on Day 1. Complete all modules to unlock your flight ticket.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center min-w-[250px]">
              <div className="text-4xl font-bold text-emerald-400 mb-2">25%</div>
              <p className="text-sm text-slate-300 font-medium uppercase tracking-wider">Course Completed</p>
              <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Modules List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Training Modules</h2>
            
            {modules.map((module) => (
              <div 
                key={module.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  activeModule === module.id ? 'border-blue-500 shadow-lg ring-4 ring-blue-50' : 
                  module.status === 'locked' ? 'border-slate-200 opacity-75' : 'border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer'
                }`}
                onClick={() => module.status !== 'locked' && setActiveModule(module.id)}
              >
                <div className="p-6 flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                    module.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                    module.status === 'active' ? 'bg-blue-100 text-blue-600' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {module.status === 'locked' ? <Lock className="w-6 h-6" /> : module.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-lg font-bold ${module.status === 'locked' ? 'text-slate-500' : 'text-slate-900'}`}>
                        {module.title}
                      </h3>
                      {module.status === 'completed' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full uppercase tracking-wider">
                          <CheckCircle className="w-3 h-3" /> Done
                        </span>
                      )}
                      {module.status === 'active' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full uppercase tracking-wider">
                          <PlayCircle className="w-3 h-3" /> Next
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                      <span className="flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" /> {module.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Video Player Area (Expands when active) */}
                {activeModule === module.id && (
                  <div className="bg-slate-900 p-4 border-t border-slate-100">
                    <div className="aspect-video bg-black rounded-xl overflow-hidden relative flex items-center justify-center">
                      {/* Placeholder for actual video iframe */}
                      <div className="text-center">
                        <PlayCircle className="w-16 h-16 text-white/50 mx-auto mb-4" />
                        <p className="text-white font-medium">Interactive Video Player</p>
                        <p className="text-slate-400 text-sm mt-2">Simulating: {module.title}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button 
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle completion logic here
                          setActiveModule(null);
                        }}
                      >
                        Mark as Completed <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Why is this mandatory?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Employers love workers who arrive "ready to work" on Day 1. Completing this orientation proves you are a professional who understands the rules and culture of the GCC.
              </p>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-xs text-amber-800 font-medium">
                  <span className="font-bold">Important:</span> Your flight ticket will only be issued after you score 100% on the final quiz.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-6">
                If you don't understand something, Sathi is here to explain it in your local language.
              </p>
              <button 
                onClick={() => {
                  const event = new CustomEvent('open-voice-assistant');
                  window.dispatchEvent(event);
                }}
                className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Ask Sathi
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
