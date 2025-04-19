import React, { useRef } from 'react';

interface InputWithLabelProps {
  label: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: string;
}

const InputWithLabel = ({
  label,
  id,
  placeholder = 'Enter text...',
  value,
  onChange,
  disabled = false,
  className = '',
  type = 'text'
}: InputWithLabelProps) => {
  // This component doesn't have a separate CSS file, but we can add any styles here if needed
  const inputRef = useRef<HTMLInputElement>(null);
  
  const labeledInputStyles = `
    .labeled-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      width: 100%;
    }
    
    .labeled-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
    
    .labeled-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #f3f4f6;
    }
    
    .input-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }
    
    .dark .input-label {
      color: #d1d5db;
    }
  `;

  const handleLabelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
      
      // Ensure the input receives focus
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  return (
    <>
      <style>{labeledInputStyles}</style>
      <div className="space-y-2">
        <label 
          htmlFor={id}
          className="input-label"
          onClick={handleLabelClick}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`labeled-input ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
        />
      </div>
    </>
  );
};

export default InputWithLabel; 