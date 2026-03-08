import React from 'react';
import { ShieldCheck, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 px-8 py-10 text-white">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-200" />
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-emerald-100 text-lg">
              Last Updated: March 8, 2026
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-700/50 px-3 py-1.5 rounded-full text-sm font-medium">
              <Lock className="w-4 h-4" />
              Compliant with India DPDP Act
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-10 text-gray-700">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-emerald-600" />
                1. Introduction
              </h2>
              <p className="mb-4">
                GulfPath ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                This policy is designed to comply with the Digital Personal Data Protection (DPDP) Act of India and other applicable data protection regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-emerald-600" />
                2. Information We Collect
              </h2>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Identification Information:</strong> Name, date of birth, gender, nationality.</li>
                <li><strong>Contact Information:</strong> Phone number, email address, physical address.</li>
                <li><strong>Professional Information:</strong> Skills, trade, work experience, education.</li>
                <li><strong>Documentary Evidence:</strong> Passport details, Aadhaar card, medical reports (GAMCA), Police Clearance Certificates (PCC), and visa copies (stored securely in the Document Vault).</li>
                <li><strong>Audio Data:</strong> Voice recordings if you use our Sathi Voice Assistant (processed for transcription and intent recognition).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To match job seekers with suitable employment opportunities in the GCC.</li>
                <li>To verify your identity and professional credentials.</li>
                <li>To facilitate the visa and immigration process.</li>
                <li>To communicate with you regarding job applications, interview schedules, and deployment status.</li>
                <li>To improve our platform, services, and AI assistant capabilities.</li>
                <li>To comply with legal and regulatory obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Verified Employers:</strong> Your profile and relevant documents will be shared with prospective employers in the GCC for recruitment purposes.</li>
                <li><strong>Service Providers:</strong> Third-party vendors who assist us with hosting, data analysis, customer service, and AI processing (e.g., Google Cloud for Gemini API).</li>
                <li><strong>Legal Authorities:</strong> When required by law, subpoena, or other legal processes, or to protect our rights or the safety of our users.</li>
              </ul>
              <p className="mt-4 font-medium text-gray-900">
                We do not sell your personal data to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p>
                We implement robust technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Documents uploaded to the Vault are encrypted at rest and in transit. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="mb-4">Under the DPDP Act, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>Request erasure of your data (subject to legal retention requirements).</li>
                <li>Withdraw your consent for data processing at any time.</li>
                <li>Nominate an individual to exercise your rights in the event of death or incapacity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact the Data Protection Officer</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Data Protection Officer at:
                <br />
                <a href="mailto:privacy@gulfpath.in" className="text-emerald-600 hover:underline font-medium">privacy@gulfpath.in</a>
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
