import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import ReusableModal from "../../components/common/ReusableModal";
import InputField from "../../components/common/InputField";

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
      name: "Local Distributor",
      contact: "+91 98765 43210",
      gst: "07AABCC5678E1Z5",
      address: "Bengaluru, Karnataka",
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

  const openAdd = () => {
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

  const openEdit = (v) => {
    setIsEditMode(true);
    setFormData(v);
    setIsModalOpen(true);
  };

  const saveVendor = () => {
    if (!formData.code || !formData.name) {
      alert("Code and Name required.");
      return;
    }
    if (isEditMode)
      setVendors((p) => p.map((x) => (x.id === formData.id ? formData : x)));
    else setVendors((p) => [...p, { ...formData, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const deleteVendor = (id) => {
    if (window.confirm("Delete this vendor?"))
      setVendors((p) => p.filter((v) => v.id !== id));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Vendor Master</h1>
          <p className="mt-1 text-gray-600">Manage vendor information</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#E31E24] text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Vendor
        </button>
      </div>

      <div className="p-6 bg-white shadow rounded-xl">
        <h3 className="mb-4 text-xl font-bold">Vendor List</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Vendor Code
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Vendor Name
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  GST Number
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vendors.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{v.code}</td>
                  <td className="px-6 py-4 font-semibold">{v.name}</td>
                  <td className="px-6 py-4">{v.contact}</td>
                  <td className="px-6 py-4">{v.gst}</td>
                  <td className="flex gap-3 px-6 py-4">
                    <button
                      onClick={() => openEdit(v)}
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
              {vendors.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-400">
                    No vendors yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ReusableModal
          title={isEditMode ? "Edit Vendor" : "Add Vendor"}
          onClose={() => setIsModalOpen(false)}
          onSave={saveVendor}
        >
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Vendor Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g. V001"
            />
            <InputField
              label="Vendor Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter vendor name"
            />
            <InputField
              label="Contact Number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
            />
            <InputField
              label="GST Number"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              placeholder="Enter GST number"
            />
            <InputField
              className="col-span-2"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter vendor address"
            />
          </div>
        </ReusableModal>
      )}
    </div>
  );
};

export default Vendors;
