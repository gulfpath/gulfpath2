import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  Building,
  CheckCircle,
  FileText,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function EmployerVerification() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 font-bold mb-6">
            <ShieldCheck className="h-5 w-5" />
            Employer Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Hire Verified Blue-Collar Talent
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join GulfPath to connect directly with skilled workers in India. We
            ensure compliance, transparency, and zero recruitment fees for
            candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Building className="h-8 w-8 text-blue-600" />
              Why Hire with GulfPath?
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Pre-Screened Candidates
                  </h3>
                  <p className="text-gray-600">
                    Access profiles with verified passports, trade certificates,
                    and video trade tests.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Direct Sourcing
                  </h3>
                  <p className="text-gray-600">
                    Eliminate middle-men and sub-agents. Communicate directly
                    with candidates.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    eMigrate Compliance
                  </h3>
                  <p className="text-gray-600">
                    We assist with Indian government emigration clearance for
                    ECR passport holders.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="h-48 w-48" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6">
                Verification Requirements
              </h2>
              <p className="text-blue-200 mb-8">
                To maintain trust, we require all employers to undergo a strict
                verification process before posting jobs.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 bg-blue-800/50 p-4 rounded-xl border border-blue-700/50">
                  <FileText className="h-6 w-6 text-blue-300 shrink-0" />
                  <span className="font-medium">Valid GCC Trade License</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-800/50 p-4 rounded-xl border border-blue-700/50">
                  <Globe className="h-6 w-6 text-blue-300 shrink-0" />
                  <span className="font-medium">
                    Official Company Domain Email
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-blue-800/50 p-4 rounded-xl border border-blue-700/50">
                  <ShieldCheck className="h-6 w-6 text-blue-300 shrink-0" />
                  <span className="font-medium">
                    Commitment to Zero-Fee Policy
                  </span>
                </div>
              </div>

              <button className="w-full bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg">
                Start Verification Process
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Are you an Indian Recruiting Agent (RA)?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            If you hold a valid MEA license and adhere to the "Employer Pays"
            model, you can partner with GulfPath to source candidates ethically.
          </p>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-bold transition-colors">
            Partner with Us
          </button>
        </div>
      </div>
    </div>
  );
}
