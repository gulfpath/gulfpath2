import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Video,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { SathiProfileBuilder } from "../components/SathiProfileBuilder";

export default function Apply() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [extractedData, setExtractedData] = useState<any>(null);

  useEffect(() => {
    if (step === 4 && id) {
      const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '{}');
      if (!appliedJobs[id]) {
        appliedJobs[id] = 'Applied';
        localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
      }
    }
  }, [step, id]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else navigate("/vault"); // Redirect to vault after success
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Apply for Job</h1>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            Step {step} of 4
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-12">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Step 1: Build Your Profile
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Use our AI assistant Sathi to quickly build your profile by speaking in your preferred language.
                </p>
              </div>
              
              <SathiProfileBuilder 
                onProfileSaved={(profile) => {
                  setExtractedData(profile);
                  handleNext();
                }} 
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="h-10 w-10 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Upload a Trade Test Video
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Employers want to see your skills. Upload a short 1-minute
                  video showing you doing electrical work safely.
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-900 font-medium mb-2">
                  Tap to select a video from your phone
                </p>
                <p className="text-gray-500 text-sm">MP4, WebM up to 50MB</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Verify your Passport
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We need to check your ECR/ECNR status to ensure smooth visa
                  processing.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <UploadCloud className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Upload Passport Photo
                      </h3>
                      <p className="text-sm text-gray-500">
                        Front and back pages
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <ShieldCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Fetch from DigiLocker
                      </h3>
                      <p className="text-sm text-gray-500">Fast and secure</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Application Submitted!
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Your profile has been sent to Al Futtaim Group. We will notify
                you via WhatsApp when they review your application.
              </p>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-left max-w-md mx-auto">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Safety Reminder
                </h3>
                <p className="text-sm text-blue-800">
                  This employer covers all visa and flight costs. Do not pay
                  anyone who claims they can speed up your application.
                </p>
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-100">
            {step > 1 && step < 4 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-gray-500 font-medium hover:text-gray-900 px-6 py-3"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors flex items-center gap-2 ml-auto shadow-lg shadow-blue-600/20"
            >
              {step === 4 ? "Go to My Vault" : "Continue"}
              {step !== 4 && <ArrowRight className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
