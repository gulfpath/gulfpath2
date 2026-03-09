import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, AlertCircle, Loader2, Camera, X } from 'lucide-react';
import { verifyDocument, DocumentVerificationResponse } from '../services/sathiService';

interface DocumentVerificationProps {
  profileName: string;
  onVerified: (data: DocumentVerificationResponse) => void;
}

export const DocumentVerification: React.FC<DocumentVerificationProps> = ({ profileName, onVerified }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<DocumentVerificationResponse | null>(null);
  const [errorType, setErrorType] = useState<'blurry' | 'mismatch' | 'fake' | null>(null);
  const [strikeCount, setStrikeCount] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      // Reset state for new upload
      setResult(null);
      setErrorType(null);
    }
  };

  const handleVerify = async () => {
    if (!previewUrl || !file) return;
    
    setIsVerifying(true);
    setErrorType(null);
    setResult(null);
    
    try {
      const response = await verifyDocument(previewUrl, file.type, profileName);
      
      if (response.document_valid) {
        setResult(response);
        onVerified(response);
      } else {
        // Handle rejection based on strikes
        const newStrikeCount = strikeCount + 1;
        setStrikeCount(newStrikeCount);
        
        // Simple heuristic for error type based on response or random for demo
        // In a real app, the AI would return specific reasons
        const isMismatch = response.type === 'Unknown' || !response.prn_number;
        
        if (newStrikeCount >= 3) {
          setErrorType('fake');
        } else if (isMismatch) {
          setErrorType('mismatch');
        } else {
          setErrorType('blurry');
        }
      }
    } catch (error) {
      console.error("Verification failed:", error);
      const newStrikeCount = strikeCount + 1;
      setStrikeCount(newStrikeCount);
      
      if (newStrikeCount >= 3) {
        setErrorType('fake');
      } else {
        setErrorType('blurry');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setErrorType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (strikeCount >= 3) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Verification Failed</h2>
              <p className="text-sm text-slate-500">Maximum attempts reached</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
            <p className="text-red-800 font-medium mb-4">
              "Bhai, dekhiye... hum chahte hain ki aapki naukri 100% pakki ho. Yeh document system mein 'verified' nahi ho raha. GulfPath par hum sirf 'Original' documents hi lete hain. Local agents aksar nakli paper de dete hain jiski wajah se worker ko jail tak ho sakti hai. Agar aapke paas original paper hai toh wahi upload kijiye. Nahi toh, aap Suchitra Road, Kompally office aa jaiye, humari team aapko sahi raasta dikhayegi."
            </p>
            <div className="bg-white p-4 rounded-xl border border-red-100 mt-4">
              <p className="text-sm font-semibold text-slate-900 mb-1">Visit our office:</p>
              <p className="text-sm text-slate-600">Suchitra Road, Kompally, Hyderabad</p>
              <p className="text-sm text-slate-600">Bring your original documents.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Upload ITI/10th Certificate</h2>
            <p className="text-sm text-slate-500">Get your "Certified Ustad" Gold Badge</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {errorType && (
          <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                {errorType === 'blurry' && (
                  <p className="text-sm font-medium text-amber-900">
                    "Bhai, thoda sa rukiye! Yeh photo thodi dhundli (blurry) aayi hai. Ismein aapka naam aur certificate number saaf nahi dikh raha. Agar details saaf nahi hongi, toh Dubai ki company aapka visa reject kar degi."
                  </p>
                )}
                {errorType === 'mismatch' && (
                  <p className="text-sm font-medium text-amber-900">
                    "Hmm, thodi gadbad lag rahi hai. Is certificate par jo naam hai, woh aapke profile se match nahi ho raha. Ek baat dhyaan rakhiye: Gulf mein legal documents bahut zaroori hain. Kya aapne apna hi certificate upload kiya hai?"
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-amber-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">Photo Guide</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <p className="text-sm font-bold text-red-700 mb-2 flex items-center gap-1">
                    <X className="w-4 h-4" /> Galat (Wrong)
                  </p>
                  <ul className="text-xs text-red-600 space-y-1 list-disc list-inside">
                    <li>Shadow falling on the paper</li>
                    <li>Cut-off corners</li>
                    <li>Blurry text</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                  <p className="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Sahi (Right)
                  </p>
                  <ul className="text-xs text-emerald-600 space-y-1 list-disc list-inside">
                    <li>Bright, even sunlight</li>
                    <li>All 4 corners visible</li>
                    <li>Sharp and readable text</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {result ? (
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Document Verified!</h3>
            <p className="text-emerald-700 mb-4">You have earned the "Certified Ustad" Gold Badge.</p>
            
            <div className="bg-white rounded-lg p-4 text-left border border-emerald-100 inline-block text-sm">
              <p><span className="font-semibold text-slate-700">Type:</span> {result.type}</p>
              <p><span className="font-semibold text-slate-700">ECNR Status:</span> {result.ecnr_status}</p>
              {result.prn_number && <p><span className="font-semibold text-slate-700">PRN:</span> {result.prn_number}</p>}
            </div>
          </div>
        ) : (
          <>
            {!previewUrl ? (
              <div 
                className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-900 mb-1">Click to upload or take a photo</p>
                <p className="text-xs text-slate-500">JPG, PNG up to 5MB</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3] flex items-center justify-center">
                  <img src={previewUrl} alt="Document Preview" className="max-h-full max-w-full object-contain" />
                  <button 
                    onClick={resetUpload}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur text-slate-700 rounded-full hover:bg-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying with AI...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Verify Document
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
