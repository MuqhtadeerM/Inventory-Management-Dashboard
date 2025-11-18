import React, { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

const Outlets = () => {
  const [outlets, setOutlets] = useState([
    {
      id: 1,
      code: "OUT001",
      name: "City Mart",
      address: "Andheri West, Mumbai",
      contact: "+91 98765 43210",
      gst: "27AADCS1234F1Z2",
      type: "Retail",
      route: "South Mumbai",
    },
    {
      id: 2,
      code: "OUT002",
      name: "Super Store",
      address: "Connaught Place, Delhi",
      contact: "+91 98765 43211",
      gst: "07AACCS2233F1D1",
      type: "Retail",
      route: "North Delhi",
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
    type: "Retail",
    route: "",
  });

  // ------------------------- OPEN ADD MODAL -------------------------
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      code: "",
      name: "",
      address: "",
      contact: "",
      gst: "",
      type: "Retail",
      route: "",
    });
    setIsModalOpen(true);
  };

  // ------------------------- OPEN EDIT MODAL -------------------------
  const openEditModal = (outlet) => {
    setIsEditMode(true);
    setFormData({ ...outlet });
    setIsModalOpen(true);
  };

  // --------------------------- SAVE OUTLET ---------------------------
  const saveOutlet = () => {
    if (isEditMode) {
      // UPDATE existing outlet
      setOutlets((prev) =>
        prev.map((o) => (o.id === formData.id ? formData : o))
      );
    } else {
      // ADD new outlet
      setOutlets((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    setIsModalOpen(false);
  };

  // --------------------------- DELETE OUTLET ---------------------------
  const deleteOutlet = (id) => {
    if (window.confirm("Are you sure you want to delete this outlet?")) {
      setOutlets((prev) => prev.filter((o) => o.id !== id));
    }
  };

  // INPUT HANDLER
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --------------------------------------------------------
  // --------------------------- UI --------------------------
  // --------------------------------------------------------

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Outlet Master</h1>
          <p className="mt-1 text-gray-600">Manage outlet information</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#E31E24] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Plus className="w-5 h-5" /> Add Outlet
        </button>
      </div>

      {/* TABLE */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h3 className="mb-4 text-xl font-bold">Outlet List</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Code
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
              {outlets.map((outlet) => (
                <tr key={outlet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{outlet.code}</td>
                  <td className="px-6 py-4 font-semibold">{outlet.name}</td>
                  <td className="px-6 py-4">{outlet.address}</td>
                  <td className="px-6 py-4">{outlet.route}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(outlet)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => deleteOutlet(outlet.id)}
                        className="text-red-600 hover:text-red-900"
                      >
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

      {/* ------------------------- MODAL ------------------------- */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {isEditMode ? "Edit Outlet" : "Add Outlet"}
                </h2>

                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-900" />
                </button>
              </div>

              {/* FORM FIELDS */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Outlet Code *</label>
                  <input
                    name="code"
                    placeholder="e.g. OUT001"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Outlet Name *</label>
                  <input
                    name="name"
                    placeholder="Enter outlet name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <input
                    name="address"
                    placeholder="Enter complete address"
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
                  <label className="text-sm font-medium">GST Number</label>
                  <input
                    name="gst"
                    placeholder="Enter GST number"
                    value={formData.gst}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Outlet Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  >
                    <option>Retail</option>
                    <option>Wholesale</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Route</label>
                  <select
                    name="route"
                    value={formData.route}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  >
                    <option>Select route</option>
                    <option>South Mumbai</option>
                    <option>North Delhi</option>
                    <option>Bangalore Central</option>
                    <option>Chennai West</option>
                  </select>
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
                  onClick={saveOutlet}
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

export default Outlets;
