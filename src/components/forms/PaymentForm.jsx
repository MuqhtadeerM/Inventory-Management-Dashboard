import React, { useState, useEffect } from "react";
import { usePayments } from "../../context/PaymentContext";

const PAYMENT_METHODS = ["Cash", "Card", "UPI", "Bank Transfer", "Cheque"];

const PaymentForm = ({ isOpen, onClose, onSave, initialData = null }) => {
  const { sales } = usePayments();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    saleId: "",
    amount: "",
    method: "Cash",
    reference: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          date: initialData.date,
          saleId: initialData.saleId || "",
          amount: initialData.amount.toString(),
          method: initialData.method,
          reference: initialData.reference,
        });
      } else {
        setFormData({
          date: new Date().toISOString().split("T")[0],
          saleId: "",
          amount: "",
          method: "Cash",
          reference: "",
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

    if (!formData.saleId) {
      newErrors.saleId = "Sale is required";
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Valid amount is required";
    }

    if (!formData.method) {
      newErrors.method = "Payment method is required";
    }

    if (!formData.reference.trim()) {
      newErrors.reference = "Reference number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const selectedSale = sales.find((s) => s.id === parseInt(formData.saleId));

    const paymentData = {
      ...formData,
      amount: parseFloat(formData.amount),
      sale: selectedSale
        ? `${selectedSale.outlet} - ${formatDate(selectedSale.date)}`
        : "",
      id: initialData ? initialData.id : Date.now(),
    };

    onSave(paymentData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      saleId: "",
      amount: "",
      method: "Cash",
      reference: "",
    });
    setErrors({});
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!isOpen) return null;

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {initialData ? "Edit Payment" : "Add Payment"}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Fill in the payment details
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm"
              style={{ backgroundColor: "#E31E24" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#C41E1E")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#E31E24")
              }
            >
              {initialData ? "Update Payment" : "Save Payment"}
            </button>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Section Title */}
            <h3 className="mb-6 text-base font-semibold text-gray-800">
              Payment Information
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Date */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-colors"
                />
                {errors.date && (
                  <p className="mt-1 text-xs text-red-600">{errors.date}</p>
                )}
              </div>

              {/* Sale */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Sale
                </label>
                <select
                  name="saleId"
                  value={formData.saleId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-colors"
                >
                  <option value="">Select sale</option>
                  {sales.map((sale) => (
                    <option key={sale.id} value={sale.id}>
                      {sale.outlet} - {formatDate(sale.date)} (₹{sale.balance}{" "}
                      pending)
                    </option>
                  ))}
                </select>
                {errors.saleId && (
                  <p className="mt-1 text-xs text-red-600">{errors.saleId}</p>
                )}
              </div>

              {/* Payment Amount */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-colors"
                />
                {errors.amount && (
                  <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  name="method"
                  value={formData.method}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-colors"
                >
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
                {errors.method && (
                  <p className="mt-1 text-xs text-red-600">{errors.method}</p>
                )}
              </div>

              {/* Reference Number */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Reference Number
                </label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  placeholder="Enter reference number"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-colors"
                />
                {errors.reference && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.reference}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
