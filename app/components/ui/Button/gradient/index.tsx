import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const GradientButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: GradientButtonProps) => {
  return (
    <button 
      className={`px-4 py-2 rounded font-medium text-white
        bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
        hover:from-purple-600 hover:via-pink-600 hover:to-red-600
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

export default GradientButton; 