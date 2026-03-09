import { Link } from "react-router-dom";
import { ShieldCheck, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl text-white tracking-tight">
                GulfPath
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              A trusted platform for blue-collar workers to find verified,
              visa-free jobs in the GCC. Zero recruitment fees.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>MEA Registered RA</span>
            </div>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Find Jobs</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs?location=Abu Dhabi" className="hover:text-blue-400 transition-colors">Jobs in Abu Dhabi</Link></li>
              <li><Link to="/jobs?location=Dubai" className="hover:text-blue-400 transition-colors">Jobs in Dubai</Link></li>
              <li><Link to="/jobs?location=Algeria" className="hover:text-blue-400 transition-colors">Jobs in Algeria</Link></li>
              <li><Link to="/jobs?location=Bahrain" className="hover:text-blue-400 transition-colors">Jobs in Bahrain</Link></li>
              <li><Link to="/jobs?location=Egypt" className="hover:text-blue-400 transition-colors">Jobs in Egypt</Link></li>
              <li><Link to="/jobs?location=India" className="hover:text-blue-400 transition-colors">Jobs in India</Link></li>
              <li><Link to="/jobs?location=Iraq" className="hover:text-blue-400 transition-colors">Jobs in Iraq</Link></li>
              <li><Link to="/jobs?location=Jordan" className="hover:text-blue-400 transition-colors">Jobs in Jordan</Link></li>
              <li><Link to="/jobs?location=Kuwait" className="hover:text-blue-400 transition-colors">Jobs in Kuwait</Link></li>
              <li><Link to="/jobs?location=Lebanon" className="hover:text-blue-400 transition-colors">Jobs in Lebanon</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 opacity-0 hidden md:block">More Jobs</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs?location=Libya" className="hover:text-blue-400 transition-colors">Jobs in Libya</Link></li>
              <li><Link to="/jobs?location=Morocco" className="hover:text-blue-400 transition-colors">Jobs in Morocco</Link></li>
              <li><Link to="/jobs?location=Oman" className="hover:text-blue-400 transition-colors">Jobs in Oman</Link></li>
              <li><Link to="/jobs?location=Pakistan" className="hover:text-blue-400 transition-colors">Jobs in Pakistan</Link></li>
              <li><Link to="/jobs?location=Qatar" className="hover:text-blue-400 transition-colors">Jobs in Qatar</Link></li>
              <li><Link to="/jobs?location=Saudi Arabia" className="hover:text-blue-400 transition-colors">Jobs in Saudi Arabia</Link></li>
              <li><Link to="/jobs?location=Tunisia" className="hover:text-blue-400 transition-colors">Jobs in Tunisia</Link></li>
              <li><Link to="/jobs?location=UAE" className="hover:text-blue-400 transition-colors">Jobs in UAE</Link></li>
              <li><Link to="/jobs?location=Yemen" className="hover:text-blue-400 transition-colors">Jobs in Yemen</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/vault" className="hover:text-blue-400 transition-colors">Document Vault</Link></li>
              <li><Link to="/fraud-report" className="hover:text-blue-400 transition-colors">Report Fraud</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition-colors">Trust Manual (FAQ)</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
              <li><Link to="/employers" className="hover:text-blue-400 transition-colors">Post a Job</Link></li>
              <li><Link to="/employers/verify" className="hover:text-blue-400 transition-colors">Employer Verification</Link></li>
              <li><Link to="/employers/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 shrink-0" />
                  <span>+91 1800 123 4567 (Toll Free)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 shrink-0" />
                  <span>info@gulfpath.in</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 shrink-0" />
                  <span>NEAR, H.NO. 04-009/NR, (OLD NO - 3-24), SURVEY NO. 43, Suchitra Rd, Kompally, Hyderabad, Telangana 500067</span>
                </li>
              </ul>
            </div>
            
            {/* Google Maps Embed for Physical Presence */}
            <div className="rounded-xl overflow-hidden border border-gray-800 h-32 relative group">
              <iframe 
                src="https://maps.google.com/maps?q=Suchitra%20Rd,%20Kompally,%20Hyderabad,%20Telangana%20500067&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
              <a 
                href="https://maps.google.com/maps?q=Suchitra%20Rd,%20Kompally,%20Hyderabad,%20Telangana%20500067" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <MapPin className="w-3 h-3" />
                  View on Maps
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} GulfPath. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link to="/cookie-settings" className="hover:text-white transition-colors">Cookie Settings</Link>
            <Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/trust-center" className="hover:text-white transition-colors">Trust Center</Link>
            <Link to="/stay-safe" className="hover:text-white transition-colors">Stay Safe</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
