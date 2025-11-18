import React, { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [products, setProducts] = useState([
    {
      id: 1,
      productCode: "CC330",
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
      productCode: "CC500",
      name: "Coca-Cola 500ml",
      category: "Beverages",
      uom: "Bottle",
      wholesale: 45,
      retail: 60,
      gst: "12%",
      stock: 300,
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    productCode: "",
    productName: "",
    category: "Beverages",
    uom: "Bottle",
    gst: "12%",
    wholesale: "",
    retail: "",
    stock: "",
  });

  // OPEN ADD FORM
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      productCode: "",
      productName: "",
      category: "Beverages",
      uom: "Bottle",
      gst: "12%",
      wholesale: "",
      retail: "",
      stock: "",
    });
    setIsModalOpen(true);
  };

  // OPEN EDIT FORM
  const openEditModal = (product) => {
    setIsEditMode(true);
    setFormData({
      id: product.id,
      productCode: product.productCode,
      productName: product.name,
      category: product.category,
      uom: product.uom,
      gst: product.gst,
      wholesale: product.wholesale,
      retail: product.retail,
      stock: product.stock,
    });
    setIsModalOpen(true);
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SAVE PRODUCT (ADD or UPDATE)
  const saveProduct = () => {
    if (isEditMode) {
      // UPDATE
      setProducts((prev) =>
        prev.map((p) =>
          p.id === formData.id
            ? {
                ...p,
                productCode: formData.productCode,
                name: formData.productName,
                category: formData.category,
                uom: formData.uom,
                wholesale: formData.wholesale,
                retail: formData.retail,
                gst: formData.gst,
                stock: formData.stock,
              }
            : p
        )
      );
    } else {
      // ADD NEW
      setProducts((prev) => [
        ...prev,
        {
          id: Date.now(),
          productCode: formData.productCode,
          name: formData.productName,
          category: formData.category,
          uom: formData.uom,
          wholesale: formData.wholesale,
          retail: formData.retail,
          gst: formData.gst,
          stock: formData.stock,
        },
      ]);
    }

    closeModal();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Master</h1>
          <p className="mt-1 text-gray-600">Manage product catalog</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#E31E24] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-xl font-bold">Product List</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Product Code
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    UOM
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Wholesale
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Retail
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    GST %
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{p.productCode}</td>
                    <td className="px-6 py-4 font-semibold">{p.name}</td>
                    <td className="px-6 py-4">{p.category}</td>
                    <td className="px-6 py-4">{p.uom}</td>
                    <td className="px-6 py-4">₹{p.wholesale}</td>
                    <td className="px-6 py-4">₹{p.retail}</td>
                    <td className="px-6 py-4">{p.gst}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                        {p.stock}
                      </span>
                    </td>
                    <td className="flex gap-3 px-6 py-4">
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => openEditModal(p)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => deleteProduct(p.id)}
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
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <>
          {/* Dim Background - matches screenshot */}
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-xl animate-fadeIn">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {isEditMode ? "Edit Product" : "Add Product"}
                </h2>
                <button onClick={closeModal}>
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              {/* Form */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Product Code *
                  </label>
                  <input
                    name="productCode"
                    placeholder="e.g. CC330"
                    value={formData.productCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50 focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <input
                    name="productName"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50 focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  >
                    <option>Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    UOM
                  </label>
                  <select
                    name="uom"
                    value={formData.uom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  >
                    <option>Bottle</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    GST %
                  </label>
                  <select
                    name="gst"
                    value={formData.gst}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  >
                    <option>12%</option>
                    <option>18%</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Wholesale Price (₹)
                  </label>
                  <input
                    name="wholesale"
                    type="number"
                    value={formData.wholesale}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Retail Price (₹)
                  </label>
                  <input
                    name="retail"
                    type="number"
                    value={formData.retail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Initial Stock
                  </label>
                  <input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={closeModal}
                  className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={saveProduct}
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

export default Products;
