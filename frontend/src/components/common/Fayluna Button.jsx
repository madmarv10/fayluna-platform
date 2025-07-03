import React from "react";

const Button = ({ type = "button", className = "", children, ...props }) => {
  return (
    <button
      type={type}
      className={`bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
