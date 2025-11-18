import { X } from "lucide-react";

const ReusableModal = ({ title, children, onClose, onSave }) => {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
            </button>
          </div>

          {/* Content */}
          {children}

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReusableModal;
