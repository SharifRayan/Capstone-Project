import React, { useState } from "react";
import moment from "moment";
import API from "../../../services/API";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

export default function TableForAdmin({ data, list }) {
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async (id) => {
    try {
      setDeleteId(id);
      const ans = window.confirm("Are you sure you want to delete this donor?");
      if (!ans) {
        setDeleteId(null);
        return;
      }
      const { data } = await API.delete(`/admin/delete-user/${id}`);
      if (data?.success) {
        toast(data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the user");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:ml-72">
      <div className="py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg mb-6 text-center">
          <span className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-red-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg mb-6 text-center">
            {list[0]}
          </span>
          {list.slice(1)}
        </h1>
        <div className="overflow-x-auto bg-white rounded-sm shadow-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-lg font-bold text-gray-700 uppercase tracking-wider bg-gray-100">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-lg font-bold text-gray-700 uppercase tracking-wider bg-white">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-lg font-bold text-gray-700 uppercase tracking-wider bg-gray-100">
                  Phone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-lg font-bold text-gray-700 uppercase tracking-wider bg-white">
                  Date & Time
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-lg font-bold text-gray-700 uppercase tracking-wider bg-gray-100">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => (
                <motion.tr
                  key={record._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-5 py-5 border-b border-gray-200 text-sm bg-gray-100">
                    <p className="text-gray-900 whitespace-no-wrap font-medium">
                      {record?.organisationName ||
                        record?.name ||
                        record?.hospitalName}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm bg-white">
                    <p className="text-gray-700 whitespace-no-wrap">
                      {record.email}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm bg-gray-100">
                    <p className="text-gray-700 whitespace-no-wrap">
                      {record.phone}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm bg-white">
                    <p className="text-gray-700 whitespace-no-wrap">
                      {moment(record.updatedAt).format("DD/MM/YYYY hh:mm A")}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm bg-gray-100 flex justify-center items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(record._id)}
                      className="bg-[#e21e1e] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-150 ease-in-out flex items-center"
                      disabled={deleteId === record._id}
                    >
                      {deleteId === record._id ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <FaTrash className="mr-2 text-white" />
                      )}
                      {deleteId === record._id ? "Deleting..." : "Delete"}
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
