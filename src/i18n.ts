import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      GulfPath: "GulfPath",
      "Find Verified Visa-Free Jobs in GCC":
        "Find Verified Visa-Free Jobs in GCC",
      "No Recruitment Fees. 100% Employer Sponsored.":
        "No Recruitment Fees. 100% Employer Sponsored.",
      "Search Jobs": "Search Jobs",
      "Document Vault": "Document Vault",
      Employers: "Employers",
      Login: "Login",
      Register: "Register",
      "Trending Jobs": "Trending Jobs",
      "Verified Free": "Verified Free",
      "Apply Now": "Apply Now",
      "Listen to Job Details": "Listen to Job Details",
      "Free Food": "Free Food",
      Accommodation: "Accommodation",
      Transportation: "Transportation",
      Medical: "Medical",
      Salary: "Salary",
      Location: "Location",
      Experience: "Experience",
      Trade: "Trade",
      "Apply without Resume": "Apply without Resume",
      "Upload Video Test": "Upload Video Test",
      "Verified Employer": "Verified Employer",
      "Report Fraud": "Report Fraud",
    },
  },
  hi: {
    translation: {
      GulfPath: "गल्फपाथ",
      "Find Verified Visa-Free Jobs in GCC":
        "GCC में सत्यापित वीज़ा-मुक्त नौकरियाँ खोजें",
      "No Recruitment Fees. 100% Employer Sponsored.":
        "कोई भर्ती शुल्क नहीं। 100% नियोक्ता प्रायोजित।",
      "Search Jobs": "नौकरियाँ खोजें",
      "Document Vault": "दस्तावेज़ वॉल्ट",
      Employers: "नियोक्ता",
      Login: "लॉग इन",
      Register: "पंजीकरण करें",
      "Trending Jobs": "ट्रेंडिंग नौकरियाँ",
      "Verified Free": "सत्यापित मुफ़्त",
      "Apply Now": "अभी आवेदन करें",
      "Listen to Job Details": "नौकरी का विवरण सुनें",
      "Free Food": "मुफ़्त खाना",
      Accommodation: "आवास",
      Transportation: "परिवहन",
      Medical: "चिकित्सा",
      Salary: "वेतन",
      Location: "स्थान",
      Experience: "अनुभव",
      Trade: "व्यापार",
      "Apply without Resume": "बिना रेज़्यूमे के आवेदन करें",
      "Upload Video Test": "वीडियो टेस्ट अपलोड करें",
      "Verified Employer": "सत्यापित नियोक्ता",
      "Report Fraud": "धोखाधड़ी की रिपोर्ट करें",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
