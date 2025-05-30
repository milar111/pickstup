import React from 'react';

interface OutlineButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const OutlineButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: OutlineButtonProps) => {
  return (
    <button 
      className={`px-4 py-2 rounded font-medium
        bg-transparent border-2 border-blue-500 text-blue-500
        hover:bg-blue-500 hover:text-white
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

export default OutlineButton; 