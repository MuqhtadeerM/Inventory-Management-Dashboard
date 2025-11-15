import React from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

const Products = ({ user }) => {
  const products = [
    {
      id: 1,
      name: "Coca-Cola 330ml",
      category: "Beverages",
      price: "₹20",
      stock: 500,
    },
    {
      id: 2,
      name: "Coca-Cola 500ml",
      category: "Beverages",
      price: "₹30",
      stock: 350,
    },
    {
      id: 3,
      name: "Sprite 330ml",
      category: "Beverages",
      price: "₹20",
      stock: 400,
    },
    {
      id: 4,
      name: "Sprite 500ml",
      category: "Beverages",
      price: "₹30",
      stock: 300,
    },
    {
      id: 5,
      name: "Fanta 330ml",
      category: "Beverages",
      price: "₹20",
      stock: 30,
    },
    {
      id: 6,
      name: "Fanta 500ml",
      category: "Beverages",
      price: "₹30",
      stock: 45,
    },
    {
      id: 7,
      name: "Thums Up 330ml",
      category: "Beverages",
      price: "₹20",
      stock: 250,
    },
    {
      id: 8,
      name: "Limca 500ml",
      category: "Beverages",
      price: "₹30",
      stock: 180,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-gray-600">Manage product inventory</p>
        </div>
        <button className="bg-[#E31E24] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Total Products</p>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">In Stock</p>
          <p className="text-3xl font-bold text-green-600">
            {products.filter((p) => p.stock >= 100).length}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Low Stock</p>
          <p className="text-3xl font-bold text-red-600">
            {products.filter((p) => p.stock < 100).length}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-sm text-gray-600">Total Value</p>
          <p className="text-3xl font-bold text-gray-900">₹43,500</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Product List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Price
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
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.stock < 100
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
