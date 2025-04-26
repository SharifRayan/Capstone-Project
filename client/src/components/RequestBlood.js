// src/components/RequestBlood.js
import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

function RequestBlood() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    bloodType: "",
    quantity: "",
    urgency: "",
    contactInfo: "",
  });

  const { fullName, address, bloodType, quantity, urgency, contactInfo } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/blood-requests",
        formData
      );
      console.log("Request Submitted:", res.data);
      alert("Blood request submitted successfully!");
      // Reset form after submission
      setFormData({
        fullName: "",
        address: "",
        bloodType: "",
        quantity: "",
        urgency: "",
        contactInfo: "",
      });
    } catch (err) {
      console.error("Error submitting request:", err.response.data);
      alert("Failed to submit request.");
    }
  };

  return (
    <section className=" py-16">
      <div className="container mx-auto max-w-5xl px-6 sm:px-10 lg:px-12 text-center ">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800">
          Request for Blood Donations
        </h2>
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-lg p-8 md:p-12 text-left shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={onChange}
              placeholder="Full Name"
              required
              className="input input-bordered w-full rounded-md p-4 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              name="contactInfo"
              value={contactInfo}
              onChange={onChange}
              placeholder="Phone Number"
              required
              className="input input-bordered w-full rounded-md p-4 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <select
              name="bloodType"
              value={bloodType}
              onChange={onChange}
              required
              className="select select-bordered w-full rounded-md p-4 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option disabled value="">
                Select Blood Type
              </option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
            <select
              name="urgency"
              value={urgency}
              onChange={onChange}
              required
              className="select select-bordered w-full rounded-md p-4 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option disabled value="">
                Select Urgency
              </option>
              <option>Urgent</option>
              <option>Within 24 hours</option>
              <option>Within a week</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={onChange}
              placeholder="Quantity (units)"
              required
              className="input input-bordered w-full rounded-md p-4 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              name="address"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
              className="input input-bordered w-full rounded-md p-4 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out p-4 text-white font-semibold text-lg rounded-md"
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}

export default RequestBlood;
