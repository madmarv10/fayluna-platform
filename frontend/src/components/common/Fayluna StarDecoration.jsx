import React from "react";

const StarDecoration = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 text-purple-400 ${className}`}
    >
      <path d="M12 2l2.928 6.005 6.635.964-4.8 4.678 1.133 6.607L12 16.897l-5.896 3.357 1.133-6.607-4.8-4.678 6.635-.964L12 2z" />
    </svg>
  );
};

export default StarDecoration;

