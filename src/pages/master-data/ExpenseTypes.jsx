import React from "react";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";

const ExpenseTypes = ({ user }) => {
  const expenseTypes = [
    {
      id: 1,
      name: "Transportation",
      description: "Vehicle fuel and maintenance costs",
      budget: "₹50,000",
      spent: "₹32,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Utilities",
      description: "Electricity, water, and internet bills",
      budget: "₹30,000",
      spent: "₹28,500",
      status: "Active",
    },
    {
      id: 3,
      name: "Office Supplies",
      description: "Stationery and office materials",
      budget: "₹10,000",
      spent: "₹7,200",
      status: "Active",
    },
    {
      id: 4,
      name: "Marketing",
      description: "Advertising and promotional activities",
      budget: "₹100,000",
      spent: "₹85,000",
      status: "Active",
    },
    {
      id: 5,
      name: "Maintenance",
      description: "Equipment and facility maintenance",
      budget: "₹25,000",
      spent: "₹15,000",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expense Types</h1>
          <p className="mt-1 text-gray-600">
            Manage expense categories and budgets
          </p>
        </div>
        <button className="bg-[#E31E24] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Expense Type
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Total Categories</p>
          <p className="text-3xl font-bold text-gray-900">
            {expenseTypes.length}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Total Budget</p>
          <p className="text-3xl font-bold text-gray-900">₹2,15,000</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Total Spent</p>
          <p className="text-3xl font-bold text-red-600">₹1,67,700</p>
        </div>
      </div>

      {/* Expense Types Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Expense Type List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Type Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Spent
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Remaining
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
                {expenseTypes.map((type) => {
                  const budgetNum = parseInt(type.budget.replace(/[₹,]/g, ""));
                  const spentNum = parseInt(type.spent.replace(/[₹,]/g, ""));
                  const remaining = budgetNum - spentNum;
                  const percentage = (spentNum / budgetNum) * 100;

                  return (
                    <tr key={type.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {type.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {type.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {type.budget}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {type.spent}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            percentage > 90
                              ? "bg-red-100 text-red-700"
                              : percentage > 70
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          ₹{remaining.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            type.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {type.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTypes;
