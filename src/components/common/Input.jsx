import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  icon: Icon,
  className = "",
  inputClassName = "",
  min,
  max,
  step,
  rows,
  autoComplete = "off",
}) => {
  const baseInputStyles =
    "w-full px-4 py-2.5 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed";
  const errorStyles = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300";

  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">
            <Icon size={18} />
          </div>
        )}

        <InputComponent
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          rows={rows}
          autoComplete={autoComplete}
          className={`${baseInputStyles} ${errorStyles} ${
            Icon ? "pl-10" : ""
          } ${inputClassName}`}
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
