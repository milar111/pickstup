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
  // Inline styles that were previously in styles.css
  const defaultInputStyles = `
    .input-default {
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      width: 100%;
    }
    
    .input-default:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
    
    .input-default:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #f3f4f6;
    }
  `;

  return (
    <>
      <style>{defaultInputStyles}</style>
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input-default ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      />
    </>
  );
};

export default DefaultInput; 