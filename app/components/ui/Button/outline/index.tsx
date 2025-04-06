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
      className={`px-4 py-2 rounded font-medium border border-blue-600 text-blue-600 hover:bg-blue-50 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default OutlineButton; 