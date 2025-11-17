import React from "react";

const FormSection = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={className}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          )}
          {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default FormSection;
