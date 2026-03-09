import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  FileText,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";

export default function Vault() {
  const { t } = useTranslation();

  const documents = [
    {
      id: "1",
      type: "Passport",
      status: "verified",
      details: "ECNR Status Confirmed",
      expiry: "2028-05-12",
    },
    {
      id: "2",
      type: "Aadhaar Card",
      status: "verified",
      details: "Linked to phone number",
      expiry: null,
    },
    {
      id: "3",
      type: "Trade Certificate (ITI)",
      status: "rejected",
      details: "Image too blurry. Cannot read certificate number.",
      expiry: null,
      rejectionCount: 2,
    },
    {
      id: "4",
      type: "Medical Fitness",
      status: "missing",
      details: "Required for GCC visa processing",
      expiry: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Lock className="h-8 w-8 text-blue-600" />
              {t("Document Vault")}
            </h1>
            <p className="text-gray-600">
              Securely store your IDs and certificates for one-tap applications.
            </p>
          </div>
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-blue-200">
            <ShieldCheck className="h-5 w-5" />
            DPDP Act Compliant
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {documents.map((doc) => (
              <div key={doc.id} className="space-y-3">
                <div
                  className={`bg-white rounded-2xl p-6 shadow-sm border ${doc.status === 'rejected' ? 'border-red-200' : 'border-gray-100'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl shrink-0 ${
                        doc.status === "verified"
                          ? "bg-green-100 text-green-600"
                          : doc.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : doc.status === "rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {doc.type}
                      </h3>
                      <p className={`text-sm ${doc.status === 'rejected' ? 'text-red-600 font-medium' : 'text-gray-500'}`}>{doc.details}</p>
                      {doc.expiry && (
                        <p className="text-xs text-gray-400 mt-1">
                          Expires: {doc.expiry}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {doc.status === "verified" && (
                      <span className="flex items-center gap-1 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full border border-green-200">
                        <CheckCircle className="h-4 w-4" /> Verified
                      </span>
                    )}
                    {doc.status === "pending" && (
                      <span className="flex items-center gap-1 text-yellow-600 font-bold text-sm bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                        <AlertCircle className="h-4 w-4" /> Pending
                      </span>
                    )}
                    {doc.status === "rejected" && (
                      <button className="flex-1 sm:flex-none bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-4 py-2 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                        <UploadCloud className="h-4 w-4" /> Re-upload
                      </button>
                    )}
                    {doc.status === "missing" && (
                      <button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                        <UploadCloud className="h-4 w-4" /> Upload
                      </button>
                    )}
                  </div>
                </div>

                {/* Physical Fallback Webhook for Rejected Documents */}
                {doc.status === 'rejected' && doc.rejectionCount && doc.rejectionCount >= 2 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-4 animate-fade-in-up">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
                      <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Sathi&backgroundColor=2563eb" alt="Sathi AI" className="w-8 h-8 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900 flex items-center gap-2">
                        Sathi Assistant <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Support</span>
                      </h4>
                      <p className="text-blue-800 text-sm mt-1 font-medium">
                        "Bhai, paper scan nahi ho raha. Aap kal Kompally office aa jaiye, hum wahan machine se scan kar denge."
                      </p>
                      <div className="mt-3 flex gap-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                          Book Office Visit
                        </button>
                        <button className="bg-white text-blue-700 border border-blue-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Profile Strength
              </h2>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mb-6 flex justify-between">
                <span>75% Complete</span>
                <span className="text-green-600 font-bold">Good</span>
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Passport Verified (ECNR)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Identity Verified</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Trade Certificate Pending
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
              <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Data Privacy
              </h2>
              <p className="text-sm text-blue-800 mb-4">
                Your documents are encrypted and stored securely. They are only
                shared with verified employers when you apply for a job.
              </p>
              <button className="text-blue-700 font-bold text-sm hover:underline">
                Manage Permissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
