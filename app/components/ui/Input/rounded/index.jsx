import React from 'react';

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
}) => {
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

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor={id}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border border-gray-300 rounded-full ${sizeClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : ''} ${className}`}
        id={id}
      />
    </div>
  );
};

export default RoundedInput; 