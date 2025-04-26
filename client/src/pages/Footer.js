import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="block">
        {/* Container */}
        <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
          {/* Component */}
          <div className="sm:flex-row flex justify-between flex-col">
            <h2 className="font-bold text-3xl md:text-5xl w-full max-w-xl">
              Help Save Lives by Donating Blood in Bangladesh
            </h2>
            <div className="mt-8 md:mt-0">
              <div className="mb-4 flex max-w-72 items-start justify-start">
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94bb99e6cf78_MapPin.svg"
                  alt="Location icon"
                  className="inline-block mr-3"
                />
                <p className="text-gray-500 text-sm sm:text-base">
                  National Blood Donation Center, House 123, Road 10, Banani,
                  Dhaka, Bangladesh
                </p>
              </div>
              <div className="mb-4 flex max-w-72 items-start justify-start">
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a944119e6cf76_EnvelopeSimple-2.svg"
                  alt="Email icon"
                  className="inline-block mr-3"
                />
                <p className="text-gray-500 text-sm sm:text-base">
                  support@blooddonationbd.org
                </p>
              </div>
            </div>
          </div>
          <div className="mb-14 w-full border-b border-black mt-16"></div>
          <div className="md:flex-row flex justify-between sm:items-center sm:flex-col items-start flex-col-reverse">
            <div className="font-semibold mb-4 sm:mb-0 py-1 text-center sm:text-center">
              <a
                href="/about"
                className="inline-block font-normal text-gray-500 transition hover:text-red-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
              >
                About Us
              </a>
              <a
                href="/why-donate"
                className="inline-block font-normal text-gray-500 transition hover:text-red-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
              >
                Why Donate Blood?
              </a>
              <a
                href="/find-donation-center"
                className="inline-block font-normal text-gray-500 transition hover:text-red-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
              >
                Find Donation Centers
              </a>
              <a
                href="/donation-process"
                className="inline-block font-normal text-gray-500 transition hover:text-red-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
              >
                Donation Process
              </a>
            </div>
            <p className="text-gray-500 text-sm sm:text-base">
              © Copyright 2024. All rights reserved. Blood Donation Bangladesh.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
