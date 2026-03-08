import React from 'react';
import { FileText, Shield, AlertTriangle, Scale } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-8 py-10 text-white">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-blue-200" />
              <h1 className="text-3xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-blue-100 text-lg">
              Last Updated: March 8, 2026
            </p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-10 text-gray-700">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                1. Introduction
              </h2>
              <p className="mb-4">
                Welcome to GulfPath. These Terms of Service ("Terms") govern your access to and use of the GulfPath website, services, and applications (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
              </p>
              <p>
                GulfPath acts as a facilitator connecting job seekers (primarily blue-collar workers from India) with verified employers in the Gulf Cooperation Council (GCC) countries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
                2. Zero Recruitment Fee Policy
              </h2>
              <p className="mb-4 font-medium text-gray-900">
                GulfPath strictly adheres to a Zero Recruitment Fee policy for job seekers.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We do not charge candidates any fees for registration, job matching, or placement.</li>
                <li>Employers bear the cost of recruitment services.</li>
                <li>Candidates are only responsible for actual third-party costs (e.g., GAMCA medical tests, passport issuance, PCC) which are paid directly to the respective authorities, not to GulfPath.</li>
                <li>If any individual claiming to represent GulfPath asks for money, please report it immediately via our Fraud Report section.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-blue-600" />
                3. User Responsibilities
              </h2>
              <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">For Job Seekers:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>You must provide accurate, truthful, and up-to-date information regarding your identity, skills, and experience.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You must attend scheduled interviews and medical examinations promptly.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">For Employers:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate job descriptions, salary details, and working conditions.</li>
                <li>You agree to comply with all applicable labor laws in your respective GCC country.</li>
                <li>You agree to bear the recruitment service charges as per the separate Employer Agreement.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Verification and Background Checks</h2>
              <p>
                GulfPath reserves the right to verify the information provided by both job seekers and employers. This may include document verification, skill assessments, and background checks. However, GulfPath does not guarantee the absolute accuracy of user-provided information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p>
                GulfPath acts solely as an intermediary platform. We are not a party to the employment contract between the worker and the employer. GulfPath shall not be liable for any disputes, damages, or losses arising from the employment relationship, workplace conditions, or non-payment of wages by the employer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Service, us, or third parties, or for any other reason.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will notify users of significant changes. Your continued use of the Service after such modifications constitutes your acknowledgment and agreement to the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
                <br />
                <a href="mailto:legal@gulfpath.in" className="text-blue-600 hover:underline font-medium">legal@gulfpath.in</a>
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
