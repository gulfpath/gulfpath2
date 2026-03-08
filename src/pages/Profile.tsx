import React, { useState } from 'react';
import { User, Briefcase, FileText, Upload, CheckCircle, MapPin, Phone, Mail, Award, Edit2, Plus, ShieldCheck, X, Save, Trash2, QrCode, Mic, Video, Plane, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { SathiProfileBuilder } from '../components/SathiProfileBuilder';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState<'overview' | 'experience' | 'documents' | 'header' | null>(null);
  const [showPassport, setShowPassport] = useState(false);

  const [candidate, setCandidate] = useState({
    name: 'Rajesh Kumar',
    title: 'Senior Electrician',
    location: 'Kerala, India',
    phone: '+91 98765 43210',
    email: 'rajesh.k@example.com',
    experience: '8 Years',
    passportStatus: 'ECNR',
    gulfReturn: true,
    skills: ['Residential Wiring', 'Industrial Panels', 'Troubleshooting', 'Safety Compliance', 'Blueprint Reading'],
    about: 'Dedicated and safety-conscious electrician with 8 years of experience in residential and commercial electrical systems. Proven track record of working in the GCC region (UAE) with a strong understanding of local regulations and standards. Seeking a challenging role in the Middle East to leverage my expertise in industrial panels and troubleshooting.',
    workHistory: [
      {
        id: 1,
        role: 'Lead Electrician',
        company: 'Al Futtaim Engineering',
        location: 'Dubai, UAE',
        duration: '2018 - 2023',
        description: 'Managed a team of 5 electricians for commercial building projects. Ensured compliance with DEWA regulations.'
      },
      {
        id: 2,
        role: 'Electrician',
        company: 'L&T Construction',
        location: 'Mumbai, India',
        duration: '2015 - 2018',
        description: 'Performed electrical installations for high-rise residential buildings.'
      }
    ],
    documents: [
      { id: 1, name: 'Passport Copy.pdf', type: 'PDF', date: 'Oct 12, 2023', verified: true },
      { id: 2, name: 'Trade Certificate.pdf', type: 'PDF', date: 'Oct 15, 2023', verified: true },
      { id: 3, name: 'Medical Fitness.jpg', type: 'Image', date: 'Nov 02, 2023', verified: false },
      { id: 4, name: 'Resume_Updated.pdf', type: 'PDF', date: 'Jan 10, 2024', verified: false }
    ],
    aiScore: 8.5
  });

  // Edit State
  const [editData, setEditData] = useState({ ...candidate });
  const [newSkill, setNewSkill] = useState('');

  const handleEditClick = (section: 'overview' | 'experience' | 'documents' | 'header') => {
    setEditData({ ...candidate });
    setEditSection(section);
    setIsEditing(true);
    if (section !== 'header') {
      setActiveTab(section);
    }
  };

  const handleSave = () => {
    setCandidate({ ...editData });
    setIsEditing(false);
    setEditSection(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditSection(null);
  };

  const addSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData({ ...editData, skills: [...editData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditData({ ...editData, skills: editData.skills.filter(s => s !== skillToRemove) });
  };

  const handleWorkHistoryChange = (id: number, field: string, value: string) => {
    setEditData({
      ...editData,
      workHistory: editData.workHistory.map(job => 
        job.id === id ? { ...job, [field]: value } : job
      )
    });
  };

  const removeWorkHistory = (id: number) => {
    setEditData({
      ...editData,
      workHistory: editData.workHistory.filter(job => job.id !== id)
    });
  };

  const addWorkHistory = () => {
    const newJob = {
      id: Date.now(),
      role: '',
      company: '',
      location: '',
      duration: '',
      description: ''
    };
    setEditData({
      ...editData,
      workHistory: [newJob, ...editData.workHistory]
    });
  };

  const removeDocument = (id: number) => {
    setEditData({
      ...editData,
      documents: editData.documents.filter(doc => doc.id !== id)
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Digital Skill Passport Modal */}
      <AnimatePresence>
        {showPassport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPassport(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-gradient-to-br from-[#0B1120] to-slate-900 border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              {/* Passport Header */}
              <div className="bg-blue-600 p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <button 
                  onClick={() => setShowPassport(false)}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold shadow-lg border-4 border-blue-400 mb-3">
                    {candidate.name.charAt(0)}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{candidate.name}</h2>
                  <p className="text-blue-200 font-medium">{candidate.title}</p>
                </div>
              </div>

              {/* Passport Body */}
              <div className="p-6 space-y-6">
                
                {/* Score & Status */}
                <div className="flex items-center justify-between bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">AI Score</p>
                    <div className="text-2xl font-bold text-emerald-400">{candidate.aiScore}/10</div>
                  </div>
                  <div className="w-px h-12 bg-slate-700"></div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Status</p>
                    <div className="inline-flex items-center gap-1 text-sm font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
                      <ShieldCheck className="w-4 h-4" /> Verified
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-sm">Experience</span>
                    <span className="text-white font-medium">{candidate.experience}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-sm">Passport</span>
                    <span className="text-white font-medium">{candidate.passportStatus}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-sm">Gulf Return</span>
                    <span className="text-white font-medium">{candidate.gulfReturn ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-slate-400 text-sm">Medical Status</span>
                    <span className="text-amber-400 font-medium text-sm">Pending GAMCA</span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl">
                  <QRCodeSVG value={`https://gulfpath.in/verify/${candidate.phone.replace(/\D/g, '')}`} size={120} />
                  <p className="text-xs text-slate-500 font-mono mt-3 font-bold tracking-widest">SCAN TO VERIFY</p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Profile Section */}
        <div className="bg-blue-600 px-8 py-12 text-white relative">
          <div className="absolute top-4 right-4 flex gap-3">
            {!isEditing && (
              <>
                <button 
                  onClick={() => setShowPassport(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 transition-colors px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg"
                >
                  <QrCode className="w-4 h-4" />
                  Digital Passport
                </button>
                <button 
                  onClick={() => handleEditClick('header')}
                  className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium backdrop-blur-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile Info
                </button>
              </>
            )}
          </div>
          
          {isEditing && editSection === 'header' ? (
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Edit Basic Information</h2>
                <div className="flex gap-2">
                  <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 rounded-lg transition-colors">Cancel</button>
                  <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-1">Full Name</label>
                  <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-1">Job Title</label>
                  <input type="text" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-1">Location</label>
                  <input type="text" value={editData.location} onChange={(e) => setEditData({...editData, location: e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-1">Phone Number</label>
                  <input type="text" value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-1">Email</label>
                  <input type="email" value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-1">Experience</label>
                  <input type="text" value={editData.experience} onChange={(e) => setEditData({...editData, experience: e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-1">Passport Status</label>
                  <select value={editData.passportStatus} onChange={(e) => setEditData({...editData, passportStatus: e.target.value})} className="w-full bg-blue-700/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                    <option value="ECNR">ECNR</option>
                    <option value="ECR">ECR</option>
                  </select>
                </div>
                <div className="flex items-center mt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editData.gulfReturn} onChange={(e) => setEditData({...editData, gulfReturn: e.target.checked})} className="w-4 h-4 rounded border-white/20 text-blue-500 focus:ring-blue-500 bg-white/10" />
                    <span className="text-sm font-medium text-blue-100">Gulf Return</span>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold shadow-lg border-4 border-blue-100">
                {candidate.name.charAt(0)}
              </div>
              <div className="text-center md:text-left mt-4 md:mt-0">
                <h1 className="text-3xl font-bold">{candidate.name}</h1>
                <p className="text-blue-100 text-lg mt-1">{candidate.title}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-blue-50">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {candidate.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {candidate.email}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/10">
                    {candidate.experience} Experience
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/10">
                    Passport: {candidate.passportStatus}
                  </span>
                  {candidate.gulfReturn && (
                    <span className="bg-emerald-500/80 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-emerald-400/50 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Gulf Return
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-100 px-8 flex flex-wrap gap-8">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
          >
            Overview & Skills
          </button>
          <button 
            onClick={() => setActiveTab('experience')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'experience' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
          >
            Work Experience
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'documents' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
          >
            Document Vault
          </button>
          <button 
            onClick={() => setActiveTab('deployment')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'deployment' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
          >
            Deployment Status
          </button>
          <button 
            onClick={() => setActiveTab('sathi')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'sathi' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-indigo-500 hover:text-indigo-700'}`}
          >
            <Mic className="w-4 h-4" />
            Sathi AI Builder
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {isEditing && editSection === 'overview' ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Edit Overview & Skills</h2>
                    <div className="flex gap-2">
                      <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                      <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
                    <textarea 
                      value={editData.about}
                      onChange={(e) => setEditData({...editData, about: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[150px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {editData.skills.map((skill, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100 flex items-center gap-2">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="text-blue-400 hover:text-blue-600"><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        placeholder="Add a new skill"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <button onClick={addSkill} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">Add</button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        Core Skills
                      </h3>
                      <button onClick={() => handleEditClick('overview')} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      About Me
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {candidate.about}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Video className="w-5 h-5 text-blue-600" />
                      Video "Trade Test" Resume
                    </h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-full md:w-1/3 aspect-video bg-slate-800 rounded-xl overflow-hidden relative group">
                        <img src="https://picsum.photos/seed/welding/600/400" alt="Video Thumbnail" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="w-12 h-12 bg-blue-600/90 hover:bg-blue-600 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                          </button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">0:30</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-2">Residential Wiring Demonstration</h4>
                        <p className="text-sm text-slate-600 mb-4">A 30-second clip demonstrating my ability to wire a standard distribution board safely and efficiently.</p>
                        <div className="flex gap-3">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                            <Upload className="w-4 h-4" /> Replace Video
                          </button>
                          <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {isEditing && editSection === 'experience' ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Edit Work Experience</h2>
                    <div className="flex gap-2">
                      <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                      <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
                    </div>
                  </div>

                  <button onClick={addWorkHistory} className="w-full border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-600 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 mb-6">
                    <Plus className="w-5 h-5" /> Add New Experience
                  </button>

                  <div className="space-y-6">
                    {editData.workHistory.map((job) => (
                      <div key={job.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6 relative">
                        <button onClick={() => removeWorkHistory(job.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input type="text" value={job.role} onChange={(e) => handleWorkHistoryChange(job.id, 'role', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input type="text" value={job.company} onChange={(e) => handleWorkHistoryChange(job.id, 'company', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" value={job.location} onChange={(e) => handleWorkHistoryChange(job.id, 'location', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (e.g., 2018 - 2023)</label>
                            <input type="text" value={job.duration} onChange={(e) => handleWorkHistoryChange(job.id, 'duration', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea value={job.description} onChange={(e) => handleWorkHistoryChange(job.id, 'description', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      Work History
                    </h3>
                    <button onClick={() => handleEditClick('experience')} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                      <Edit2 className="w-4 h-4" /> Edit Experience
                    </button>
                  </div>
                  
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                    {candidate.workHistory.map((job, idx) => (
                      <div key={job.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-gray-900 text-lg">{job.role}</h4>
                            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">{job.duration}</span>
                          </div>
                          <p className="text-gray-700 font-medium mb-2">{job.company}</p>
                          <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {job.location}
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'documents' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {isEditing && editSection === 'documents' ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Manage Documents</h2>
                    <div className="flex gap-2">
                      <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                      <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl p-8 text-center">
                    <Upload className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                    <h3 className="font-medium text-blue-900 mb-1">Click to upload or drag and drop</h3>
                    <p className="text-sm text-blue-600/70 mb-4">PDF, JPG, PNG (Max 5MB)</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Browse Files</button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900">Current Documents</h3>
                    {editData.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Uploaded on {doc.date}</p>
                          </div>
                        </div>
                        <button onClick={() => removeDocument(doc.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Document Vault
                    </h3>
                    <button onClick={() => handleEditClick('documents')} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                      <Edit2 className="w-4 h-4" /> Manage Documents
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Required Documents Section */}
                    <div className="col-span-1 md:col-span-2 mb-2">
                      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Required for GCC Deployment</h4>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-blue-200 bg-blue-50/50 rounded-xl hover:border-blue-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">Passport (Front & Back)</p>
                          <p className="text-xs text-blue-600 font-medium mt-0.5">Status: ECNR Verified</p>
                        </div>
                      </div>
                      <div>
                        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Verified
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-amber-200 bg-amber-50/50 rounded-xl hover:border-amber-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">GAMCA Medical Report</p>
                          <p className="text-xs text-amber-600 font-medium mt-0.5">Required before visa processing</p>
                        </div>
                      </div>
                      <div>
                        <button className="text-xs font-medium text-white bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                          <Upload className="w-3 h-3" /> Upload
                        </button>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 mt-4 mb-2">
                      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Other Documents</h4>
                    </div>

                    {candidate.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Uploaded on {doc.date}</p>
                          </div>
                        </div>
                        <div>
                          {doc.verified ? (
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                              Pending Review
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Secure Document Vault</h4>
                      <p className="text-sm text-blue-800/80 leading-relaxed">
                        Your documents are securely stored and only shared with verified employers when you apply for jobs. GulfPath uses enterprise-grade encryption to protect your sensitive information.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'deployment' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-blue-600" />
                  Visa & Flight Status Tracker
                </h3>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                  Active Deployment: Al Futtaim Group
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden">
                {/* Timeline Line */}
                <div className="absolute left-12 top-12 bottom-12 w-0.5 bg-slate-200"></div>
                <div className="absolute left-12 top-12 h-1/2 w-0.5 bg-emerald-500"></div>

                <div className="space-y-12 relative z-10">
                  {/* Step 1 */}
                  <div className="flex gap-6">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Offer Accepted</h4>
                      <p className="text-sm text-slate-500 mb-2">You have accepted the offer from Al Futtaim Group.</p>
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> March 1, 2026</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-6">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">GAMCA Medical Cleared</h4>
                      <p className="text-sm text-slate-500 mb-2">Your medical report has been verified and approved.</p>
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> March 5, 2026</span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-6">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30 ring-4 ring-blue-50">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex-1">
                      <h4 className="text-lg font-bold text-blue-900">Visa Processing</h4>
                      <p className="text-sm text-blue-800/80 mb-3">Your work visa application has been submitted to the UAE consulate. Processing usually takes 7-10 working days.</p>
                      <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-xs font-medium text-blue-600">Estimated completion: March 15, 2026</span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-6 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0 border-2 border-white">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Flight Tickets</h4>
                      <p className="text-sm text-slate-500">Pending visa approval.</p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex gap-6 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0 border-2 border-white">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Deployment</h4>
                      <p className="text-sm text-slate-500">Arrival in UAE and onboarding.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'sathi' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <SathiProfileBuilder />
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
