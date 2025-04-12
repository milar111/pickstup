import React from 'react';

const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button 
      className={`px-4 py-2 rounded font-medium bg-blue-600 hover:bg-blue-700 text-white ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default PrimaryButton; 