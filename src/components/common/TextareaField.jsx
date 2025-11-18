const TextareaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
}) => {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
      ></textarea>
    </div>
  );
};

export default TextareaField;
