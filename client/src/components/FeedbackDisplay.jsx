import React, { useEffect, useState } from "react";
import API from "../services/API";

const FeedbackDisplay = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await API.get("/feedback");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Failed to load feedbacks:", error);
        alert("Failed to load feedbacks.");
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        Patient Feedbacks
      </h1>
      {feedbacks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white shadow-lg rounded-xl p-6 transform transition duration-300 hover:shadow-xl hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {feedback.patientName} thanked{" "}
                <span className="text-blue-600 font-bold">
                  {feedback.donorName}
                </span>
              </h2>
              <p className="text-gray-600">{feedback.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No feedbacks available.
        </p>
      )}
    </div>
  );
};

export default FeedbackDisplay;
