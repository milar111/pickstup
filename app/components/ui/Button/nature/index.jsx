import React from 'react';

const NatureButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button 
      className={`px-4 py-2 rounded-full font-medium
        bg-green-600 text-white
        hover:bg-green-700
        border-2 border-green-800
        shadow-md hover:shadow-lg
        transition-all duration-300
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default NatureButton; 