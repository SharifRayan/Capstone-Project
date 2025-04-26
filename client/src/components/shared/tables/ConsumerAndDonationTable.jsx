import moment from "moment";

export default function ConsumerTable({ data, heading }) {
  return (
    <div className="container mx-auto px-4 sm:px-8 lg:ml-72">
      <div className="py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg mb-6 text-center">
          <span className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-red-500 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg mb-6 text-center">
            {heading[0]}
          </span>
          {heading.slice(1)}
        </h1>
        <div className="overflow-x-auto bg-white rounded-sm shadow-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-lg font-bold text-gray-700 uppercase tracking-wider bg-gray-100">
                  Blood Group
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-lg font-bold text-gray-700 uppercase tracking-wider bg-white">
                  Inventory Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-lg font-bold text-gray-700 uppercase tracking-wider bg-gray-100">
                  Quantity (ML)
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-lg font-bold text-gray-700 uppercase tracking-wider bg-white">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-lg font-bold text-gray-700 uppercase tracking-wider bg-gray-100">
                  Time & Date
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => (
                <tr
                  key={record._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-5 py-5 border-b border-gray-200 text-sm bg-gray-100">
                    <p className="text-gray-900 whitespace-no-wrap font-medium">
                      {record.bloodGroup}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm bg-white">
                    <p className="text-gray-700 whitespace-no-wrap">
                      {record.inventoryType}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm bg-gray-100">
                    <p className="text-gray-700 whitespace-no-wrap">
                      {record.quantity}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm bg-white">
                    <p className="text-gray-700 whitespace-no-wrap">
                      {record.email}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm bg-gray-100">
                    <p className="text-gray-700 whitespace-no-wrap">
                      {moment(record.updatedAt).format("DD/MM/YYYY hh:mm A")}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
