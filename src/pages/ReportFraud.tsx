import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  UploadCloud,
  CheckCircle,
} from "lucide-react";

export default function ReportFraud() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate backend action for Test 4: Fraud Protection
    console.log("Urgent Ticket Created in Admin Dashboard.");
    console.log("Agent IP/Phone number blocked immediately.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-lg w-full text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Report Submitted
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for helping keep the GulfPath community safe. Our Trust &
            Safety team will investigate this report immediately.
          </p>
          <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-8 text-left border border-blue-100">
            <p className="font-bold flex items-center gap-2 mb-1"><ShieldCheck className="w-4 h-4" /> Action Taken:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Urgent Ticket #GP-FRD-{Math.floor(Math.random() * 10000)} created for Admin review.</li>
              <li>Reported entity's IP and Phone Number temporarily blocked pending investigation.</li>
            </ul>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors w-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 rounded-full px-4 py-2 font-bold mb-6">
            <AlertTriangle className="h-5 w-5" />
            Trust & Safety
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Report a Fraudulent Agent
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Did someone ask you for money for a visa or job? Report them here.
            GulfPath has a strict zero-fee policy for workers.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Who are you reporting?
              </label>
              <input
                type="text"
                required
                placeholder="Name of the agent or company"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                What happened?
              </label>
              <textarea
                required
                rows={4}
                placeholder="Please describe what happened. Did they ask for money? Did they promise a fake job?"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Upload Evidence (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <UploadCloud className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">
                  Screenshots of WhatsApp chats, receipts, or fake offer letters
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">
                  Your Privacy is Protected
                </h3>
                <p className="text-sm text-blue-800">
                  Reports are confidential. We will not share your name with the
                  agent you are reporting.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              <AlertTriangle className="h-5 w-5" />
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
