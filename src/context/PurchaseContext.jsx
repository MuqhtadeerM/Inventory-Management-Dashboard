import React, { createContext, useContext, useState } from "react";

const PurchaseContext = createContext();

export const usePurchases = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchases must be used within PurchaseProvider");
  }
  return context;
};

// Initial mock data
const initialPurchases = [
  {
    id: 1,
    date: "2025-11-10",
    vendorId: 1,
    vendor: "Coca-Cola Beverages India",
    items: [
      { productId: 1, product: "Coca-Cola 500ml", quantity: 100, price: 45 },
      { productId: 2, product: "Fanta 330ml", quantity: 50, price: 30 },
    ],
    totalAmount: 5880,
    status: "completed",
    notes: "Regular monthly stock",
  },
];

// Mock vendors
const mockVendors = [
  {
    id: 1,
    name: "Coca-Cola Beverages India",
    contact: "Venkatesh Rao",
    phone: "+91 80 1234 5678",
  },
  {
    id: 2,
    name: "Local Distributor",
    contact: "Rajesh Kumar",
    phone: "+91 98765 43210",
  },
];

// Mock products
const mockProducts = [
  { id: 1, name: "Coca-Cola 500ml", price: 45 },
  { id: 2, name: "Coca-Cola 330ml", price: 35 },
  { id: 3, name: "Fanta 500ml", price: 40 },
  { id: 4, name: "Fanta 330ml", price: 30 },
  { id: 5, name: "Sprite 500ml", price: 40 },
  { id: 6, name: "Sprite 330ml", price: 30 },
];

export const PurchaseProvider = ({ children }) => {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [vendors] = useState(mockVendors);
  const [products] = useState(mockProducts);

  const addPurchase = (purchase) => {
    const newPurchase = {
      ...purchase,
      id: Date.now(),
    };
    setPurchases([newPurchase, ...purchases]);
  };

  const updatePurchase = (id, updatedPurchase) => {
    setPurchases(
      purchases.map((purchase) =>
        purchase.id === id ? { ...updatedPurchase, id } : purchase
      )
    );
  };

  const deletePurchase = (id) => {
    setPurchases(purchases.filter((purchase) => purchase.id !== id));
  };

  const value = {
    purchases,
    vendors,
    products,
    addPurchase,
    updatePurchase,
    deletePurchase,
  };

  return (
    <PurchaseContext.Provider value={value}>
      {children}
    </PurchaseContext.Provider>
  );
};
