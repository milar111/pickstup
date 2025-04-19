import React, { useState, useEffect } from 'react';

type ValidationState = 'default' | 'success' | 'error' | 'warning';

interface ValidationInputProps {
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: string;
  validationState?: ValidationState;
  validationMessage?: string;
  required?: boolean;
  initiallyValidated?: boolean;
}

const ValidationInput = ({
  label,
  id,
  placeholder = 'Enter text...',
  value = '',
  onChange,
  disabled = false,
  className = '',
  type = 'text',
  validationState: externalValidationState = 'default',
  validationMessage: externalValidationMessage = '',
  required = false,
  initiallyValidated = false
}: ValidationInputProps) => {
  const [touched, setTouched] = useState(initiallyValidated);
  const [internalValue, setInternalValue] = useState(value);
  const [internalValidationState, setInternalValidationState] = useState<ValidationState>('default');
  const [internalValidationMessage, setInternalValidationMessage] = useState('');

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
      } else if (externalValidationState !== 'default') {
        setInternalValidationState(externalValidationState);
        setInternalValidationMessage(externalValidationMessage);
      } else {
        setInternalValidationState('default');
        setInternalValidationMessage('');
      }
    }
  }, [touched, internalValue, required, externalValidationState, externalValidationMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const validationStyles = `
    .validation-input-container {
      position: relative;
      width: 100%;
    }
    
    .validation-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    
    .validation-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      width: 100%;
      padding-right: 2.5rem;
    }
    
    .validation-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
    
    .validation-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #f3f4f6;
    }
    
    .validation-input.success {
      border-color: #10b981;
    }
    
    .validation-input.success:focus {
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
    }
    
    .validation-input.error {
      border-color: #ef4444;
    }
    
    .validation-input.error:focus {
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
    }
    
    .validation-input.warning {
      border-color: #f59e0b;
    }
    
    .validation-input.warning:focus {
      box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.1);
    }
    
    .validation-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
    }
    
    .validation-message {
      font-size: 0.75rem;
      margin-top: 0.5rem;
    }
    
    .validation-message.success {
      color: #10b981;
    }
    
    .validation-message.error {
      color: #ef4444;
    }
    
    .validation-message.warning {
      color: #f59e0b;
    }
  `;

  const getValidationIcon = () => {
    switch (internalValidationState) {
      case 'success':
        return (
          <svg className="validation-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'error':
        return (
          <svg className="validation-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
      case 'warning':
        return (
          <svg className="validation-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  const showValidation = touched && internalValidationState !== 'default';

  return (
    <>
      <style>{validationStyles}</style>
      <div>
        {label && <label className="validation-label" htmlFor={id}>{label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>}
        <div className="validation-input-container">
          <input
            type={type}
            placeholder={placeholder}
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={() => {/* Keep focus handler empty, just add to ensure valid interaction */}}
            disabled={disabled}
            className={`validation-input ${showValidation ? internalValidationState : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
            id={id}
            required={required}
          />
          {showValidation && getValidationIcon()}
        </div>
        {showValidation && internalValidationMessage && (
          <p className={`validation-message ${internalValidationState}`}>
            {internalValidationMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default ValidationInput; 