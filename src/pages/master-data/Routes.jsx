import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import ReusableModal from "../../components/common/ReusableModal";
import InputField from "../../components/common/InputField";
import TextareaField from "../../components/common/TextareaField";

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
      description: "South Delhi distribution",
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

  const openAdd = () => {
    setIsEditMode(false);
    setFormData({ id: null, code: "", name: "", description: "" });
    setIsModalOpen(true);
  };

  const openEdit = (r) => {
    setIsEditMode(true);
    setFormData(r);
    setIsModalOpen(true);
  };

  const saveRoute = () => {
    if (!formData.code || !formData.name) {
      alert("Please fill required fields (code & name).");
      return;
    }
    if (isEditMode)
      setRoutes((p) => p.map((x) => (x.id === formData.id ? formData : x)));
    else setRoutes((p) => [...p, { ...formData, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const deleteRoute = (id) => {
    if (window.confirm("Delete this route?"))
      setRoutes((p) => p.filter((r) => r.id !== id));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Route Master</h1>
          <p className="mt-1 text-gray-600">Manage delivery routes</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#E31E24] text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Route
        </button>
      </div>

      {/* Table */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h3 className="mb-4 text-xl font-bold">Route List</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Route Code
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Route Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
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
                      onClick={() => openEdit(r)}
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
              {routes.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-400">
                    No routes added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ReusableModal
          title={isEditMode ? "Edit Route" : "Add Route"}
          onClose={() => setIsModalOpen(false)}
          onSave={saveRoute}
        >
          <div className="space-y-6">
            <InputField
              label="Route Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g. R001"
            />
            <InputField
              label="Route Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter route name"
            />
            <TextareaField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter route description"
            />
          </div>
        </ReusableModal>
      )}
    </div>
  );
};

export default RoutesPage;
