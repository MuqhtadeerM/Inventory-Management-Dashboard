const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  disabled = false,
  fullWidth = false,
  loading = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    xs: "px-2.5 py-1.5 text-xs gap-1",
    sm: "px-3 py-2 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-5 py-3 text-base gap-2",
    xl: "px-6 py-3.5 text-base gap-2.5",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          className: "text-white shadow-sm",
          style: {
            backgroundColor: disabled ? "#9CA3AF" : "#E31E24",
          },
        };
      case "secondary":
        return {
          className: "bg-gray-600 hover:bg-gray-700 text-white shadow-sm",
          style: {},
        };
      case "outline":
        return {
          className:
            "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm",
          style: {},
        };
      case "danger":
        return {
          className: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
          style: {},
        };
      case "ghost":
        return {
          className: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          style: {},
        };
      default:
        return {
          className: "bg-gray-100 hover:bg-gray-200 text-gray-700",
          style: {},
        };
    }
  };

  const variantConfig = getVariantStyles();
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantConfig.className} ${sizeStyles[size]} ${widthStyles} ${className}`}
      style={variantConfig.style}
      onMouseEnter={(e) => {
        if (variant === "primary" && !disabled && !loading) {
          e.currentTarget.style.backgroundColor = "#C41E1E";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "primary" && !disabled && !loading) {
          e.currentTarget.style.backgroundColor = "#E31E24";
        }
      }}
    >
      {loading ? (
        <>
          <svg
            className="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={size === "xs" ? 14 : size === "sm" ? 16 : 18} />}
          {children}
        </>
      )}
    </button>
  );
};
export default Button;
