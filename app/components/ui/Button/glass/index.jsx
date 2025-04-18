import React from 'react';

const GlassButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button 
      className={`px-4 py-2 rounded font-medium
        bg-white/10 backdrop-blur-md border border-white/20
        text-white hover:bg-white/20
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

export default GlassButton; 