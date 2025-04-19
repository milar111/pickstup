import React from 'react';

const StrengthMeter = ({
  strength,
  maxStrength = 5,
  showLabel = true,
}) => {
  const getStrengthColor = () => {
    const percentage = strength / maxStrength;
    if (percentage <= 0.2) return 'bg-red-500';
    if (percentage <= 0.6) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    const percentage = strength / maxStrength;
    if (percentage <= 0.2) return "Weak password";
    if (percentage <= 0.6) return "Medium strength password";
    return "Strong password";
  };

  return (
    <div className="mt-2 w-full">
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getStrengthColor()} transition-all duration-300 ease-in-out`} 
          style={{ width: `${(strength / maxStrength) * 100}%` }}
        ></div>
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-gray-500">
          {getStrengthText()}
        </p>
      )}
    </div>
  );
};

export default StrengthMeter; 