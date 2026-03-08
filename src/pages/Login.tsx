import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, CheckCircle2, Building2, User, Loader2 } from "lucide-react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

// --- Validation Logic (The Gatekeeper) ---
const publicEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "mail.com",
];

const employerEmailSchema = z
  .string()
  .email("Invalid email format")
  .refine(
    (email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return !publicEmailDomains.includes(domain);
    },
    {
      message: "Bhai, employer account ke liye sirf Business Email allow hai. (Only Business Emails allowed for Employers).",
    }
  );

type Role = "worker" | "employer";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("worker");
  const [step, setStep] = useState<"input" | "otp">("input");
  
  // Form State
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  // Timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic Phone Validation
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Employer Email Validation
    if (role === "employer") {
      try {
        employerEmailSchema.parse(email);
      } catch (err: any) {
        if (err instanceof z.ZodError) {
          setError((err as any).errors[0].message);
        } else {
          setError("Invalid email.");
        }
        return;
      }
    }

    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setTimer(30);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    // Simulate API Call & Verification
    setTimeout(() => {
      setIsLoading(false);
      
      // Security Persistence: Generate Mock Token
      const mockToken = btoa(JSON.stringify({ role, phone, email, timestamp: Date.now() }));
      localStorage.setItem("authToken", mockToken);
      localStorage.setItem("userRole", role);

      // "Kompally" Touch: Flag Premium Employer
      if (role === "employer") {
        localStorage.setItem("isPremiumEmployer", "true");
      }

      // Role-Based Redirection
      if (role === "worker") {
        navigate("/mock-interview");
      } else {
        navigate("/employer-dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-200">
      
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center"
        >
          <div className="h-16 w-16 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <ShieldCheck className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>
        <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">
          GulfPath Secure Login
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Verify your identity to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#111827] py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-slate-800 relative overflow-hidden">
          
          {/* Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

          <AnimatePresence mode="wait">
            {step === "input" ? (
              <motion.div
                key="input-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Role Toggle */}
                <div className="flex p-1 bg-slate-800/50 rounded-xl mb-8 border border-slate-700/50">
                  <button
                    onClick={() => { setRole("worker"); setError(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      role === "worker"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    I am a Worker
                  </button>
                  <button
                    onClick={() => { setRole("employer"); setError(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      role === "employer"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    I am an Employer
                  </button>
                </div>

                <form className="space-y-6" onSubmit={handleSendOTP}>
                  
                  {/* Phone Input (Both Roles) */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Mobile Number
                    </label>
                    <div className="relative flex rounded-xl shadow-sm">
                      <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-700 bg-slate-800/50 text-slate-400 sm:text-sm font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        maxLength={10}
                        className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-xl bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all placeholder:text-slate-600"
                        placeholder="Enter 10-digit number"
                        required
                      />
                    </div>
                  </div>

                  {/* Employer Email Input */}
                  <AnimatePresence>
                    {role === "employer" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                          Official Business Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all placeholder:text-slate-600"
                          placeholder="hr@yourcompany.com"
                          required={role === "employer"}
                        />
                        <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Public domains (Gmail, Yahoo) are not allowed.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isLoading || phone.length < 10 || (role === "employer" && !email)}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111827] focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Get OTP <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Verify OTP</h3>
                <p className="text-sm text-slate-400 text-center mb-8">
                  We've sent a 6-digit code to <br/>
                  <span className="font-medium text-slate-200">+91 {phone}</span>
                </p>

                <form onSubmit={handleVerifyOTP} className="w-full space-y-8">
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ))}
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isLoading || otp.join("").length < 6}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111827] focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Verify & Secure Login"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-400">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      disabled={timer > 0}
                      onClick={() => {
                        setTimer(30);
                        // Simulate resend
                      }}
                      className="font-medium text-blue-400 hover:text-blue-300 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
                    >
                      {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                    </button>
                  </p>
                  <button
                    onClick={() => setStep("input")}
                    className="mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Change phone number
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Sathi Integration Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
          <span className="text-xs font-medium tracking-wide">
            Sathi says: "Aapka data 100% surakshit hai."
          </span>
        </div>
      </div>
    </div>
  );
}
