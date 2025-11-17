import React, { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within ExpenseProvider");
  }
  return context;
};

// Initial mock data
const initialExpenses = [
  {
    id: 1,
    date: "2025-11-12",
    type: "Transportation",
    description: "Fuel for delivery van",
    amount: 500,
    user: "Sales User",
  },
  {
    id: 2,
    date: "2025-11-11",
    type: "Utilities",
    description: "Monthly electricity bill",
    amount: 1200,
    user: "Manager User",
  },
  {
    id: 3,
    date: "2025-11-10",
    type: "Office Supplies",
    description: "Printing paper and pens",
    amount: 300,
    user: "Sales User",
  },
];

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(initialExpenses);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(
      expenses.map((exp) => (exp.id === id ? { ...updatedExpense, id } : exp))
    );
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const value = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
