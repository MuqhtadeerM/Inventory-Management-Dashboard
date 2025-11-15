import React from "react";
import { Download, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const SalesReport = ({ user }) => {
  const salesData = [
    {
      month: "January",
      sales: 45,
      amount: "₹75,000",
      profit: "₹15,000",
      margin: "20%",
    },
    {
      month: "February",
      sales: 38,
      amount: "₹62,000",
      profit: "₹12,400",
      margin: "20%",
    },
    {
      month: "March",
      sales: 52,
      amount: "₹88,000",
      profit: "₹17,600",
      margin: "20%",
    },
    {
      month: "April",
      sales: 28,
      amount: "₹48,000",
      profit: "₹9,600",
      margin: "20%",
    },
    {
      month: "May",
      sales: 41,
      amount: "₹70,000",
      profit: "₹14,000",
      margin: "20%",
    },
    {
      month: "June",
      sales: 48,
      amount: "₹82,000",
      profit: "₹16,400",
      margin: "20%",
    },
  ];

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = salesData.reduce((sum, item) => {
    return sum + parseInt(item.amount.replace(/[₹,]/g, ""));
  }, 0);
  const totalProfit = salesData.reduce((sum, item) => {
    return sum + parseInt(item.profit.replace(/[₹,]/g, ""));
  }, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Report</h1>
          <p className="mt-1 text-gray-600">
            View sales performance and analytics
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
              <p className="mb-2 text-sm text-gray-600">Total Sales</p>
              <p className="text-3xl font-bold text-gray-900">{totalSales}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm text-gray-600">Total Profit</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{totalProfit.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Monthly Sales Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Month
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Sales Count
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Profit
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Margin
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {item.month}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.sales}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">
                      {item.profit}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.margin}
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

export default SalesReport;
