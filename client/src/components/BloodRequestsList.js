// src/components/BloodRequestsList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function BloodRequestsList() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/blood-requests")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blood requests:", error);
        setError("Failed to fetch blood requests.");
      });
  }, []);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case "Urgent":
        return "bg-red-500 text-white px-2 py-1 rounded-full";
      case "Within 24 hours":
        return "bg-yellow-500 text-white px-2 py-1 rounded-full";
      case "Within a week":
        return "bg-green-500 text-white px-2 py-1 rounded-full";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        Blood Requests
      </h1>
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white shadow-lg rounded-xl p-6 transform transition duration-300 hover:shadow-xl hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {request.fullName} :{" "}
                <span className="text-red-600 font-bold">
                  {request.bloodType}
                </span>
              </h2>
              <p className="text-gray-600 mb-1">{request.address}</p>
              <p className="text-gray-600 mb-2">
                Quantity:{" "}
                <span className="font-medium">{request.quantity} units</span>
              </p>
              <p
                className={`${getUrgencyClass(
                  request.urgency
                )} w-max text-xs mb-2`}
              >
                {request.urgency}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Contact:</span>{" "}
                {request.contactInfo}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No blood requests found.
        </p>
      )}
    </div>
  );
}

export default BloodRequestsList;
