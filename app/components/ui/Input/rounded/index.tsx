import React from 'react';

interface RoundedInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  type?: string;
  label?: string;
  size?: 'small' | 'medium' | 'large';
}

const RoundedInput = ({
  placeholder = 'Enter text...',
  value,
  onChange,
  disabled = false,
  className = '',
  id,
  type = 'text',
  label,
  size = 'medium'
}: RoundedInputProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-1 px-3 text-sm';
      case 'large':
        return 'py-3 px-5 text-lg';
      default:
        return 'py-2 px-4';
    }
  };

  const sizeClasses = getSizeClasses();

  const roundedInputStyles = `
    .rounded-input-container {
      width: 100%;
    }
    
    .rounded-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    
    .rounded-input {
      border: 1px solid #d1d5db;
      border-radius: 9999px;
      width: 100%;
      transition: all 0.2s ease;
    }
    
    .rounded-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
    
    .rounded-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #f3f4f6;
    }
    
    .rounded-input.small {
      padding: 0.25rem 0.75rem;
      font-size: 0.875rem;
    }
    
    .rounded-input.medium {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }
    
    .rounded-input.large {
      padding: 0.75rem 1.25rem;
      font-size: 1.125rem;
    }
  `;

  return (
    <>
      <style>{roundedInputStyles}</style>
      <div className="rounded-input-container">
        {label && <label className="rounded-label" htmlFor={id}>{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`rounded-input ${size} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
          id={id}
        />
      </div>
    </>
  );
};

export default RoundedInput; 