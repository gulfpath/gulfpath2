import React from "react";
import { AlertTriangle, ShieldCheck, CheckCircle } from "lucide-react";

export default function StaySafe() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ShieldCheck className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Stay Safe Online</h1>
          <p className="text-xl text-gray-600">
            Essential tips to protect yourself from fraud and scams during your job search.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
            <div className="bg-red-100 p-4 rounded-full shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Never Pay for a Job</h2>
              <p className="text-gray-600">
                Legitimate employers will never ask you to pay for a job offer, visa processing, or training upfront. GulfPath is a zero-fee platform for workers.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
            <div className="bg-green-100 p-4 rounded-full shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Employer Details</h2>
              <p className="text-gray-600">
                Always research the company before accepting an offer. Check their official website, contact details, and reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
