import React from "react";
import { Plus, Eye, Edit } from "lucide-react";

const Purchases = ({ user }) => {
  const purchases = [
    {
      id: 1,
      date: "11/10/2025",
      vendor: "Coca-Cola Beverages India",
      items: "2 item(s)",
      totalAmount: "₹5,880",
      status: "completed",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
          <p className="mt-1 text-gray-600">Manage purchase orders</p>
        </div>
        <button className="bg-[#E31E24] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Purchase
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Purchase List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Items
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {purchase.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {purchase.vendor}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {purchase.items}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {purchase.totalAmount}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                        {purchase.status}
                      </span>
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

export default Purchases;
