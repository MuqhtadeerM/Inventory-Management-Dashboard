import React from "react";
import { Store, MapPin, Phone, Mail, Edit, Clock, User } from "lucide-react";

const StoreManagement = ({ user }) => {
  const storeInfo = {
    name: "Coca-Cola Distribution Center",
    address: "123 Business Park, Andheri East, Mumbai, Maharashtra 400069",
    phone: "+91 22 1234 5678",
    email: "store@cocacola.in",
    manager: "Rajesh Kumar",
    openingHours: "9:00 AM - 6:00 PM",
    warehouse: "Warehouse A - Building 5",
    gstNumber: "27AABCU9603R1ZM",
    panNumber: "AABCU9603R",
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Management</h1>
          <p className="mt-1 text-gray-600">
            Manage store information and settings
          </p>
        </div>
        <button className="bg-[#E31E24] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Edit className="w-5 h-5" />
          Edit Store Info
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Store Information Card */}
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#E31E24] rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Store Information
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Store Name
              </label>
              <p className="mt-1 text-lg text-gray-900">{storeInfo.name}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <MapPin className="w-4 h-4" />
                Address
              </label>
              <p className="mt-1 text-gray-900">{storeInfo.address}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                <p className="mt-1 text-gray-900">{storeInfo.phone}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <p className="mt-1 text-gray-900">{storeInfo.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details Card */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Additional Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <User className="w-4 h-4" />
                Store Manager
              </label>
              <p className="mt-1 text-gray-900">{storeInfo.manager}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Clock className="w-4 h-4" />
                Opening Hours
              </label>
              <p className="mt-1 text-gray-900">{storeInfo.openingHours}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Warehouse Location
              </label>
              <p className="mt-1 text-gray-900">{storeInfo.warehouse}</p>
            </div>
          </div>
        </div>

        {/* Tax Information Card */}
        <div className="p-6 bg-white rounded-lg shadow lg:col-span-2">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Tax Information
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-gray-600">
                GST Number
              </label>
              <p className="mt-1 font-mono text-lg text-gray-900">
                {storeInfo.gstNumber}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                PAN Number
              </label>
              <p className="mt-1 font-mono text-lg text-gray-900">
                {storeInfo.panNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManagement;
