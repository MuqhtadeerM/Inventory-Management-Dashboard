import React, { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

const ExpenseTypes = () => {
  const [expenseTypes, setExpenseTypes] = useState([
    {
      id: 1,
      name: "Transportation",
      description: "Vehicle fuel and maintenance costs",
    },
    {
      id: 2,
      name: "Utilities",
      description: "Electricity, water, and internet bills",
    },
    {
      id: 3,
      name: "Office Supplies",
      description: "Stationery and office materials",
    },
    {
      id: 4,
      name: "Marketing",
      description: "Advertising and promotional activities",
    },
    {
      id: 5,
      name: "Maintenance",
      description: "Equipment and facility maintenance",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
  });

  // Open Add Modal
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ id: null, name: "", description: "" });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (type) => {
    setIsEditMode(true);
    setFormData(type);
    setIsModalOpen(true);
  };

  // Save Expense Type
  const saveType = () => {
    if (isEditMode) {
      setExpenseTypes((prev) =>
        prev.map((t) => (t.id === formData.id ? formData : t))
      );
    } else {
      setExpenseTypes((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // Delete Expense Type
  const deleteType = (id) => {
    if (window.confirm("Delete this expense type?")) {
      setExpenseTypes((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Expense Type Master
          </h1>
          <p className="mt-1 text-gray-600">Manage expense categories</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#E31E24] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Plus className="w-5 h-5" /> Add Expense Type
        </button>
      </div>

      {/* Table */}
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
              {expenseTypes.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{t.name}</td>
                  <td className="px-6 py-4">{t.description}</td>

                  <td className="flex gap-3 px-6 py-4">
                    <button
                      onClick={() => openEditModal(t)}
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
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------ Modal ------------------ */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-xl p-8 bg-white shadow-2xl rounded-xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {isEditMode ? "Edit Expense Type" : "Add Expense Type"}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-900" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium">Type Name</label>
                  <input
                    name="name"
                    placeholder="Enter expense type name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter description"
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
                  onClick={saveType}
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

export default ExpenseTypes;
