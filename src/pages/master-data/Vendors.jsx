import React, { useState } from "react";
import { Plus, Edit, Trash2, X, Phone, MapPin } from "lucide-react";

const Vendors = () => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      code: "V001",
      name: "Coca-Cola Beverages India",
      contact: "+91 22 1234 5678",
      gst: "27AABCC1234D1Z5",
      address: "Mumbai, Maharashtra",
    },
    {
      id: 2,
      code: "V002",
      name: "Pepsi India Holdings",
      contact: "+91 22 8765 4321",
      gst: "07AABCC5678E1Z5",
      address: "Gurgaon, Haryana",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    code: "",
    name: "",
    contact: "",
    gst: "",
    address: "",
  });

  // OPEN ADD MODAL
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      code: "",
      name: "",
      contact: "",
      gst: "",
      address: "",
    });
    setIsModalOpen(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (vendor) => {
    setIsEditMode(true);
    setFormData({ ...vendor });
    setIsModalOpen(true);
  };

  // SAVE VENDOR (ADD/UPDATE)
  const saveVendor = () => {
    if (isEditMode) {
      setVendors((prev) =>
        prev.map((v) => (v.id === formData.id ? formData : v))
      );
    } else {
      setVendors((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // DELETE VENDOR
  const deleteVendor = (id) => {
    if (window.confirm("Delete this vendor?")) {
      setVendors((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ------------------------- UI -------------------------

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Master</h1>
          <p className="mt-1 text-gray-600">Manage vendor information</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#E31E24] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Plus className="w-5 h-5" /> Add Vendor
        </button>
      </div>

      {/* VENDOR LIST TABLE */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h3 className="mb-4 text-xl font-bold">Vendor List</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Vendor Code
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Vendor Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  GST Number
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {vendors.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{v.code}</td>
                  <td className="px-6 py-4 font-semibold">{v.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {v.contact}
                    </div>
                  </td>
                  <td className="px-6 py-4">{v.gst}</td>

                  <td className="flex gap-3 px-6 py-4">
                    <button
                      onClick={() => openEditModal(v)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => deleteVendor(v.id)}
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
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {isEditMode ? "Edit Vendor" : "Add Vendor"}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-900" />
                </button>
              </div>

              {/* Form Fields (same style as screenshot) */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Vendor Code</label>
                  <input
                    name="code"
                    placeholder="e.g. V001"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Vendor Name</label>
                  <input
                    name="name"
                    placeholder="Enter vendor name"
                    value={formData.name}
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
                  <label className="text-sm font-medium">GST Number</label>
                  <input
                    name="gst"
                    placeholder="Enter GST number"
                    value={formData.gst}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <input
                    name="address"
                    placeholder="Enter vendor address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={saveVendor}
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

export default Vendors;
