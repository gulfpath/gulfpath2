import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Briefcase,
  CheckCircle,
  Volume2,
  ShieldCheck,
  Banknote,
  Clock,
  FileText,
  Video,
  Info,
} from "lucide-react";

export default function JobDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  // Mock data fetching based on ID
  const job = {
    id,
    title: "Residential Electrician",
    company: "Al Futtaim Group",
    location: "Dubai, UAE",
    salary: "2,500 AED / month",
    experience: "2-5 Years",
    isFree: true,
    benefits: [
      "Free Food",
      "Accommodation",
      "Medical",
      "Transportation",
      "Annual Flight Ticket",
    ],
    description:
      "We are looking for an experienced Residential Electrician to join our team in Dubai. The ideal candidate will have 2-5 years of experience in residential wiring, troubleshooting, and maintenance.",
    requirements: [
      "Minimum 2 years of experience as an electrician",
      "ITI or relevant trade certificate",
      "Basic understanding of English or Arabic",
      "Physically fit for construction site work",
    ],
    postedDate: "2 days ago",
    vacancies: 15,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6">
            {job.isFree && (
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-green-200">
                <ShieldCheck className="h-5 w-5" />
                {t("Verified Free")}
              </div>
            )}
          </div>

          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
              <span className="text-3xl font-bold text-blue-600">
                {job.company.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-lg text-gray-600 font-medium flex items-center gap-2">
                {job.company}
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="font-semibold text-gray-900">{job.location}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Banknote className="h-4 w-4" />
                <span className="text-sm font-medium">Salary</span>
              </div>
              <p className="font-semibold text-gray-900">{job.salary}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm font-medium">Experience</span>
              </div>
              <p className="font-semibold text-gray-900">{job.experience}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Posted</span>
              </div>
              <p className="font-semibold text-gray-900">{job.postedDate}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/apply/${job.id}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors text-center shadow-lg shadow-blue-600/20"
            >
              {t("Apply without Resume")}
            </Link>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-3">
              <Volume2 className="h-6 w-6 text-blue-600" />
              {t("Listen to Job Details")}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                Job Description
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {job.description}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-600 text-lg"
                  >
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Benefits Included
              </h2>
              <div className="space-y-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {t(benefit)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Video className="h-6 w-6 text-blue-600" />
                Trade Test Required
              </h2>
              <p className="text-blue-800 mb-6 text-sm">
                This employer requires a short video demonstrating your skills.
                You can upload this during the application process.
              </p>
              <Link
                to={`/apply/${job.id}`}
                className="block w-full bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 px-4 py-3 rounded-xl font-bold text-center transition-colors"
              >
                Learn More
              </Link>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 flex items-start gap-4">
              <Info className="h-6 w-6 text-gray-400 shrink-0 mt-1" />
              <p className="text-sm text-gray-500">
                GulfPath verifies all employers. If anyone asks you for money to
                process this application, please report them immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
