import React from 'react';

interface StrengthMeterProps {
  strength: number;
  maxStrength?: number;
  showLabel?: boolean;
}

const StrengthMeter: React.FC<StrengthMeterProps> = ({
  strength,
  maxStrength = 5,
  showLabel = true,
}) => {
  // Inline styles that were previously in styles.css
  const strengthMeterStyles = `
    .strength-meter-container {
      margin-top: 8px;
      width: 100%;
    }
    
    .strength-meter-bar {
      height: 4px;
      background-color: #e2e8f0;
      border-radius: 2px;
      overflow: hidden;
    }
    
    .strength-meter-fill {
      height: 100%;
      transition: width 0.3s ease;
    }
    
    .strength-meter-label {
      margin-top: 4px;
      font-size: 0.75rem;
      color: #64748b;
    }
  `;

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
    <>
      <style>{strengthMeterStyles}</style>
      <div className="strength-meter-container">
        <div className="strength-meter-bar">
          <div 
            className={`strength-meter-fill ${getStrengthColor()}`} 
            style={{ width: `${(strength / maxStrength) * 100}%` }}
          ></div>
        </div>
        {showLabel && (
          <p className="strength-meter-label">
            {getStrengthText()}
          </p>
        )}
      </div>
    </>
  );
};

export default StrengthMeter; 