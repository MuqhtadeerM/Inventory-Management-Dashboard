import React, { useState } from "react";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Edit,
  Clock,
  User,
  X,
  Trash2,
} from "lucide-react";

const StoreManagement = () => {
  const [stores, setStores] = useState([
    {
      id: 1,
      code: "ST001",
      name: "Main Warehouse",
      address: "Andheri East, Mumbai",
      contact: "9876543200",
      manager: "Manager User",
    },
    {
      id: 2,
      code: "ST002",
      name: "Regional Store",
      address: "Mumbai West",
      contact: "9876543201",
      manager: "Manager User",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    code: "",
    name: "",
    address: "",
    contact: "",
    manager: "",
  });

  // Open Add Modal
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      code: "",
      name: "",
      address: "",
      contact: "",
      manager: "",
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (store) => {
    setIsEditMode(true);
    setFormData(store);
    setIsModalOpen(true);
  };

  // Save Store
  const saveStore = () => {
    if (isEditMode) {
      setStores((prev) =>
        prev.map((s) => (s.id === formData.id ? formData : s))
      );
    } else {
      setStores((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const deleteStore = (id) => {
    if (window.confirm("Delete this store?")) {
      setStores((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
          <p className="mt-1 text-gray-600">
            Manage multiple stores and warehouses
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#E31E24] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Edit className="w-5 h-5" />
          Add Store
        </button>
      </div>

      {/* STORE LIST TABLE */}
      <div className="p-6 mb-8 bg-white shadow rounded-xl">
        <h3 className="mb-4 text-xl font-bold">Store List</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Store Code
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Store Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Manager
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {stores.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{s.code}</td>
                  <td className="px-6 py-4 font-semibold">{s.name}</td>
                  <td className="px-6 py-4">{s.address}</td>
                  <td className="px-6 py-4">{s.contact}</td>
                  <td className="px-6 py-4">{s.manager}</td>

                  <td className="flex gap-3 px-6 py-4">
                    <button
                      onClick={() => openEditModal(s)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => deleteStore(s.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------ MODAL ------------------ */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {isEditMode ? "Edit Store" : "Add Store"}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
                </button>
              </div>

              {/* FORM */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Store Code</label>
                  <input
                    name="code"
                    placeholder="e.g. ST001"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Store Name</label>
                  <input
                    name="name"
                    placeholder="Enter store name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <input
                    name="address"
                    placeholder="Enter store address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Contact Number</label>
                  <input
                    name="contact"
                    placeholder="Enter contact number"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Manager Name</label>
                  <input
                    name="manager"
                    placeholder="Enter manager name"
                    value={formData.manager}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={saveStore}
                  className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StoreManagement;
