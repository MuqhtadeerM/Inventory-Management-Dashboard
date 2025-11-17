import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useReturns } from "../../context/ReturnContext";
import Button from "../common/Button";
import FormCard from "../common/FormCard";
import FormField from "../common/FormField";
import FormSection from "../common/FormSection";

const ReturnForm = ({ isOpen, onClose, onSave, initialData = null }) => {
  const { sales, products } = useReturns();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    saleId: "",
    reason: "",
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
          saleId: initialData.saleId.toString(),
          reason: initialData.reason,
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
          saleId: "",
          reason: "",
        });
        setItems([{ productId: "", quantity: "", price: "" }]);
      }
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

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
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.saleId) newErrors.saleId = "Original sale is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";

    const hasValidItem = items.some(
      (item) => item.productId && item.quantity && item.price
    );
    if (!hasValidItem) newErrors.items = "At least one valid item is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedSale = sales.find((s) => s.id === parseInt(formData.saleId));

    const returnItems = items
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

    const returnData = {
      ...formData,
      saleId: parseInt(formData.saleId),
      outlet: selectedSale ? selectedSale.outlet : "",
      items: returnItems,
      amount: calculateTotal(),
      id: initialData ? initialData.id : Date.now(),
    };

    onSave(returnData);
    onClose();
  };

  if (!isOpen) return null;

  const saleOptions = sales.map((sale) => ({
    value: sale.id,
    label: `${sale.outlet} - ${new Date(sale.date).toLocaleDateString()}`,
  }));

  const productOptions = products.map((p) => ({ value: p.id, label: p.name }));

  return (
    <FormCard
      title={initialData ? "Edit Return" : "Add Return"}
      subtitle="Fill in the return details"
      onCancel={onClose}
      onSubmit={handleSubmit}
      submitText="Return"
      isEdit={!!initialData}
    >
      <form onSubmit={handleSubmit}>
        <FormSection title="Return Information">
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <FormField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
            />

            <FormField
              label="Original Sale"
              type="select"
              name="saleId"
              value={formData.saleId}
              onChange={handleChange}
              error={errors.saleId}
              options={saleOptions}
              placeholder="Select sale"
            />

            <div className="md:col-span-2">
              <FormField
                label="Reason for Return"
                type="textarea"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                error={errors.reason}
                placeholder="Enter reason for return"
                rows={3}
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Return Items" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-800">Items</h3>
            <Button type="button" size="sm" icon={Plus} onClick={addItem}>
              Add Item
            </Button>
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
                <div className="col-span-12 md:col-span-5">
                  <select
                    value={item.productId}
                    onChange={(e) =>
                      handleItemChange(index, "productId", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
                  >
                    <option value="">Select product</option>
                    {productOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-5 md:col-span-3">
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    min="1"
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
                  />
                </div>

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
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
                  />
                </div>

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

          <div className="flex justify-end mt-4">
            <div className="px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Total: </span>
              <span className="text-lg font-bold text-gray-800">
                ₹{calculateTotal().toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </FormSection>
      </form>
    </FormCard>
  );
};

export default ReturnForm;
