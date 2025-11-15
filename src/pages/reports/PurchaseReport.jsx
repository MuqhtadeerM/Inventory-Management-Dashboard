import React from "react";
import { Download, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";

const PurchaseReport = ({ user }) => {
  const purchaseData = [
    { month: "January", purchases: 15, amount: "₹85,000", avgOrder: "₹5,667" },
    { month: "February", purchases: 12, amount: "₹68,000", avgOrder: "₹5,667" },
    { month: "March", purchases: 18, amount: "₹95,000", avgOrder: "₹5,278" },
    { month: "April", purchases: 10, amount: "₹58,000", avgOrder: "₹5,800" },
    { month: "May", purchases: 14, amount: "₹75,000", avgOrder: "₹5,357" },
    { month: "June", purchases: 16, amount: "₹88,000", avgOrder: "₹5,500" },
  ];

  const totalPurchases = purchaseData.reduce(
    (sum, item) => sum + item.purchases,
    0
  );
  const totalAmount = purchaseData.reduce((sum, item) => {
    return sum + parseInt(item.amount.replace(/[₹,]/g, ""));
  }, 0);
  const avgOrderValue = Math.round(totalAmount / totalPurchases);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchase Report</h1>
          <p className="mt-1 text-gray-600">
            View purchase history and analytics
          </p>
        </div>
        <button className="bg-[#E31E24] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm text-gray-600">Total Purchases</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalPurchases}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm text-gray-600">Total Amount</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm text-gray-600">Avg Order Value</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{avgOrderValue.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">
            Monthly Purchase Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Month
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Purchases
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Avg Order Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {purchaseData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {item.month}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.purchases}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.avgOrder}
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

export default PurchaseReport;
