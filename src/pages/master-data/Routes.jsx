import React, { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

const RoutesPage = () => {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      code: "R001",
      name: "North Mumbai",
      description: "Covers north zone",
    },
    {
      id: 2,
      code: "R002",
      name: "South Delhi",
      description: "Delhi south distribution",
    },
    {
      id: 3,
      code: "R003",
      name: "Bangalore Central",
      description: "Central Bangalore deliveries",
    },
    {
      id: 4,
      code: "R004",
      name: "Chennai West",
      description: "West zone supply chain",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    code: "",
    name: "",
    description: "",
  });

  // ------------------- OPEN ADD MODAL -------------------
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      code: "",
      name: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  // ------------------- OPEN EDIT MODAL -------------------
  const openEditModal = (route) => {
    setIsEditMode(true);
    setFormData({ ...route });
    setIsModalOpen(true);
  };

  // ------------------- SAVE ROUTE -------------------
  const saveRoute = () => {
    if (isEditMode) {
      setRoutes((prev) =>
        prev.map((r) => (r.id === formData.id ? formData : r))
      );
    } else {
      setRoutes((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // ------------------- DELETE ROUTE -------------------
  const deleteRoute = (id) => {
    if (window.confirm("Delete this route?")) {
      setRoutes(routes.filter((r) => r.id !== id));
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // --------------------------------------------------------
  // --------------------------- UI --------------------------
  // --------------------------------------------------------

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Route Master</h1>
          <p className="mt-1 text-gray-600">Manage delivery routes</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#E31E24] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Plus className="w-5 h-5" /> Add Route
        </button>
      </div>

      {/* TABLE */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h3 className="mb-4 text-xl font-bold">Route List</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Route Code
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Route Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {routes.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{r.code}</td>
                  <td className="px-6 py-4 font-semibold">{r.name}</td>
                  <td className="px-6 py-4">{r.description}</td>

                  <td className="flex gap-3 px-6 py-4">
                    <button
                      onClick={() => openEditModal(r)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteRoute(r.id)}
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

      {/* ------------------- MODAL ------------------- */}
      {isModalOpen && (
        <>
          {/* BACKDROP */}
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {isEditMode ? "Edit Route" : "Add Route"}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-900" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Route Code */}
                <div>
                  <label className="text-sm font-medium">Route Code</label>
                  <input
                    name="code"
                    placeholder="e.g. R001"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                {/* Route Name */}
                <div>
                  <label className="text-sm font-medium">Route Name</label>
                  <input
                    name="name"
                    placeholder="Enter route name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter route description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
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
                  onClick={saveRoute}
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

export default RoutesPage;
