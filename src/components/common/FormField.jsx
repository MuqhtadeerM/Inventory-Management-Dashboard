import React from "react";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  options = [], // For select fields
  rows = 3, // For textarea
  min,
  max,
  step,
  className = "",
  children, // For custom content
}) => {
  const inputClasses = `w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-colors ${
    error ? "border-red-500" : ""
  } ${className}`;

  const renderInput = () => {
    if (children) {
      return children;
    }

    switch (type) {
      case "textarea":
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={`${inputClasses} resize-none`}
          />
        );

      case "select":
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={inputClasses}
          >
            <option value="">
              {placeholder || `Select ${label?.toLowerCase() || "option"}`}
            </option>
            {options.map((option) => (
              <option
                key={typeof option === "string" ? option : option.value}
                value={typeof option === "string" ? option : option.value}
              >
                {typeof option === "string" ? option : option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </label>
      )}
      {renderInput()}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
