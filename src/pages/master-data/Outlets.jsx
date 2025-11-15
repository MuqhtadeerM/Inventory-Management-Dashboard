import React from "react";
import { Plus, Edit, Trash2, MapPin, Phone } from "lucide-react";

const Outlets = ({ user }) => {
  const outlets = [
    {
      id: 1,
      name: "City Mart",
      location: "Andheri West, Mumbai",
      contact: "+91 98765 43210",
      manager: "Amit Sharma",
      status: "Active",
    },
    {
      id: 2,
      name: "Super Store",
      location: "Connaught Place, Delhi",
      contact: "+91 98765 43211",
      manager: "Priya Gupta",
      status: "Active",
    },
    {
      id: 3,
      name: "Quick Shop",
      location: "Koramangala, Bangalore",
      contact: "+91 98765 43212",
      manager: "Rajesh Kumar",
      status: "Active",
    },
    {
      id: 4,
      name: "Daily Needs",
      location: "T Nagar, Chennai",
      contact: "+91 98765 43213",
      manager: "Lakshmi Reddy",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outlets</h1>
          <p className="mt-1 text-gray-600">Manage retail outlets</p>
        </div>
        <button className="bg-[#E31E24] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Outlet
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Total Outlets</p>
          <p className="text-3xl font-bold text-gray-900">{outlets.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Active</p>
          <p className="text-3xl font-bold text-green-600">
            {outlets.filter((o) => o.status === "Active").length}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Inactive</p>
          <p className="text-3xl font-bold text-gray-600">
            {outlets.filter((o) => o.status === "Inactive").length}
          </p>
        </div>
      </div>

      {/* Outlets Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Outlet List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Outlet Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Manager
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Contact
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
                {outlets.map((outlet) => (
                  <tr key={outlet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {outlet.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {outlet.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {outlet.manager}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {outlet.contact}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          outlet.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {outlet.status}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outlets;
