import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiLogIn, FiUserPlus, FiFileText } from "react-icons/fi"; // FiFileText can be used as a request icon
import BloodDonationLogo from "../assets/Blood-Donation-Logo.png";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Navbar = () => {
  const { t } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(false);
  const navigate = useNavigate();

  const handleLanguageToggle = () => {
    const newLanguage = isEnglish ? "bn" : "en";
    i18n.changeLanguage(newLanguage);
    setIsEnglish(!isEnglish);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className="bg-white shadow-md z-50 sticky top-0">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <button
            className="flex-shrink-0 cursor-pointer focus:outline-none"
            onClick={() => handleNavigate("/")}
          >
            <img
              src={BloodDonationLogo}
              alt="Blood Donation Logo"
              className="w-16 h-16"
            />
          </button>

          <div className="flex-grow"></div>
          <div className="flex items-center space-x-4 ml-4">
            <button
              onClick={() => handleNavigate("/search")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <FiSearch className="mr-2" /> {t("navBar.search")}
            </button>
            <button
              onClick={() => handleNavigate("/register")}
              className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <FiFileText className="mr-2" /> {t("navBar.request")}
            </button>
            <button
              onClick={() => handleNavigate("/login")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <FiLogIn className="mr-2" /> {t("navBar.login")}
            </button>
            <button
              onClick={() => handleNavigate("/register")}
              className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <FiUserPlus className="mr-2" /> {t("navBar.register")}
            </button>
            <div className="flex items-center justify-center p-4">
              <label className="relative inline-flex cursor-pointer select-none items-center">
                <input
                  type="checkbox"
                  checked={isEnglish}
                  onChange={handleLanguageToggle}
                  className="sr-only"
                />
                <span
                  className={`label text-sm font-medium transition-colors duration-200 ${
                    isEnglish ? "text-gray-500" : "text-black"
                  }`}
                >
                  EN
                </span>
                <div className="relative mx-3">
                  <div
                    className={`w-14 h-7 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                      isEnglish ? "bg-[#B91C1C]" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                      isEnglish ? "translate-x-7" : ""
                    }`}
                  ></div>
                </div>
                <span
                  className={`label text-sm font-medium transition-colors duration-200 ${
                    isEnglish ? "text-black" : "text-gray-500"
                  }`}
                >
                  BN
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
