import React from "react";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Use</h1>
        <div className="prose prose-blue max-w-none text-gray-600">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-4">
            Welcome to GulfPath. By accessing or using our website, you agree to be bound by these Terms of Use and all applicable laws and regulations.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on GulfPath's website for personal, non-commercial transitory viewing only.
          </p>
        </div>
      </div>
    </div>
  );
}
