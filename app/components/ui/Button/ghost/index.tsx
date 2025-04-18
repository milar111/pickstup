import React from 'react';

interface GhostButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const GhostButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: GhostButtonProps) => {
  return (
    <button 
      className={`px-4 py-2 rounded font-medium bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default GhostButton; 