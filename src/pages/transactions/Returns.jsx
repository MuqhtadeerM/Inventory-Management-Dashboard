import React from "react";
import { Plus, Eye, Edit } from "lucide-react";

const Returns = ({ user }) => {
  const returns = [
    {
      id: 1,
      date: "11/9/2025",
      outlet: "City Mart",
      items: "1 item(s)",
      amount: "₹80",
      reason: "Damaged products",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns</h1>
          <p className="mt-1 text-gray-600">Manage product returns</p>
        </div>
        <button className="bg-[#E31E24] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Return
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Return List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Outlet
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Items
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {returns.map((returnItem) => (
                  <tr key={returnItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {returnItem.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {returnItem.outlet}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {returnItem.items}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {returnItem.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {returnItem.reason}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-gray-900">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
