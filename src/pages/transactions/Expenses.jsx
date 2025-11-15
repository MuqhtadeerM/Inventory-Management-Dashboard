import React, { useState } from "react";
import { Plus, Edit } from "lucide-react";
import Button from "../components/common/Button";
import ExpenseForm from "../components/forms/ExpenseForm";
import { useExpenses } from "../context/ExpenseContext";
import { useAuth } from "../context/AuthContext";

// Helper function to format currency
const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Expenses = () => {
  const { expenses, addExpense, updateExpense } = useExpenses();
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleAddExpense = () => {
    setEditingExpense(null);
    setIsFormOpen(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleSaveExpense = (expenseData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
    } else {
      addExpense(expenseData);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-5 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Expenses</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage business expenses
            </p>
          </div>
          <Button icon={Plus} onClick={handleAddExpense}>
            Add Expense
          </Button>
        </div>
      </div>

      {/* Expense List */}
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b bg-gray-50">
          <h2 className="text-base font-semibold text-gray-800">
            Expense List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Type
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Description
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Amount
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  User
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                    {formatDate(expense.date)}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                    {expense.type}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-800">
                    {expense.description}
                  </td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-800 whitespace-nowrap">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                    {expense.user}
                  </td>
                  <td className="px-5 py-3 text-sm whitespace-nowrap">
                    <button
                      onClick={() => handleEditExpense(expense)}
                      className="p-1 text-gray-600 transition-colors rounded hover:text-gray-800 hover:bg-gray-100"
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expense Form Modal */}
      <ExpenseForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveExpense}
        initialData={editingExpense}
        currentUser={user?.name}
      />
    </div>
  );
};

export default Expenses;
