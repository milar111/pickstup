import React, { useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const SearchInput = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSearch,
  disabled = false,
  className = '',
  id
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue);
    }
  };

  const searchInputStyles = `
    .search-input-container {
      position: relative;
      width: 100%;
    }
    
    .search-input {
      padding: 0.5rem 0.75rem 0.5rem 2.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      width: 100%;
      transition: border-color 0.2s ease;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
    
    .search-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #f3f4f6;
    }
    
    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
      width: 1rem;
      height: 1rem;
    }
    
    .clear-button {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      padding: 0;
      visibility: hidden;
    }
    
    .clear-button.visible {
      visibility: visible;
    }
    
    .clear-button:hover {
      color: #4b5563;
    }
    
    .clear-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;

  return (
    <>
      <style>{searchInputStyles}</style>
      <div className="search-input-container">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`search-input ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
          id={id}
        />
        <button
          type="button"
          className={`clear-button ${inputValue ? 'visible' : ''}`}
          onClick={handleClear}
          disabled={disabled}
          aria-label="Clear search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </>
  );
};

export default SearchInput; 