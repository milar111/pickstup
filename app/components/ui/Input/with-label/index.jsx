import React from 'react';

const InputWithLabel = ({
  label,
  id,
  placeholder = 'Enter text...',
  value,
  onChange,
  disabled = false,
  className = '',
  type = 'text'
}) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`px-3 py-2 border border-gray-300 rounded w-full ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      />
    </div>
  );
};

export default InputWithLabel; 