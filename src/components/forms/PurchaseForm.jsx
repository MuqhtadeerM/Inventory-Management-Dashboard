import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { usePurchases } from "../../context/PurchaseContext";

const PurchaseForm = ({ isOpen, onClose, onSave, initialData = null }) => {
  const { vendors, products } = usePurchases();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    vendorId: "",
    status: "pending",
    notes: "",
  });
  const [items, setItems] = useState([
    { productId: "", quantity: "", price: "" },
  ]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          date: initialData.date,
          vendorId: initialData.vendorId.toString(),
          status: initialData.status,
          notes: initialData.notes || "",
        });
        setItems(
          initialData.items.map((item) => ({
            productId: item.productId.toString(),
            quantity: item.quantity.toString(),
            price: item.price.toString(),
          }))
        );
      } else {
        setFormData({
          date: new Date().toISOString().split("T")[0],
          vendorId: "",
          status: "pending",
          notes: "",
        });
        setItems([{ productId: "", quantity: "", price: "" }]);
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

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // Auto-fill price when product is selected
    if (field === "productId" && value) {
      const product = products.find((p) => p.id === parseInt(value));
      if (product) {
        newItems[index].price = product.price.toString();
      }
    }

    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { productId: "", quantity: "", price: "" }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.price) || 0;
      return total + quantity * price;
    }, 0);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.vendorId) {
      newErrors.vendorId = "Vendor is required";
    }

    // Validate items
    const hasValidItem = items.some(
      (item) => item.productId && item.quantity && item.price
    );

    if (!hasValidItem) {
      newErrors.items = "At least one valid item is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const selectedVendor = vendors.find(
      (v) => v.id === parseInt(formData.vendorId)
    );

    const purchaseItems = items
      .filter((item) => item.productId && item.quantity && item.price)
      .map((item) => {
        const product = products.find((p) => p.id === parseInt(item.productId));
        return {
          productId: parseInt(item.productId),
          product: product ? product.name : "",
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
        };
      });

    const purchaseData = {
      ...formData,
      vendorId: parseInt(formData.vendorId),
      vendor: selectedVendor ? selectedVendor.name : "",
      items: purchaseItems,
      totalAmount: calculateTotal(),
      id: initialData ? initialData.id : Date.now(),
    };

    onSave(purchaseData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      vendorId: "",
      status: "pending",
      notes: "",
    });
    setItems([{ productId: "", quantity: "", price: "" }]);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {initialData ? "Edit Purchase" : "Add Purchase"}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Fill in the purchase details
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
              {initialData ? "Update Purchase" : "Save Purchase"}
            </button>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Purchase Information */}
            <h3 className="mb-6 text-base font-semibold text-gray-800">
              Purchase Information
            </h3>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
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

              {/* Vendor */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Vendor
                </label>
                <select
                  name="vendorId"
                  value={formData.vendorId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-colors"
                >
                  <option value="">Select vendor</option>
                  {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
                {errors.vendorId && (
                  <p className="mt-1 text-xs text-red-600">{errors.vendorId}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-colors"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Items Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800">
                  Purchase Items
                </h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white rounded-md transition-colors"
                  style={{ backgroundColor: "#E31E24" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#C41E1E")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#E31E24")
                  }
                >
                  <Plus size={16} />
                  Add Item
                </button>
              </div>

              {errors.items && (
                <p className="mb-3 text-xs text-red-600">{errors.items}</p>
              )}

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    {/* Product */}
                    <div className="col-span-12 md:col-span-5">
                      <select
                        value={item.productId}
                        onChange={(e) =>
                          handleItemChange(index, "productId", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                      >
                        <option value="">Select product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-5 md:col-span-3">
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                        min="1"
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                      />
                    </div>

                    {/* Price */}
                    <div className="col-span-5 md:col-span-3">
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value)
                        }
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                      />
                    </div>

                    {/* Remove Button */}
                    <div className="flex items-center justify-center col-span-2 md:col-span-1">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                        className="p-2 text-red-600 transition-colors rounded-md hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-end mt-4">
                <div className="px-4 py-2 bg-gray-100 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">
                    Total:{" "}
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    ₹{calculateTotal().toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any additional notes"
                rows="3"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent resize-none transition-colors"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
