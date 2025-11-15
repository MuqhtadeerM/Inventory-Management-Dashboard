import React from "react";

const RecentSales = () => {
  const sales = [
    {
      outlet: "City Mart",
      date: "11/12/2025",
      amount: "₹1,568",
      status: "paid",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Sales</h3>
      <div className="space-y-4">
        {sales.map((sale, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <div>
              <p className="font-semibold text-gray-900">{sale.outlet}</p>
              <p className="text-sm text-gray-500">{sale.date}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{sale.amount}</p>
              <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                {sale.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSales;
