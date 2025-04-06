import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export const dynamic = "force-static";
export const revalidate = false;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const componentName = searchParams.get('component');
    const variantName = searchParams.get('variant');
    
    if (!componentName || !variantName) {
      return NextResponse.json({ error: 'Component and variant parameters are required' }, { status: 400 });
    }
    
    // Get the component path
    const componentPath = path.join(process.cwd(), 'app', 'components', 'ui', componentName, variantName, 'index.tsx');
    
    if (!fs.existsSync(componentPath)) {
      return NextResponse.json({ error: `Component file not found: ${componentPath}` }, { status: 404 });
    }
    
    // Read the component file content
    const fileContent = fs.readFileSync(componentPath, 'utf8');
    
    // Extract style information using regex
    // This is a simplified approach - in production, you'd use a proper parser
    let styleClasses = '';
    
    if (componentName === 'Button') {
      // Extract Button className from the file
      const classNameMatch = fileContent.match(/className={\`([^`]*)\${className}\`}/);
      if (classNameMatch && classNameMatch[1]) {
        styleClasses = classNameMatch[1].trim();
      }
      
      // Create a fully independent button HTML
      const html = `
        <button 
          class="px-4 py-2 rounded font-medium ${styleClasses}"
          type="button"
        >
          ${capitalize(variantName)} Button
        </button>
      `;
      
      // Create a fully independent React component code
      const code = `import React from 'react';

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
      className={\`px-4 py-2 rounded font-medium ${styleClasses} \${className}\`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default ${capitalize(variantName)}Button;`;
      
      return NextResponse.json({ html, code });
    }
    
    // Check if we're dealing with an Input component
    if (componentName === 'Input') {
      if (variantName === 'default') {
        // Create fully independent input HTML
        const html = `
          <input 
            type="text"
            placeholder="Default input"
            class="px-3 py-2 border border-gray-300 rounded w-full"
          />
        `;
        
        // Create fully independent React component code
        const code = `import React from 'react';

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
        
        return NextResponse.json({ html, code });
      } else if (variantName === 'with-label') {
        // Create fully independent input with label HTML
        const html = `
          <div class="space-y-2">
            <label 
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              class="px-3 py-2 border border-gray-300 rounded w-full"
            />
          </div>
        `;
        
        // Create fully independent React component code
        const code = `import React from 'react';

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
        
        return NextResponse.json({ html, code });
      }
    }
    
    return NextResponse.json({ error: 'Unsupported component type' }, { status: 400 });
  } catch (error: any) {
    console.error('Error generating component preview:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate preview' }, { status: 500 });
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
} 