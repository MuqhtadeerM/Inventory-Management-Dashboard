import React, { useState, useEffect } from "react";
import Button from "../common/Button";

const EXPENSE_TYPES = [
  "Transportation",
  "Utilities",
  "Office Supplies",
  "Maintenance",
  "Salaries",
  "Marketing",
  "Others",
];

const ExpenseForm = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  currentUser = null,
}) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "",
    description: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          date: initialData.date,
          type: initialData.type,
          description: initialData.description,
          amount: initialData.amount.toString(),
        });
      } else {
        setFormData({
          date: new Date().toISOString().split("T")[0],
          type: "",
          description: "",
          amount: "",
        });
      }
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.type) {
      newErrors.type = "Expense type is required";
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Valid amount is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      user: currentUser || "Admin User",
      id: initialData ? initialData.id : Date.now(),
    };

    onSave(expenseData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      type: "",
      description: "",
      amount: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={handleClose}
        style={{ margin: 0, padding: 0 }}
      />

      {/* Modal Content - positioned over the overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {initialData ? "Edit Expense" : "Add Expense"}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Fill in the expense details
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <Button onClick={handleSubmit} size="md">
                {initialData ? "Update Expense" : "Save Expense"}
              </Button>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <h3 className="text-base font-semibold text-gray-800">
                  Expense Information
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Date */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                        errors.date
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#E31E24]"
                      }`}
                    />
                    {errors.date && (
                      <p className="mt-1 text-xs text-red-600">{errors.date}</p>
                    )}
                  </div>

                  {/* Expense Type */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Expense Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent bg-white ${
                        errors.type
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#E31E24]"
                      }`}
                    >
                      <option value="">Select expense type</option>
                      {EXPENSE_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.type && (
                      <p className="mt-1 text-xs text-red-600">{errors.type}</p>
                    )}
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Amount <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                        errors.amount
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#E31E24]"
                      }`}
                    />
                    {errors.amount && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.amount}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Description <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter expense description"
                      rows="4"
                      className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
                        errors.description
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#E31E24]"
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;
