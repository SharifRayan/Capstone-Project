import React from "react";
import moment from "moment";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

export default function TableForPatientDetails({ data, list, onMessageClick }) {
  return (
    <div className="container mx-auto px-4 sm:px-8">
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
                      {record.name}
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
                      onClick={() => onMessageClick(record)}
                      className="bg-[#e21e1e] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-150 ease-in-out flex items-center"
                    >
                      <FiMail className="mr-2" /> Message
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
