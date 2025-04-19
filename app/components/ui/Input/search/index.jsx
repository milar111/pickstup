import React, { useState } from 'react';

const SearchInput = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSearch,
  disabled = false,
  className = '',
  id
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleClear = () => {
    setInputValue('');
    if (onChange) {
      const syntheticEvent = {
        target: { value: '' }
      };
      onChange(syntheticEvent);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : ''} ${className}`}
        id={id}
      />
      {inputValue && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          onClick={handleClear}
          disabled={disabled}
          aria-label="Clear search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput; 