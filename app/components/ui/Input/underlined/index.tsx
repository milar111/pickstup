import React from 'react';

interface UnderlinedInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  type?: string;
  label?: string;
  color?: 'primary' | 'success' | 'error' | 'warning' | 'default';
}

const UnderlinedInput = ({
  placeholder = 'Enter text...',
  value,
  onChange,
  disabled = false,
  className = '',
  id,
  type = 'text',
  label,
  color = 'primary'
}: UnderlinedInputProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return {
          border: 'border-b-blue-500',
          focus: 'focus:border-b-blue-600'
        };
      case 'success':
        return {
          border: 'border-b-green-500',
          focus: 'focus:border-b-green-600'
        };
      case 'error':
        return {
          border: 'border-b-red-500',
          focus: 'focus:border-b-red-600'
        };
      case 'warning':
        return {
          border: 'border-b-yellow-500',
          focus: 'focus:border-b-yellow-600'
        };
      default:
        return {
          border: 'border-b-gray-300',
          focus: 'focus:border-b-gray-600'
        };
    }
  };

  const colorClasses = getColorClasses();

  const underlinedInputStyles = `
    .underlined-input-container {
      width: 100%;
    }
    
    .underlined-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    
    .underlined-input {
      padding: 0.5rem 0;
      border: none;
      border-bottom: 2px solid #d1d5db;
      width: 100%;
      background-color: transparent;
      transition: border-color 0.2s ease;
    }
    
    .underlined-input:focus {
      outline: none;
      border-bottom: 2px solid #3b82f6;
    }
    
    .underlined-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      border-bottom: 2px dashed #d1d5db;
    }
    
    .underlined-input.primary {
      border-bottom-color: #3b82f6;
    }
    
    .underlined-input.success {
      border-bottom-color: #10b981;
    }
    
    .underlined-input.error {
      border-bottom-color: #ef4444;
    }
    
    .underlined-input.warning {
      border-bottom-color: #f59e0b;
    }
    
    .underlined-input.default {
      border-bottom-color: #d1d5db;
    }
  `;

  return (
    <>
      <style>{underlinedInputStyles}</style>
      <div className="underlined-input-container">
        {label && <label className="underlined-label" htmlFor={id}>{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`underlined-input ${color} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
          id={id}
        />
      </div>
    </>
  );
};

export default UnderlinedInput; 