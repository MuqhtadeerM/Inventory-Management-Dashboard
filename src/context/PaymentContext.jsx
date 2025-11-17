import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayments must be used within PaymentProvider");
  }
  return context;
};

// Initial mock data
const initialPayments = [
  {
    id: 1,
    date: "2025-11-12",
    sale: "City Mart - 11/12/2025",
    amount: 1568,
    method: "Cash",
    reference: "CASH-001",
  },
];

// Mock sales data for dropdown
const mockSales = [
  {
    id: 1,
    outlet: "City Mart",
    date: "2025-11-12",
    total: 1568,
    paid: 0,
    balance: 1568,
  },
  {
    id: 2,
    outlet: "Super Store",
    date: "2025-11-10",
    total: 2340,
    paid: 0,
    balance: 2340,
  },
];

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState(initialPayments);
  const [sales] = useState(mockSales);

  const addPayment = (payment) => {
    const newPayment = {
      ...payment,
      id: Date.now(),
    };
    setPayments([newPayment, ...payments]);
  };

  const updatePayment = (id, updatedPayment) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id ? { ...updatedPayment, id } : payment
      )
    );
  };

  const deletePayment = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const value = {
    payments,
    sales,
    addPayment,
    updatePayment,
    deletePayment,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};
