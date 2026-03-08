import React, { useState, useMemo } from 'react';
import { Search, ShieldCheck, Bot, FileText, Plane, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

export const faqCategories = [
  {
    id: 'trust',
    title: 'Trust & Money (The "Anti-Scam" Pillar)',
    icon: <ShieldCheck className="w-6 h-6" />,
    faqs: [
      {
        id: 1,
        question: 'Is GulfPath a government-registered agency?',
        answer: 'Yes. We are fully compliant with the **eMigrate V2** system and the Ministry of External Affairs (MEA). You can verify our Registration Certificate (RC) number directly on the eMigrate portal.',
        keywords: ['government', 'registered', 'agency', 'emigrate', 'mea', 'rc', 'fake', 'real', 'sarkar', 'sarkari', 'fraud']
      },
      {
        id: 2,
        question: 'How much "Service Charge" do I have to pay to GulfPath?',
        answer: '**Zero. ₹0.** GulfPath follows a strict "Zero-Fee" policy for workers. We get paid by the employers in the Gulf, not by you. If anyone asking for money in our name, report them immediately to Sathi.',
        keywords: ['service charge', 'pay', 'money', 'fee', 'zero', 'paisa', 'kitna', 'lagega', 'kharcha', 'commission', 'agent', 'free']
      },
      {
        id: 3,
        question: 'Why do I need to visit the Kompally (Suchitra Road) office?',
        answer: 'To protect you. Physical verification ensures your documents are real and your skills are genuine. This "Gold Check" makes Gulf companies trust you 10x more than an unverified applicant.',
        keywords: ['kompally', 'suchitra', 'office', 'visit', 'why', 'hyderabad', 'verification', 'gold check']
      },
      {
        id: 4,
        question: 'What if a local agent tells me they can get me the same job faster for money?',
        answer: 'Beware! Most "Fast-track" offers are scams. Without an official **eMigrate** clearance and a verified contract, you have no legal protection in the Gulf.',
        keywords: ['local agent', 'faster', 'money', 'scam', 'fast-track', 'dalal', 'jaldi', 'fraud']
      },
      {
        id: 5,
        question: 'Is my salary guaranteed?',
        answer: 'We only work with companies that use the **WPS (Wage Protection System)** in the GCC. This means the government of that country monitors your salary to ensure it\'s paid on time into your bank account.',
        keywords: ['salary', 'guaranteed', 'wps', 'wage', 'tankha', 'pagar', 'time', 'bank']
      }
    ]
  },
  {
    id: 'sathi',
    title: 'Sathi & The 10x10 Trade Test',
    icon: <Bot className="w-6 h-6" />,
    faqs: [
      {
        id: 6,
        question: 'I don’t know how to use apps. Can I still apply?',
        answer: 'Yes! Just send a "Hi" to Sathi on WhatsApp. She will talk to you in your language (Telugu, Hindi, Tamil, etc.) and fill out your form for you.',
        keywords: ['app', 'apply', 'whatsapp', 'sathi', 'language', 'telugu', 'hindi', 'tamil', 'padhai', 'padha likha', 'smartphone']
      },
      {
        id: 7,
        question: 'What is the "10x10 Trade Test"?',
        answer: 'It’s our AI-based skill test. Mr. Gulfpath will ask you 10 technical questions or ask you to record a 10-second video of your work. It proves you are an "Ustad" in your trade.',
        keywords: ['10x10', 'trade test', 'skill test', 'ai', 'video', 'ustad', 'interview', 'pass', 'fail']
      },
      {
        id: 8,
        question: 'What if I fail the AI Trade Test?',
        answer: 'Don\'t worry. Sathi will tell you exactly which parts you got wrong and give you training videos to study. You can retake the test after 7 days.',
        keywords: ['fail', 'ai trade test', 'retake', 'training', 'video', 'study', 'pass', 'fail ho gaya']
      },
      {
        id: 9,
        question: 'How do I get the "Gold Ustad" badge on my profile?',
        answer: 'Complete your profile, pass the 10x10 test with a score of 8+, and visit our Kompally office for document verification.',
        keywords: ['gold ustad', 'badge', 'profile', 'score', 'kompally', 'verify']
      },
      {
        id: 10,
        question: 'Can Sathi help me if I have a problem with my passport?',
        answer: 'Yes. Sathi can guide you on how to apply for a fresh passport or how to update your address through the official Passport Seva Kendra.',
        keywords: ['sathi', 'help', 'passport', 'problem', 'fresh', 'update', 'address', 'seva kendra', 'naya passport']
      }
    ]
  },
  {
    id: 'documents',
    title: 'Documents & Medical (The Essentials)',
    icon: <FileText className="w-6 h-6" />,
    faqs: [
      {
        id: 11,
        question: 'What is the difference between ECR and ECNR passports?',
        answer: '**ECR** (Emigration Check Required) usually means you haven\'t passed 10th grade. You need government clearance to fly. **ECNR** (No Check Required) means you can fly directly. GulfPath handles the clearance for both.',
        keywords: ['ecr', 'ecnr', 'passport', '10th', 'grade', 'clearance', 'fly', 'padhai', 'matric']
      },
      {
        id: 12,
        question: 'What is the Wafid (GAMCA) medical test?',
        answer: 'It is a mandatory health check (Blood, X-Ray, etc.) required by all GCC countries. Sathi will book your appointment at an authorized center near you.',
        keywords: ['wafid', 'gamca', 'medical', 'test', 'health', 'blood', 'x-ray', 'appointment', 'hospital', 'checkup']
      },
      {
        id: 13,
        question: 'How much does the medical test cost?',
        answer: 'The appointment fee is usually around **₹1,500**, and the test at the clinic costs between **₹5,000 - ₹8,000** depending on the country. You pay this directly to the medical center, not to us.',
        keywords: ['medical', 'cost', 'fee', 'gamca', 'wafid', 'paisa', 'kitna', 'clinic', 'hospital']
      },
      {
        id: 14,
        question: 'What is a PCC (Police Clearance Certificate)?',
        answer: 'It is a document from the Indian Police proving you have no criminal record. It is now mandatory for many Gulf visas (especially for Saudi Arabia).',
        keywords: ['pcc', 'police', 'clearance', 'certificate', 'criminal', 'record', 'saudi', 'visa', 'police verification']
      },
      {
        id: 15,
        question: 'Can I apply if my passport is expiring in 4 months?',
        answer: 'No. Your passport must have at least **6 to 8 months of validity** remaining to apply for a Gulf visa.',
        keywords: ['passport', 'expire', 'validity', '4 months', '6 months', '8 months', 'renew']
      }
    ]
  },
  {
    id: 'departure',
    title: 'The Job & Departure',
    icon: <Plane className="w-6 h-6" />,
    faqs: [
      {
        id: 16,
        question: 'Who pays for my flight ticket?',
        answer: 'For all "Gold-Verified" roles, the **Employer** provides the flight ticket. You should never have to pay for your travel to the Gulf.',
        keywords: ['flight', 'ticket', 'pay', 'employer', 'travel', 'gulf', 'hawai jahaz', 'plane', 'free']
      },
      {
        id: 17,
        question: 'What will my living conditions be like?',
        answer: 'We only take jobs that provide **Free Bachelor Accommodation**. Sathi will show you real photos or videos of the labor camps before you sign the contract.',
        keywords: ['living', 'condition', 'accommodation', 'room', 'camp', 'labor camp', 'rehna', 'makan']
      },
      {
        id: 18,
        question: 'Will I get free food or a food allowance?',
        answer: 'This depends on the company. Some provide 3 meals a day; others give a monthly "Food Allowance" (usually 200-300 AED/SAR) on top of your basic salary.',
        keywords: ['food', 'allowance', 'free', 'meal', 'khana', 'ration', 'mess']
      },
      {
        id: 19,
        question: 'What are the standard working hours?',
        answer: 'Usually 8 hours per day, 6 days a week. Any work beyond that is counted as **Overtime (OT)** and must be paid extra by law.',
        keywords: ['working', 'hours', 'overtime', 'ot', 'duty', 'time', 'kitna ghanta']
      },
      {
        id: 20,
        question: 'Can I see my contract before I leave India?',
        answer: 'Yes! You will get a digital copy on the app. In Saudi Arabia, you will also verify it on the **Qiwa portal**. Never fly without a signed contract.',
        keywords: ['contract', 'leave', 'india', 'digital', 'qiwa', 'sign', 'agreement', 'paper']
      }
    ]
  },
  {
    id: 'safety',
    title: 'Safety & Rights in the Gulf',
    icon: <AlertTriangle className="w-6 h-6" />,
    faqs: [
      {
        id: 21,
        question: 'What happens if the company doesn\'t pay my salary?',
        answer: 'Use the **"SOS" button** in the GulfPath app. Sathi will immediately connect you to the Indian Embassy\'s **MADAD** portal and our local representative in that country.',
        keywords: ['company', 'pay', 'salary', 'sos', 'embassy', 'madad', 'tankha nahi diya', 'paisa nahi mila']
      },
      {
        id: 22,
        question: 'Can the boss take my passport?',
        answer: '**No.** It is illegal for an employer to keep your passport in the UAE, Saudi, and Qatar. Your passport is your property.',
        keywords: ['boss', 'take', 'passport', 'illegal', 'employer', 'keep', 'kafeel', 'mudeer']
      },
      {
        id: 23,
        question: 'What is an "Iqama" or "Residence Permit"?',
        answer: 'It is your legal ID card in the Gulf. Your employer must provide this within 90 days of your arrival. Always carry a copy of it.',
        keywords: ['iqama', 'residence', 'permit', 'id', 'card', 'arrival', 'pataka', 'bataqa']
      },
      {
        id: 24,
        question: 'Can I change jobs if I don\'t like the company?',
        answer: 'Under new laws (like KSA’s Kafala reforms), you can change jobs after your initial contract ends without needing a "No Objection Certificate" (NOC), provided you follow the legal notice period.',
        keywords: ['change', 'job', 'company', 'kafala', 'noc', 'notice', 'dusra kaam', 'transfer']
      },
      {
        id: 25,
        question: 'How do I send money home safely?',
        answer: 'Sathi will show you the nearest exchange houses or help you set up a mobile banking app in the Gulf so you can send money to your family in India instantly.',
        keywords: ['send', 'money', 'home', 'safely', 'exchange', 'bank', 'india', 'paisa bhejna', 'remittance']
      }
    ]
  }
];

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories;

    const query = searchQuery.toLowerCase();
    
    return faqCategories.map(category => {
      const filteredFaqs = category.faqs.filter(faq => {
        const matchesQuestion = faq.question.toLowerCase().includes(query);
        const matchesAnswer = faq.answer.toLowerCase().includes(query);
        const matchesKeywords = faq.keywords.some(keyword => keyword.toLowerCase().includes(query));
        return matchesQuestion || matchesAnswer || matchesKeywords;
      });

      return {
        ...category,
        faqs: filteredFaqs
      };
    }).filter(category => category.faqs.length > 0);
  }, [searchQuery]);

  // Function to render text with bold tags
  const renderAnswer = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full border border-blue-100 text-sm font-semibold tracking-wide uppercase mb-4">
            <ShieldCheck className="w-4 h-4" />
            The Trust Manual
          </div>
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
            Everything you need to know about working in the Gulf safely and securely.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-5 bg-white border border-slate-200 rounded-2xl text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Ask Sathi... (e.g., 'paisa kitna lagega?')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="bg-slate-100 p-2 rounded-xl">
              <Bot className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
              <p className="text-slate-500 text-lg">No answers found for "{searchQuery}".</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 font-semibold hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">
                    {category.title}
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {category.faqs.map((faq) => (
                    <div key={faq.id} className="group">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors pr-8">
                          {faq.id}. {faq.question}
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}
