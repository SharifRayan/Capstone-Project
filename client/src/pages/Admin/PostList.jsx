import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const PostList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/blood-requests"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching blood requests:", error);
        setError("Failed to fetch blood requests.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBloodRequests();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/blood-requests/${id}`);
      setData((prevData) => prevData.filter((request) => request._id !== id));
    } catch (error) {
      console.error("Error deleting blood request:", error);
      setError("Failed to delete the blood request.");
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case "urgent":
        return "bg-red-500 text-white";
      case "within 24 hours":
        return "bg-yellow-400 text-white";
      case "within a week":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-sm h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-72">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg mb-6 text-center">
          <span className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-red-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg mb-6 text-center">
            B
          </span>
          lood Requests
        </h1>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Full Name",
                    "Address",
                    "Blood Type",
                    "Contact Info",
                    "Quantity",
                    "Urgency",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left tracking-wider text-base font-bold text-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {request.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.bloodType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.contactInfo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold tracking-wide rounded-full ${getUrgencyColor(
                            request.urgency
                          )}`}
                        >
                          {request.urgency}
                        </span>
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center mr-20">
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                          >
                            <FaTrash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                    >
                      No blood requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostList;
