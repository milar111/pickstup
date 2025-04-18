import React from 'react';

interface RetroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const RetroButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: RetroButtonProps) => {
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