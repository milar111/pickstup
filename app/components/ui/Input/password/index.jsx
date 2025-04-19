import React, { useState, useEffect } from 'react';

const PasswordInput = ({
  placeholder = 'Enter password...',
  value,
  onChange,
  disabled = false,
  className = '',
  id,
  label,
  initiallyVisible = false
}) => {
  const [showPassword, setShowPassword] = useState(initiallyVisible);
  const [inputValue, setInputValue] = useState(value || '');
  
  // Update internal state when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Prevent possible form submission
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  // Generate a unique ID if one is not provided
  const inputId = id || `password-input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor={inputId}>{label}</label>}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          className={`px-3 py-2 border border-gray-300 rounded-md w-full pr-10 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
          id={inputId}
        />
        <button 
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded p-1"
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
  );
};

export default PasswordInput; 