import React, { createContext, useContext, useState } from "react";

const SalesContext = createContext();

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSales must be used within SalesProvider");
  }
  return context;
};

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([
    {
      id: 1,
      date: "11/12/2025",
      outlet: "City Mart",
      items: "2 item(s)",
      total: "₹1,568",
      paid: "₹1,568",
      status: "paid",
      user: "Manager User",
    },
  ]);

  const [showSalesForm, setShowSalesForm] = useState(false);

  const addSale = (saleData) => {
    const newSale = {
      id: sales.length + 1,
      date: saleData.date,
      outlet: saleData.outlet,
      items: `${saleData.items.length} item(s)`,
      total: `₹${saleData.total}`,
      paid: `₹${saleData.paidAmount}`,
      status:
        parseFloat(saleData.paidAmount) >= parseFloat(saleData.total)
          ? "paid"
          : "partial",
      user: "Current User", // You can get this from user prop
    };
    setSales([...sales, newSale]);
    setShowSalesForm(false);
  };

  const deleteSale = (id) => {
    setSales(sales.filter((sale) => sale.id !== id));
  };

  const updateSale = (id, updatedData) => {
    setSales(
      sales.map((sale) => (sale.id === id ? { ...sale, ...updatedData } : sale))
    );
  };

  return (
    <SalesContext.Provider
      value={{
        sales,
        showSalesForm,
        setShowSalesForm,
        addSale,
        deleteSale,
        updateSale,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};
