import React, { useState, useEffect } from 'react';

const ValidationInput = ({
  label,
  id,
  placeholder = 'Enter text...',
  value = '',
  onChange,
  disabled = false,
  className = '',
  type = 'text',
  validationState = 'default',
  validationMessage = '',
  required = false
}) => {
  const [touched, setTouched] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [internalValidationState, setInternalValidationState] = useState(validationState);
  const [internalValidationMessage, setInternalValidationMessage] = useState(validationMessage);

  // Update internal state when props change
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (!touched) {
      setInternalValidationState('default');
      setInternalValidationMessage('');
    } else {
      if (required && internalValue.trim() === '') {
        setInternalValidationState('error');
        setInternalValidationMessage('This field is required');
      } else {
        setInternalValidationState(validationState);
        setInternalValidationMessage(validationMessage);
      }
    }
  }, [touched, internalValue, required, validationState, validationMessage]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const getValidationIcon = () => {
    switch (internalValidationState) {
      case 'success':
        return (
          <svg className="absolute right-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'error':
        return (
          <svg className="absolute right-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
      case 'warning':
        return (
          <svg className="absolute right-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  // Only show validation state when touched and there's a non-default validation state
  const showValidation = touched && internalValidationState !== 'default';
  
  const getValidationClasses = () => {
    if (!showValidation) return '';
    
    if (internalValidationState === 'success') return 'border-green-500';
    if (internalValidationState === 'error') return 'border-red-500';
    if (internalValidationState === 'warning') return 'border-yellow-500';
    return '';
  };

  const getMessageClasses = () => {
    if (internalValidationState === 'success') return 'text-green-500';
    if (internalValidationState === 'error') return 'text-red-500';
    if (internalValidationState === 'warning') return 'text-yellow-500';
    return '';
  };

  return (
    <div>
      {label && (
        <label 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" 
          htmlFor={id}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`px-3 py-2 border ${getValidationClasses() || 'border-gray-300'} rounded-md w-full pr-10 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
          id={id}
          required={required}
        />
        {showValidation && getValidationIcon()}
      </div>
      {showValidation && internalValidationMessage && (
        <p className={`text-xs mt-1 ${getMessageClasses()}`}>
          {internalValidationMessage}
        </p>
      )}
    </div>
  );
};

export default ValidationInput; 