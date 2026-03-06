/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import MockInterview from "./pages/MockInterview";
import VoiceAssistant from "./components/VoiceAssistant";
import "./i18n";

export default function App() {
  return (
    <Router>
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
            <Route path="/fraud-report" element={<ReportFraud />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mock-interview" element={<MockInterview />} />
          </Routes>
        </main>
        <Footer />
        <VoiceAssistant />
      </div>
    </Router>
  );
}
