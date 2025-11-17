import React, { createContext, useContext, useState } from "react";

const ReturnContext = createContext();

export const useReturns = () => {
  const context = useContext(ReturnContext);
  if (!context) {
    throw new Error("useReturns must be used within ReturnProvider");
  }
  return context;
};

// Initial mock data
const initialReturns = [
  {
    id: 1,
    date: "2025-11-09",
    saleId: 1,
    outlet: "City Mart",
    items: [{ productId: 2, product: "Fanta 500ml", quantity: 2, price: 60 }],
    amount: 80,
    reason: "Damaged products",
  },
];

// Mock sales
const mockSales = [
  {
    id: 1,
    outlet: "City Mart",
    date: "2025-11-12",
    total: 1568,
  },
  {
    id: 2,
    outlet: "Super Store",
    date: "2025-11-10",
    total: 2340,
  },
];

// Mock products
const mockProducts = [
  { id: 1, name: "Coca-Cola 500ml", price: 60 },
  { id: 2, name: "Fanta 500ml", price: 60 },
  { id: 3, name: "Sprite 500ml", price: 60 },
  { id: 4, name: "Coca-Cola 330ml", price: 40 },
  { id: 5, name: "Fanta 330ml", price: 40 },
  { id: 6, name: "Sprite 330ml", price: 40 },
];

export const ReturnProvider = ({ children }) => {
  const [returns, setReturns] = useState(initialReturns);
  const [sales] = useState(mockSales);
  const [products] = useState(mockProducts);

  const addReturn = (returnData) => {
    const newReturn = {
      ...returnData,
      id: Date.now(),
    };
    setReturns([newReturn, ...returns]);
  };

  const updateReturn = (id, updatedReturn) => {
    setReturns(
      returns.map((ret) => (ret.id === id ? { ...updatedReturn, id } : ret))
    );
  };

  const deleteReturn = (id) => {
    setReturns(returns.filter((ret) => ret.id !== id));
  };

  const value = {
    returns,
    sales,
    products,
    addReturn,
    updateReturn,
    deleteReturn,
  };

  return (
    <ReturnContext.Provider value={value}>{children}</ReturnContext.Provider>
  );
};
