import React, { ReactNode } from 'react';

interface WithIconInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: string;
  label?: string;
}

const WithIconInput = ({
  placeholder = 'Enter text...',
  value,
  onChange,
  disabled = false,
  className = '',
  id,
  leftIcon,
  rightIcon,
  type = 'text',
  label
}: WithIconInputProps) => {
  const withIconInputStyles = `
    .icon-input-container {
      position: relative;
      width: 100%;
    }
    
    .label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    
    .icon-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      width: 100%;
      transition: border-color 0.2s ease;
    }
    
    .icon-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
    
    .icon-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #f3f4f6;
    }
    
    .icon-input.with-left-icon {
      padding-left: 2.5rem;
    }
    
    .icon-input.with-right-icon {
      padding-right: 2.5rem;
    }
    
    .left-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
      display: flex;
      align-items: center;
    }
    
    .right-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
      display: flex;
      align-items: center;
    }
  `;

  return (
    <>
      <style>{withIconInputStyles}</style>
      <div>
        {label && <label className="label" htmlFor={id}>{label}</label>}
        <div className="icon-input-container">
          {leftIcon && <span className="left-icon">{leftIcon}</span>}
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`icon-input ${leftIcon ? 'with-left-icon' : ''} ${rightIcon ? 'with-right-icon' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
            id={id}
          />
          {rightIcon && <span className="right-icon">{rightIcon}</span>}
        </div>
      </div>
    </>
  );
};

export default WithIconInput; 