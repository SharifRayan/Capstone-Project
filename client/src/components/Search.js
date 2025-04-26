import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUser, FiMail, FiPhone, FiMapPin, FiDroplet } from "react-icons/fi";

const Search = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [bloodType, setBloodType] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/donors")
      .then((response) => {
        const sanitizedData = response.data.map((donor) => ({
          ...donor,
          city: donor.city || "",
          bloodGroup: donor.bloodGroup || "",
        }));
        setDonors(sanitizedData);
        setFilteredDonors(sanitizedData);
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("There was an error!", error);
      });
  }, []);

  // Filter donors based on location and blood type
  const handleFilter = () => {
    let filtered = donors;

    if (location) {
      filtered = filtered.filter(
        (donor) =>
          donor.city &&
          donor.city.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (bloodType) {
      filtered = filtered.filter(
        (donor) =>
          donor.bloodGroup &&
          donor.bloodGroup.toLowerCase() === bloodType.toLowerCase()
      );
    }

    setFilteredDonors(filtered);
  };

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <h2 className="text-center text-3xl font-bold md:text-5xl mb-16">
          Blood Donors
        </h2>
        {error && (
          <p className="mx-auto mb-8 mt-4 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Filters */}
        <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-4">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <button
            onClick={handleFilter}
            className="w-full max-w-sm px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Apply Filters
          </button>
        </div>

        {/* Content */}
        <div className="mx-auto grid max-w-8xl justify-items-center gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 lg:gap-10">
          {filteredDonors.map((donor) => (
            <div
              key={donor._id}
              className="flex max-w-lg flex-col items-start gap-4 rounded-md border border-solid border-gray-300 px-8 py-6 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={
                  donor.profilePicture ||
                  "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                }
                alt={donor.name}
                className="mb-4 inline-block h-64 w-full object-cover rounded-lg"
              />
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

export default Search;
