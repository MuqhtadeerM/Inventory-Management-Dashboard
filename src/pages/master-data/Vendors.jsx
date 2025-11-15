import React from "react";
import { Plus, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react";

const Vendors = ({ user }) => {
  const vendors = [
    {
      id: 1,
      name: "Coca-Cola Beverages India",
      contact: "+91 22 1234 5678",
      email: "contact@cocacola.in",
      address: "Mumbai, Maharashtra",
      productsSupplied: "Coca-Cola, Sprite, Fanta",
      status: "Active",
    },
    {
      id: 2,
      name: "Pepsi India Holdings",
      contact: "+91 22 8765 4321",
      email: "info@pepsi.in",
      address: "Gurgaon, Haryana",
      productsSupplied: "Pepsi, Mountain Dew, 7UP",
      status: "Active",
    },
    {
      id: 3,
      name: "Local Beverages Distributor",
      contact: "+91 98765 43210",
      email: "sales@localdistributor.com",
      address: "Bangalore, Karnataka",
      productsSupplied: "Various Local Brands",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
          <p className="mt-1 text-gray-600">Manage vendor information</p>
        </div>
        <button className="bg-[#E31E24] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Vendor
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Total Vendors</p>
          <p className="text-3xl font-bold text-gray-900">{vendors.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Active Vendors</p>
          <p className="text-3xl font-bold text-green-600">
            {vendors.filter((v) => v.status === "Active").length}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Inactive Vendors</p>
          <p className="text-3xl font-bold text-gray-600">
            {vendors.filter((v) => v.status === "Inactive").length}
          </p>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Vendor List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Vendor Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Location
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
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {vendor.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {vendor.contact}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {vendor.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {vendor.address}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          vendor.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {vendor.status}
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

export default Vendors;
