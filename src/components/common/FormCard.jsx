import React from "react";
import Button from "./Button";

const FormCard = ({
  title,
  subtitle,
  onCancel,
  onSubmit,
  submitText = "Save",
  cancelText = "Cancel",
  isEdit = false,
  children,
}) => {
  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="secondary" onClick={onCancel}>
              {cancelText}
            </Button>
            <Button onClick={onSubmit}>
              {isEdit ? `Update ${submitText}` : `Save ${submitText}`}
            </Button>
          </div>
        </div>
      </div>

      {/* Form Content Card */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default FormCard;
