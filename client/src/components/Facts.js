import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Facts = () => {
  const { t } = useTranslation();
  // Define state for each number
  const [bloodBanks, setBloodBanks] = useState(0);
  const [donations, setDonations] = useState(0);
  const [livesSaved, setLivesSaved] = useState(0);
  const [voluntaryDonors, setVoluntaryDonors] = useState(0);

  // Function to count up to target number
  const countUp = (setter, target, duration) => {
    let start = 0;
    const increment = target / (duration / 20); // Number of increments
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setter(Math.floor(start));
    }, 30);
  };

  useEffect(() => {
    // Start the counters when the component loads
    countUp(setBloodBanks, 700, 2000); // Count to 700 in 2 seconds
    countUp(setDonations, 1200, 2500); // Count to 1.2M in 2.5 seconds
    countUp(setLivesSaved, 500, 3000); // Count to 500K in 3 seconds
    countUp(setVoluntaryDonors, 80, 1500); // Count to 80% in 1.5 seconds
  }, []);

  return (
    <div>
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          {/* Title */}
          <h2 className="text-center text-3xl font-bold md:text-5xl">
            {t("factsComponent.title")}
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-lg items-center text-center text-sm text-gray-500 sm:text-base md:mb-12 lg:mb-16 font-semibold p-6">
            {t("factsComponent.description")}
          </p>
          {/* Content */}
          <div className="mx-auto flex w-full max-w-4xl flex-col flex-wrap justify-between gap-5 px-16 sm:flex-row md:gap-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-sm font-semibold">
                {t("factsComponent.facts.bloodBanks")}
              </p>
              <h2 className="text-3xl font-bold md:text-6xl">{bloodBanks}+</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-sm font-semibold">
                {t("factsComponent.facts.annualDonations")}
              </p>
              <h2 className="text-3xl font-bold md:text-6xl">
                {donations.toLocaleString()}
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-sm font-semibold">
                {t("factsComponent.facts.livesSaved")}
              </p>
              <h2 className="text-3xl font-bold md:text-6xl">
                {livesSaved.toLocaleString()}+
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-sm font-semibold">
                {t("factsComponent.facts.voluntaryDonors")}
              </p>
              <h2 className="text-3xl font-bold md:text-6xl">
                {voluntaryDonors}%
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facts;
