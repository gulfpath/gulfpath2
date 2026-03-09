import React from "react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
        <div className="prose prose-blue max-w-none text-gray-600">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-4">
            This Cookie Policy explains how GulfPath uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
        </div>
      </div>
    </div>
  );
}
