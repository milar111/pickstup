import React, { useState, useEffect } from 'react';

interface PasswordInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  label?: string;
  initiallyVisible?: boolean;
}

const PasswordInput = ({
  placeholder = 'Enter password...',
  value,
  onChange,
  disabled = false,
  className = '',
  id,
  label,
  initiallyVisible = false
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(initiallyVisible);
  const [inputValue, setInputValue] = useState(value || '');
  
  // Update internal state when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent possible form submission
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const passwordInputStyles = `
    .password-input-container {
      position: relative;
      width: 100%;
    }
    
    .password-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      width: 100%;
      padding-right: 2.5rem;
    }
    
    .password-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
    
    .password-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #f3f4f6;
    }
    
    .toggle-password-button {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      padding: 0.35rem;
      border-radius: 0.25rem;
    }
    
    .toggle-password-button:hover {
      color: #4b5563;
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    .toggle-password-button:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }
    
    .toggle-password-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .input-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }
  `;

  // Generate a unique ID if one is not provided
  const inputId = id || `password-input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <>
      <style>{passwordInputStyles}</style>
      <div>
        {label && <label className="input-label" htmlFor={inputId}>{label}</label>}
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            disabled={disabled}
            className={`password-input ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
            id={inputId}
          />
          <button 
            type="button"
            className="toggle-password-button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={0}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordInput; 