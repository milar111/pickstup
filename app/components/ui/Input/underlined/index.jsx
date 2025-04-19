import React from 'react';

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
}) => {
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
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full bg-transparent border-0 border-b-2 ${colorClasses.border} px-0 py-2 focus:outline-none ${colorClasses.focus} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
        id={id}
      />
    </div>
  );
};

export default UnderlinedInput; 