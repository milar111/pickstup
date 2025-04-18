import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const NeonButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: NeonButtonProps) => {
  return (
    <button 
      className={`px-4 py-2 rounded font-medium bg-transparent border-2 border-pink-500 text-pink-500 
        hover:bg-pink-500 hover:text-white transition-all duration-300
        shadow-[0_0_5px_#ff69b4,0_0_10px_#ff69b4,0_0_15px_#ff69b4]
        hover:shadow-[0_0_10px_#ff69b4,0_0_20px_#ff69b4,0_0_30px_#ff69b4]
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default NeonButton; 