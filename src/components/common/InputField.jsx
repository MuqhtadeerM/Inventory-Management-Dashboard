const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className={className}>
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
        {...props}
      />
    </div>
  );
};

export default InputField;
