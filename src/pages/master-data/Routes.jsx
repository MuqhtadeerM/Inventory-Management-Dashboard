import React from "react";
import { Plus, Edit, Trash2, MapPin, Truck } from "lucide-react";

// Named as RoutesPage to avoid conflict with react-router-dom Routes
const RoutesPage = ({ user }) => {
  const routes = [
    {
      id: 1,
      name: "Route A - North Mumbai",
      area: "North Zone",
      outlets: 15,
      driver: "Suresh Patil",
      vehicle: "MH-01-AB-1234",
      status: "Active",
    },
    {
      id: 2,
      name: "Route B - South Mumbai",
      area: "South Zone",
      outlets: 12,
      driver: "Ramesh Singh",
      vehicle: "MH-01-CD-5678",
      status: "Active",
    },
    {
      id: 3,
      name: "Route C - East Delhi",
      area: "East Zone",
      outlets: 18,
      driver: "Vijay Kumar",
      vehicle: "DL-01-EF-9012",
      status: "Active",
    },
    {
      id: 4,
      name: "Route D - West Bangalore",
      area: "West Zone",
      outlets: 10,
      driver: "Arun Reddy",
      vehicle: "KA-01-GH-3456",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Routes</h1>
          <p className="mt-1 text-gray-600">Manage delivery routes</p>
        </div>
        <button className="bg-[#E31E24] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Route
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Total Routes</p>
          <p className="text-3xl font-bold text-gray-900">{routes.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Active Routes</p>
          <p className="text-3xl font-bold text-green-600">
            {routes.filter((r) => r.status === "Active").length}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Total Outlets Covered</p>
          <p className="text-3xl font-bold text-gray-900">
            {routes.reduce((sum, r) => sum + r.outlets, 0)}
          </p>
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Route List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Route Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Area
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Outlets
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Driver
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Vehicle
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
                {routes.map((route) => (
                  <tr key={route.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {route.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {route.area}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {route.outlets} outlets
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {route.driver}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        {route.vehicle}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          route.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {route.status}
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

// Default export
export default RoutesPage;
