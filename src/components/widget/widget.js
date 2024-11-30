import React from "react";

const Widget = ({ title, value, icon, color }) => {
  // Construct dynamic class names
  const iconClass = `h-12 w-12 rounded-xl bg-${color}-100 text-${color}-500`;
  
  return (
    <div className="flex flex-row bg-white shadow-md rounded-xl px-5 py-3 border-2 border-gray-100">
      <div className={`flex items-center justify-center flex-shrink-0 ${iconClass}`}>
        <i className={icon}></i>
      </div>
      <div className="flex flex-col flex-grow ml-4">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="font-bold text-lg">{value}</div>
      </div>
    </div>
  );
};

export default Widget;
