import React from "react";

const DashboardCard = ({ title, value, icon: Icon, bgColor, iconColor }) => {
  return (
    <div className="p-6 transition-shadow bg-white border-t-4 border-red-500 rounded-lg shadow-md hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-2 text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
