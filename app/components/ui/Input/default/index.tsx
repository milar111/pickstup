import React from 'react';

interface DefaultInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: string;
}

const DefaultInput = ({
  placeholder = 'Enter text...',
  value,
  onChange,
  disabled = false,
  className = '',
  type = 'text'
}: DefaultInputProps) => {
  return (
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`px-3 py-2 border border-gray-300 rounded w-full ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
    />
  );
};

export default DefaultInput; 