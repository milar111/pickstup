import React from 'react';

interface FuturisticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const FuturisticButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: FuturisticButtonProps) => {
  return (
    <button 
      className={`px-4 py-2 font-medium
        bg-gray-900 text-white
        hover:bg-gray-800
        border border-gray-700
        hover:border-gray-600
        shadow-[0_0_10px_rgba(0,0,0,0.3)]
        hover:shadow-[0_0_15px_rgba(0,0,0,0.4)]
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

export default FuturisticButton; 