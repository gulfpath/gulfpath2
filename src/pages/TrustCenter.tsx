import React from "react";
import { ShieldCheck, Lock, CheckCircle } from "lucide-react";

export default function TrustCenter() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ShieldCheck className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trust Center</h1>
          <p className="text-xl text-gray-600">
            Your safety and security are our top priorities. Learn how we protect you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <Lock className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Privacy</h2>
            <p className="text-gray-600">
              We employ industry-standard encryption and security measures to ensure your personal information remains confidential and secure.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <CheckCircle className="h-10 w-10 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verified Employers</h2>
            <p className="text-gray-600">
              Every employer on our platform undergoes a rigorous verification process to ensure they meet our strict standards for fair employment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
