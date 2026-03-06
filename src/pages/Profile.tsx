import React, { useState } from 'react';
import { User, Briefcase, FileText, Upload, CheckCircle, MapPin, Phone, Mail, Award, Edit2, Plus, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');

  const candidate = {
    name: 'Rajesh Kumar',
    title: 'Senior Electrician',
    location: 'Kerala, India',
    phone: '+91 98765 43210',
    email: 'rajesh.k@example.com',
    experience: '8 Years',
    passportStatus: 'ECNR',
    gulfReturn: true,
    skills: ['Residential Wiring', 'Industrial Panels', 'Troubleshooting', 'Safety Compliance', 'Blueprint Reading'],
    workHistory: [
      {
        role: 'Lead Electrician',
        company: 'Al Futtaim Engineering',
        location: 'Dubai, UAE',
        duration: '2018 - 2023',
        description: 'Managed a team of 5 electricians for commercial building projects. Ensured compliance with DEWA regulations.'
      },
      {
        role: 'Electrician',
        company: 'L&T Construction',
        location: 'Mumbai, India',
        duration: '2015 - 2018',
        description: 'Performed electrical installations for high-rise residential buildings.'
      }
    ],
    documents: [
      { name: 'Passport Copy.pdf', type: 'PDF', date: 'Oct 12, 2023', verified: true },
      { name: 'Trade Certificate.pdf', type: 'PDF', date: 'Oct 15, 2023', verified: true },
      { name: 'Medical Fitness.jpg', type: 'Image', date: 'Nov 02, 2023', verified: false },
      { name: 'Resume_Updated.pdf', type: 'PDF', date: 'Jan 10, 2024', verified: false }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Profile Section */}
        <div className="bg-blue-600 px-8 py-12 text-white relative">
          <div className="absolute top-4 right-4">
            <button className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium backdrop-blur-sm">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
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
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-100 px-8 flex gap-8">
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
            Documents
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Core Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-100">
                      {skill}
                    </span>
                  ))}
                  <button className="border border-dashed border-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Add Skill
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  About Me
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Dedicated and safety-conscious electrician with 8 years of experience in residential and commercial electrical systems. Proven track record of working in the GCC region (UAE) with a strong understanding of local regulations and standards. Seeking a challenging role in the Middle East to leverage my expertise in industrial panels and troubleshooting.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Work History
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Add Experience
                </button>
              </div>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {candidate.workHistory.map((job, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
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
            </motion.div>
          )}

          {activeTab === 'documents' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Uploaded Documents
                </h3>
                <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Upload New
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidate.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/50 transition-colors">
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
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
