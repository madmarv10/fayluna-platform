// LoadingSpinner.jsx
import React from 'react';

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-4',
  lg: 'h-8 w-8 border-8',
};

const colorMap = {
  red: 'border-red-500',
  blue: 'border-blue-500',
  gray: 'border-gray-300',
};

const LoadingSpinner = ({ size = 'md', color = 'gray' }) => {
  const sizeClass = sizeMap[size] || sizeMap.md;
  const colorClass = colorMap[color] || colorMap.gray;

  return (
    <div
      className={`animate-spin ${sizeClass} ${colorClass} rounded-full border-t-transparent`}
    />
  );
};

export default LoadingSpinner;
