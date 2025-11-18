import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import ReusableModal from "../../components/common/ReusableModal";
import InputField from "../../components/common/InputField";
import TextareaField from "../../components/common/TextareaField";

const ExpenseTypes = () => {
  const [types, setTypes] = useState([
    {
      id: 1,
      name: "Transportation",
      description: "Vehicle fuel and maintenance",
    },
    { id: 2, name: "Utilities", description: "Electricity, water, internet" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
  });

  const openAdd = () => {
    setIsEditMode(false);
    setFormData({ id: null, name: "", description: "" });
    setIsModalOpen(true);
  };

  const openEdit = (t) => {
    setIsEditMode(true);
    setFormData(t);
    setIsModalOpen(true);
  };

  const saveType = () => {
    if (!formData.name) {
      alert("Name required.");
      return;
    }
    if (isEditMode)
      setTypes((p) => p.map((x) => (x.id === formData.id ? formData : x)));
    else setTypes((p) => [...p, { ...formData, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const deleteType = (id) => {
    if (window.confirm("Delete this expense type?"))
      setTypes((p) => p.filter((t) => t.id !== id));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Expense Type Master</h1>
          <p className="mt-1 text-gray-600">Manage expense categories</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#E31E24] text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Expense Type
        </button>
      </div>

      <div className="p-6 bg-white shadow rounded-xl">
        <h3 className="mb-4 text-xl font-bold">Expense Type List</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                  Name
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
              {types.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{t.name}</td>
                  <td className="px-6 py-4">{t.description}</td>
                  <td className="flex gap-3 px-6 py-4">
                    <button
                      onClick={() => openEdit(t)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteType(t.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {types.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-gray-400">
                    No expense types yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ReusableModal
          title={isEditMode ? "Edit Expense Type" : "Add Expense Type"}
          onClose={() => setIsModalOpen(false)}
          onSave={saveType}
        >
          <div className="space-y-6">
            <InputField
              label="Type Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter expense type name"
            />
            <TextareaField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>
        </ReusableModal>
      )}
    </div>
  );
};

export default ExpenseTypes;
