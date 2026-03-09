import React from "react";

export default function CookieSettings() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Settings</h1>
        <div className="prose prose-blue max-w-none text-gray-600">
          <p>
            Manage your cookie preferences below. You can choose to accept or decline certain types of cookies.
          </p>
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                <p className="text-sm text-gray-500">Required for the website to function properly.</p>
              </div>
              <input type="checkbox" checked disabled className="h-5 w-5 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                <p className="text-sm text-gray-500">Help us understand how visitors interact with our website.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
                <p className="text-sm text-gray-500">Used to deliver relevant advertisements.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600 rounded" />
            </div>
          </div>
          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
