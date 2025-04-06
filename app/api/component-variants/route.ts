import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const componentName = searchParams.get('component');
    const variantName = searchParams.get('variant');
    
    if (!componentName || !variantName) {
      return NextResponse.json({ error: 'Component and variant parameters are required' }, { status: 400 });
    }
    
    const filePath = path.join(process.cwd(), 'app', 'components', 'ui', componentName, variantName, 'index.tsx');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: `Component file not found: ${filePath}` }, { status: 404 });
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    let independentCode = '';
    
    if (componentName === 'Button') {
      independentCode = `import React from 'react';

interface ${capitalize(variantName)}ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ${capitalize(variantName)}Button = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: ${capitalize(variantName)}ButtonProps) => {
  return (
    <button 
      className={\`px-4 py-2 rounded font-medium \${className}\`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default ${capitalize(variantName)}Button;`;
    } else if (componentName === 'Input') {
      if (variantName === 'default') {
        independentCode = `import React from 'react';

interface DefaultInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: string;
}

const DefaultInput = ({
  placeholder = 'Enter text...',
  value,
  onChange,
  disabled = false,
  className = '',
  type = 'text'
}: DefaultInputProps) => {
  return (
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={\`px-3 py-2 border border-gray-300 rounded w-full \${disabled ? 'opacity-60 cursor-not-allowed' : ''} \${className}\`}
    />
  );
};

export default DefaultInput;`;
      } else if (variantName === 'with-label') {
        independentCode = `import React from 'react';

interface InputWithLabelProps {
  label: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: string;
}

const InputWithLabel = ({
  label,
  id,
  placeholder = 'Enter text...',
  value,
  onChange,
  disabled = false,
  className = '',
  type = 'text'
}: InputWithLabelProps) => {
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
        className={\`px-3 py-2 border border-gray-300 rounded w-full \${disabled ? 'opacity-60 cursor-not-allowed' : ''} \${className}\`}
      />
    </div>
  );
};

export default InputWithLabel;`;
      }
    } else {
      independentCode = fileContent;
    }
    
    return NextResponse.json({ 
      code: fileContent,
      independentCode: independentCode
    });
  } catch (error) {
    console.error('Error reading component file:', error);
    return NextResponse.json({ error: 'Failed to read component file' }, { status: 500 });
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
} 