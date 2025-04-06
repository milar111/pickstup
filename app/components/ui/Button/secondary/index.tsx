import React from 'react';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const SecondaryButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: SecondaryButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded font-medium bg-gray-600 hover:bg-gray-700 text-white ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default SecondaryButton; 