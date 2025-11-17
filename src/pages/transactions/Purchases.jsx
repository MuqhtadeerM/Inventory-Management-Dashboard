import React, { useState } from "react";
import { Plus, Eye, Edit } from "lucide-react";
import Button from "../../components/common/Button";
import PurchaseForm from "../../components/forms/PurchaseForm";
import { usePurchases } from "../../context/PurchaseContext";

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

const Purchases = ({ user }) => {
  const { purchases, addPurchase, updatePurchase } = usePurchases();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(null);

  const handleAddPurchase = () => {
    setEditingPurchase(null);
    setIsFormOpen(true);
  };

  const handleEditPurchase = (purchase) => {
    setEditingPurchase(purchase);
    setIsFormOpen(true);
  };

  const handleSavePurchase = (purchaseData) => {
    if (editingPurchase) {
      updatePurchase(editingPurchase.id, purchaseData);
    } else {
      addPurchase(purchaseData);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPurchase(null);
  };

  // Show form if open, otherwise show list
  if (isFormOpen) {
    return (
      <PurchaseForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSavePurchase}
        initialData={editingPurchase}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-5 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Purchases</h1>
            <p className="mt-1 text-sm text-gray-600">Manage purchase orders</p>
          </div>
          <Button icon={Plus} onClick={handleAddPurchase}>
            Add Purchase
          </Button>
        </div>
      </div>

      {/* Purchase List */}
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b bg-gray-50">
          <h2 className="text-base font-semibold text-gray-800">
            Purchase List
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
                  Vendor
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Items
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Total Amount
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {purchases.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-8 text-sm text-center text-gray-500"
                  >
                    No purchases found. Click "Add Purchase" to create one.
                  </td>
                </tr>
              ) : (
                purchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {formatDate(purchase.date)}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-800">
                      {purchase.vendor}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {purchase.items.length} item(s)
                    </td>
                    <td className="px-5 py-3 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {formatCurrency(purchase.totalAmount)}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          purchase.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : purchase.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {purchase.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPurchase(purchase)}
                          className="p-1 text-gray-600 transition-colors rounded hover:text-gray-800 hover:bg-gray-100"
                          title="Edit"
                        >
                          <Edit size={16} />
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

export default Purchases;
