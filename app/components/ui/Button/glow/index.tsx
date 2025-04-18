import React from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const GlowButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: GlowButtonProps) => {
  return (
    <button 
      className={`px-4 py-2 rounded-full font-medium
        bg-blue-500 text-white
        hover:bg-blue-600
        shadow-[0_0_15px_rgba(59,130,246,0.5)]
        hover:shadow-[0_0_20px_rgba(59,130,246,0.7)]
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

export default GlowButton; 