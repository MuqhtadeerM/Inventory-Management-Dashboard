import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

import ReusableModal from "../../components/common/ReusableModal";
import InputField from "../../components/common/InputField";

const Outlets = () => {
  const [outlets, setOutlets] = useState([
    {
      id: 1,
      code: "OUT001",
      name: "City Mart",
      address: "Andheri West, Mumbai",
      contact: "9876543210",
      gst: "27AABCC1234D1Z5",
      type: "Retail",
      route: "South Mumbai",
    },
    {
      id: 2,
      code: "OUT002",
      name: "Quick Shop",
      address: "Koramangala, Bangalore",
      contact: "9876543211",
      gst: "29AABCC5678E1Z5",
      type: "Retail",
      route: "Bangalore Central",
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
    gst: "",
    type: "",
    route: "",
  });

  /** OPEN ADD MODAL */
  const openAdd = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      code: "",
      name: "",
      address: "",
      contact: "",
      gst: "",
      type: "",
      route: "",
    });
    setIsModalOpen(true);
  };

  /** OPEN EDIT MODAL */
  const openEdit = (o) => {
    setIsEditMode(true);
    setFormData(o);
    setIsModalOpen(true);
  };

  /** SAVE (ADD OR UPDATE) */
  const saveOutlet = () => {
    if (!formData.code || !formData.name) {
      alert("Please fill required fields");
      return;
    }

    if (isEditMode) {
      setOutlets((prev) =>
        prev.map((o) => (o.id === formData.id ? formData : o))
      );
    } else {
      setOutlets((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  /** DELETE */
  const deleteOutlet = (id) => {
    if (window.confirm("Delete this outlet?")) {
      setOutlets((prev) => prev.filter((o) => o.id !== id));
    }
  };

  const change = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Outlet Master</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          <Plus className="w-5 h-5" /> Add Outlet
        </button>
      </div>

      {/* TABLE */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="mb-4 text-xl font-bold">Outlet List</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Outlet Code
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Route
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {outlets.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{o.code}</td>
                  <td className="px-6 py-4">{o.name}</td>
                  <td className="px-6 py-4">{o.address}</td>
                  <td className="px-6 py-4">{o.route}</td>

                  <td className="flex gap-3 px-6 py-4">
                    <button
                      onClick={() => openEdit(o)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => deleteOutlet(o.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}

              {outlets.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-400">
                    No outlets added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <ReusableModal
          title={isEditMode ? "Edit Outlet" : "Add Outlet"}
          onClose={() => setIsModalOpen(false)}
          onSave={saveOutlet}
        >
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Outlet Code"
              name="code"
              placeholder="e.g. OUT001"
              value={formData.code}
              onChange={change}
            />

            <InputField
              label="Outlet Name"
              name="name"
              placeholder="Enter outlet name"
              value={formData.name}
              onChange={change}
            />

            <InputField
              className="col-span-2"
              label="Address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={change}
            />

            <InputField
              label="Contact Number"
              name="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={change}
            />

            <InputField
              label="GST Number"
              name="gst"
              placeholder="Enter GST number"
              value={formData.gst}
              onChange={change}
            />

            <InputField
              label="Outlet Type"
              name="type"
              placeholder="Retail"
              value={formData.type}
              onChange={change}
            />

            <InputField
              label="Route"
              name="route"
              placeholder="Select Route"
              value={formData.route}
              onChange={change}
            />
          </div>
        </ReusableModal>
      )}
    </div>
  );
};

export default Outlets;
