import React from 'react';

const CyberpunkButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button 
      className={`px-4 py-2 font-medium
        bg-black text-cyan-400
        border-2 border-cyan-400
        hover:bg-cyan-400 hover:text-black
        hover:shadow-[0_0_10px_#00ffff]
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

export default CyberpunkButton; 