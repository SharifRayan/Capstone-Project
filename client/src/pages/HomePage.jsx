import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios for making HTTP requests
import DonorList from "../components/DonorList";
import RequestBlood from "../components/RequestBlood";
import BloodRequestsList from "../components/BloodRequestsList";

import "./Home.css";
import Footer from "./Footer";
import Blog from "../components/Blog";
import Hero from "../components/Hero";

import FAQ from "../components/FAQ";
import Facts from "../components/Facts";
import FeedbackDisplay from "../components/FeedbackDisplay";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const [donors, setDonors] = useState([]);

  // Fetch donors from the backend
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("/get-donars", {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Assuming the token is stored in the user object
          },
        });
        setDonors(response.data.donors); // Assuming the backend sends the donors in this format
      } catch (error) {
        console.error("Failed to fetch donors:", error);
      }
    };

    if (user) {
      fetchDonors();
    }
  }, [user]);

  // Redirect based on user role
  const navigateTo = () => {
    if (user?.role === "organisation") {
      return <Navigate to={"/inventory"} />;
    } else if (user?.role === "hospital" || user?.role === "donor") {
      return <Navigate to={"/organisation"} />;
    } else if (user?.role === "admin") {
      return <Navigate to={"/donor-list"} />;
    } else if (user?.role === "patient") {
      return <Navigate to={"/donor-list"} />;
    }
  };

  // Show the home screen if no navigation is needed
  if (!user) {
    return (
      <>
        <Hero />
        <div className="container px-6 py-16 mx-auto text-center mb-10">
          <div className="max-w-screen-xl mx-auto mt-20">
            <div className="wrapper">
              {/* Setting background images for left items */}
              <div className="itemLeft item1"></div>
              <div className="itemLeft item2"></div>
              <div className="itemLeft item3"></div>
              <div className="itemLeft item4"></div>
              <div className="itemLeft item5"></div>
            </div>
            <div className="wrapper">
              {/* Setting background images for right items */}
              <div className="itemRight item1"></div>
              <div className="itemRight item2"></div>
              <div className="itemRight item3"></div>
              <div className="itemRight item4"></div>
              <div className="itemRight item5"></div>
            </div>
          </div>
        </div>
        <Blog />
        <Facts />
        <DonorList />
        <section>
          {/* Container */}
          <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
            {/* Component */}
            <div className="grid items-center gap-8 sm:gap-20 lg:grid-cols-2 lg:gap-5">
              <div>
                <h2 className="mb-6 max-w-2xl text-3xl font-bold md:mb-10 md:text-5xl lg:mb-12">
                  {t("bloodPointsComponent.title")}
                </h2>
                {/* List */}
                <ul className="grid max-w-lg grid-cols-2 gap-4">
                  <li className="flex items-center">
                    <img
                      src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9473e2e6cf65_tick-circle.svg"
                      alt=""
                      className="mr-2 h-8 w-8"
                    />
                    <p className="text-sm sm:text-base">
                      {t("bloodPointsComponent.points.thousandsDaily")}
                    </p>
                  </li>
                  <li className="flex items-center">
                    <img
                      src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9473e2e6cf65_tick-circle.svg"
                      alt=""
                      className="mr-2 h-8 w-8"
                    />
                    <p className="text-sm sm:text-base">
                      {t("bloodPointsComponent.points.safeProcess")}
                    </p>
                  </li>
                  <li className="flex items-center">
                    <img
                      src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9473e2e6cf65_tick-circle.svg"
                      alt=""
                      className="mr-2 h-8 w-8"
                    />
                    <p className="text-sm sm:text-base">
                      {t("bloodPointsComponent.points.regularCamps")}
                    </p>
                  </li>
                  <li className="flex items-center">
                    <img
                      src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9473e2e6cf65_tick-circle.svg"
                      alt=""
                      className="mr-2 h-8 w-8"
                    />
                    <p className="text-sm sm:text-base">
                      {t("bloodPointsComponent.points.makeDifference")}
                    </p>
                  </li>
                </ul>
                {/* Divider */}
                <div className="mb-10 mt-10 w-full max-w-lg border-b border-gray-300 "></div>
                <Link
                  to={""}
                  className="inline-block bg-red-600 px-6 py-3 font-semibold text-white"
                >
                  {t("bloodPointsComponent.becomeDonor")}
                </Link>
              </div>
              <div>
                <img
                  src="https://media.istockphoto.com/id/1528456016/vector/blood-donation-inscription-isolated-on-white-and-created-with-vector-red-blood-drops-heart.jpg?s=612x612&w=0&k=20&c=IqqmzD_mjWdc8YZS84U5TvDunUDKFvNKndxmbeAh6HA="
                  alt="Blood Donation in Bangladesh"
                  className="mx-auto inline-block h-full w-full max-w-2xl shadow-lg rounded-md"
                />
              </div>
            </div>
          </div>
        </section>
        <RequestBlood />
        <BloodRequestsList />
        <FeedbackDisplay />
        <FAQ />
        <Footer />
      </>
    );
  }

  // Display donors in a grid if user is logged in
  return (
    <>
      {navigateTo()}
      <div className="grid grid-cols-4 gap-4 p-4">
        {donors.map((donor) => (
          <div key={donor.id} className="p-4 border rounded shadow-lg">
            <h3 className="text-lg font-bold">{donor.name}</h3>
            <p>Blood Type: {donor.bloodType}</p>
            <p>Location: {donor.location}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
