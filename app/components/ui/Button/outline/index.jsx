import React from 'react';

const OutlineButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button 
      className={`px-4 py-2 rounded font-medium bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default OutlineButton; 