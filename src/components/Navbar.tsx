import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe, ShieldCheck, User, Menu } from "lucide-react";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                GulfPath
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap">Home</Link>
            <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap">Find Jobs</Link>
            <Link to="/register" className="text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap">Create Your Profile</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap">Resources</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap">Premium</Link>
            <Link to="/employers" className="text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap">Employer Portal</Link>

            <div className="flex items-center gap-2 border-l pl-6 border-gray-200">
              <Globe className="h-5 w-5 text-gray-400" />
              <select
                className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer"
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                {t("Login")}
              </Link>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
