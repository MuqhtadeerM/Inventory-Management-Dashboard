import React from "react";

const LowStockProducts = () => {
  const products = [
    {
      name: "Fanta 330ml",
      category: "Beverages",
      stock: "30 units",
      status: "Low Stock",
    },
    {
      name: "Fanta 500ml",
      category: "Beverages",
      stock: "45 units",
      status: "Low Stock",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Low Stock Products
      </h3>
      <div className="space-y-4">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <div>
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{product.stock}</p>
              <span className="inline-block px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                {product.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockProducts;
