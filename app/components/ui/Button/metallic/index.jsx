import React from 'react';

const MetallicButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button 
      className={`px-4 py-2 rounded font-medium
        bg-gradient-to-b from-gray-300 to-gray-400
        text-gray-800 border border-gray-500
        hover:from-gray-400 hover:to-gray-500
        active:from-gray-500 active:to-gray-600
        shadow-md hover:shadow-lg
        transition-all duration-200
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default MetallicButton; 