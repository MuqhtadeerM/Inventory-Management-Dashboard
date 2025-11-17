import React, { useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import Button from "../../components/common/Button";
import PaymentForm from "../../components/forms/PaymentForm";
import { usePayments } from "../../context/PaymentContext";

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

const Payments = ({ user }) => {
  const { payments, addPayment, updatePayment, deletePayment } = usePayments();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const handleAddPayment = () => {
    setEditingPayment(null);
    setIsFormOpen(true);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setIsFormOpen(true);
  };

  const handleDeletePayment = (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      deletePayment(id);
    }
  };

  const handleSavePayment = (paymentData) => {
    if (editingPayment) {
      updatePayment(editingPayment.id, paymentData);
    } else {
      addPayment(paymentData);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPayment(null);
  };

  // Show form if open, otherwise show list
  if (isFormOpen) {
    return (
      <PaymentForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSavePayment}
        initialData={editingPayment}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-5 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Payments</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage payment transactions
            </p>
          </div>
          <Button icon={Plus} onClick={handleAddPayment}>
            Add Payment
          </Button>
        </div>
      </div>

      {/* Payment List */}
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b bg-gray-50">
          <h2 className="text-base font-semibold text-gray-800">
            Payment List
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
                  Sale
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Amount
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Method
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Reference
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-8 text-sm text-center text-gray-500"
                  >
                    No payments found. Click "Add Payment" to create one.
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-800">
                      {payment.sale}
                    </td>
                    <td className="px-5 py-3 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {payment.method}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {payment.reference}
                    </td>
                    <td className="px-5 py-3 text-sm whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPayment(payment)}
                          className="p-1 text-gray-600 transition-colors rounded hover:text-gray-800 hover:bg-gray-100"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePayment(payment.id)}
                          className="p-1 text-red-600 transition-colors rounded hover:text-red-800 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
