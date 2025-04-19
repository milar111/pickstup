import React from 'react';

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
}) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" 
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full border border-gray-300 rounded-md ${leftIcon ? 'pl-10' : 'pl-3'} ${rightIcon ? 'pr-10' : 'pr-3'} py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : ''} ${className}`}
          id={id}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithIconInput; 