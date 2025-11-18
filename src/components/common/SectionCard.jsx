import React from "react";

const SectionCard = ({
  icon: Icon,
  title,
  description,
  iconBgColor = "bg-red-100",
  iconColor = "text-red-600",
  children,
}) => {
  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6">
        {Icon && (
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}
            >
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              {description && (
                <p className="text-sm text-gray-600 mt-0.5">{description}</p>
              )}
            </div>
          </div>
        )}

        {/* Title spacing fix */}
        {!Icon && title && (
          <div className="mb-4">
            {" "}
            {/* << ONLY CHANGE DONE */}
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default SectionCard;
