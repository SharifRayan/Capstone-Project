// src/components/DonorList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUser, FiMail, FiPhone, FiMapPin, FiDroplet } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const DonorList = () => {
  const { t } = useTranslation();
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/donors")
      .then((response) => {
        setDonors(response.data);
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Title */}
        <h2 className="text-center text-3xl font-bold md:text-5xl mb-16">
          {t("bloodDonorsComponent.title")}
        </h2>
        {error && (
          <p className="mx-auto mb-8 mt-4 text-center text-sm text-red-500">
            {error}
          </p>
        )}
        {/* Content */}
        <div className="mx-auto grid max-w-8xl justify-items-center gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 lg:gap-10">
          {/* Mapping Donors */}
          {donors.map((donor) => (
            <div
              key={donor._id}
              className="flex max-w-lg flex-col items-start gap-4 rounded-md border border-solid border-gray-300 px-8 py-6 transition-transform duration-300 hover:scale-105"
            >
              {/* Profile Picture or Placeholder Image */}
              <img
                src={
                  donor.profilePicture ||
                  "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                }
                alt={donor.name}
                className="mb-4 inline-block h-64 w-full object-cover rounded-lg"
              />
              {/* Donor Information */}
              <p className="font-bold text-xl">{donor.name}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <FiUser className="mr-2 text-red-600" /> {donor.gender}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <FiDroplet className="mr-2 text-red-600" /> Blood Group:{" "}
                {donor.bloodGroup}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <FiMail className="mr-2 text-red-600" /> {donor.email}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <FiPhone className="mr-2 text-red-600" /> {donor.phone}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <FiMapPin className="mr-2 text-red-600" /> {donor.address},{" "}
                {donor.city}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonorList;
