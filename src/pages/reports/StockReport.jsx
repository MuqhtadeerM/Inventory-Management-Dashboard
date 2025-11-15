import React from "react";
import { Download, Package, AlertTriangle, CheckCircle } from "lucide-react";

const StockReport = ({ user }) => {
  const stockData = [
    {
      product: "Coca-Cola 330ml",
      category: "Beverages",
      currentStock: 500,
      minStock: 100,
      status: "Good",
    },
    {
      product: "Coca-Cola 500ml",
      category: "Beverages",
      currentStock: 350,
      minStock: 100,
      status: "Good",
    },
    {
      product: "Sprite 330ml",
      category: "Beverages",
      currentStock: 400,
      minStock: 100,
      status: "Good",
    },
    {
      product: "Sprite 500ml",
      category: "Beverages",
      currentStock: 300,
      minStock: 100,
      status: "Good",
    },
    {
      product: "Fanta 330ml",
      category: "Beverages",
      currentStock: 30,
      minStock: 100,
      status: "Low",
    },
    {
      product: "Fanta 500ml",
      category: "Beverages",
      currentStock: 45,
      minStock: 100,
      status: "Low",
    },
    {
      product: "Thums Up 330ml",
      category: "Beverages",
      currentStock: 250,
      minStock: 100,
      status: "Good",
    },
    {
      product: "Limca 500ml",
      category: "Beverages",
      currentStock: 180,
      minStock: 100,
      status: "Good",
    },
  ];

  const totalStock = stockData.reduce(
    (sum, item) => sum + item.currentStock,
    0
  );
  const lowStockCount = stockData.filter(
    (item) => item.status === "Low"
  ).length;
  const goodStockCount = stockData.filter(
    (item) => item.status === "Good"
  ).length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Report</h1>
          <p className="mt-1 text-gray-600">View current inventory status</p>
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
              <p className="mb-2 text-sm text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">
                {stockData.length}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm text-gray-600">Total Stock</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalStock.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm text-gray-600">Low Stock Items</p>
              <p className="text-3xl font-bold text-red-600">{lowStockCount}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Stock Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Current Stock
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Min Stock
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stockData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {item.product}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.currentStock} units
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.minStock} units
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Good"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
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

export default StockReport;
