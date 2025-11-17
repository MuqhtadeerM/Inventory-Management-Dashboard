import React from "react";
import { Info } from "lucide-react";

const InfoAlert = ({ title, items, variant = "info" }) => {
  const variants = {
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
    success: "bg-green-50 border-green-200",
  };

  return (
    <div className={`rounded-lg border ${variants[variant]} p-6`}>
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="mb-3 text-base font-semibold text-gray-900">
            {title}
          </h4>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoAlert;
