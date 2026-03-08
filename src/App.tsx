/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import Vault from "./pages/Vault";
import EmployerVerification from "./pages/EmployerVerification";
import ReportFraud from "./pages/ReportFraud";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PDBHub from "./pages/PDBHub";
import MockInterview from "./pages/MockInterview";
import Contact from "./pages/Contact";
import EmployerDashboard from "./pages/EmployerDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import VoiceAssistant from "./components/VoiceAssistant";
import ProtectedRoute from "./components/ProtectedRoute";
import "./i18n";

function AppContent() {
  const location = useLocation();
  const isEmployerDashboard = location.pathname === '/employer-dashboard';

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/apply/:id" element={<Apply />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/employers" element={<EmployerVerification />} />
          <Route 
            path="/employer-dashboard" 
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/fraud-report" element={<ReportFraud />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRole="worker">
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pdb-hub" 
            element={
              <ProtectedRoute allowedRole="worker">
                <PDBHub />
              </ProtectedRoute>
            } 
          />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {!isEmployerDashboard && <Footer />}
      <VoiceAssistant />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
