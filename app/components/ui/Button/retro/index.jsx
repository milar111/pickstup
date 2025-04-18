import React from 'react';

const RetroButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button 
      className={`px-4 py-2 font-medium
        bg-yellow-400 text-black border-4 border-black
        hover:bg-yellow-500 active:bg-yellow-600
        transform transition-all duration-100
        hover:translate-y-[-2px] active:translate-y-[2px]
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default RetroButton; 