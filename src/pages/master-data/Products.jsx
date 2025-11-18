import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import ReusableModal from "../../components/common/ReusableModal";
import InputField from "../../components/common/InputField";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      code: "CC330",
      name: "Coca-Cola 330ml",
      category: "Beverages",
      uom: "Bottle",
      wholesale: 30,
      retail: 40,
      gst: "12%",
      stock: 500,
    },
    {
      id: 2,
      code: "CC500",
      name: "Coca-Cola 500ml",
      category: "Beverages",
      uom: "Bottle",
      wholesale: 45,
      retail: 60,
      gst: "12%",
      stock: 300,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    code: "",
    name: "",
    category: "Beverages",
    uom: "Bottle",
    gst: "12%",
    wholesale: "",
    retail: "",
    stock: "",
  });

  const openAdd = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      code: "",
      name: "",
      category: "Beverages",
      uom: "Bottle",
      gst: "12%",
      wholesale: "",
      retail: "",
      stock: "",
    });
    setIsModalOpen(true);
  };

  const openEdit = (p) => {
    setIsEditMode(true);
    setFormData(p);
    setIsModalOpen(true);
  };

  const saveProduct = () => {
    if (!formData.code || !formData.name) {
      alert("Product code & name required");
      return;
    }
    if (isEditMode)
      setProducts((p) => p.map((x) => (x.id === formData.id ? formData : x)));
    else setProducts((p) => [...p, { ...formData, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Delete product?"))
      setProducts((p) => p.filter((x) => x.id !== id));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Product Master</h1>
          <p className="mt-1 text-gray-600">Manage product catalog</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#E31E24] text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="p-6 bg-white shadow rounded-xl">
        <h3 className="mb-4 text-xl font-bold">Product List</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Product Code
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  UOM
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Wholesale
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Retail
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  GST
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-xs text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{p.code}</td>
                  <td className="px-6 py-4 font-semibold">{p.name}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4">{p.uom}</td>
                  <td className="px-6 py-4">₹{p.wholesale}</td>
                  <td className="px-6 py-4">₹{p.retail}</td>
                  <td className="px-6 py-4">{p.gst}</td>
                  <td className="px-6 py-4">{p.stock}</td>
                  <td className="flex gap-3 px-6 py-4">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="9" className="py-6 text-center text-gray-400">
                    No products added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ReusableModal
          title={isEditMode ? "Edit Product" : "Add Product"}
          onClose={() => setIsModalOpen(false)}
          onSave={saveProduct}
        >
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Product Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g. CC330"
            />
            <InputField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            <InputField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />
            <InputField
              label="UOM"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              placeholder="Unit of measure"
            />
            <InputField
              label="GST %"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              placeholder="12%"
            />
            <InputField
              label="Wholesale Price (₹)"
              name="wholesale"
              value={formData.wholesale}
              onChange={handleChange}
              type="number"
            />
            <InputField
              label="Retail Price (₹)"
              name="retail"
              value={formData.retail}
              onChange={handleChange}
              type="number"
            />
            <InputField
              label="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              type="number"
            />
          </div>
        </ReusableModal>
      )}
    </div>
  );
};

export default Products;
