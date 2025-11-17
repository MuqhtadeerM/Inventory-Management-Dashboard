import React, { useState } from "react";
import { Plus, Eye, Edit } from "lucide-react";
import Button from "../../components/common/Button";
import ReturnForm from "../../components/forms/ReturnForm";
import { useReturns } from "../../context/ReturnContext";

const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Returns = ({ user }) => {
  const { returns, addReturn, updateReturn } = useReturns();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReturn, setEditingReturn] = useState(null);

  const handleAddReturn = () => {
    setEditingReturn(null);
    setIsFormOpen(true);
  };

  const handleEditReturn = (returnItem) => {
    setEditingReturn(returnItem);
    setIsFormOpen(true);
  };

  const handleSaveReturn = (returnData) => {
    if (editingReturn) {
      updateReturn(editingReturn.id, returnData);
    } else {
      addReturn(returnData);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingReturn(null);
  };

  if (isFormOpen) {
    return (
      <ReturnForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveReturn}
        initialData={editingReturn}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-5 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Returns</h1>
            <p className="mt-1 text-sm text-gray-600">Manage product returns</p>
          </div>
          <Button icon={Plus} onClick={handleAddReturn}>
            Add Return
          </Button>
        </div>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b bg-gray-50">
          <h2 className="text-base font-semibold text-gray-800">Return List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Outlet
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Items
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Amount
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Reason
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {returns.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-8 text-sm text-center text-gray-500"
                  >
                    No returns found. Click "Add Return" to create one.
                  </td>
                </tr>
              ) : (
                returns.map((returnItem) => (
                  <tr
                    key={returnItem.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {formatDate(returnItem.date)}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-800">
                      {returnItem.outlet}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {returnItem.items.length} item(s)
                    </td>
                    <td className="px-5 py-3 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {formatCurrency(returnItem.amount)}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-800">
                      {returnItem.reason}
                    </td>
                    <td className="px-5 py-3 text-sm whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditReturn(returnItem)}
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

export default Returns;
