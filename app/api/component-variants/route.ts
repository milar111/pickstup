import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type CodeFormat = 'typescript' | 'jsx' | 'css';

export const dynamic = "force-static";
export const revalidate = false;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const component = searchParams.get('component');
  const variant = searchParams.get('variant');
  const format = (searchParams.get('format') || 'typescript') as CodeFormat;

  if (!component || !variant) {
    return NextResponse.json(
      { error: 'Component and variant are required parameters' },
      { status: 400 }
    );
  }

  try {
    const baseDir = path.join(process.cwd(), 'app', 'components', 'ui', component, variant);
    
    const files = fs.readdirSync(baseDir);
    let filePath = '';
    
    switch (format) {
      case 'typescript':
        const tsxFile = files.find(file => file.endsWith('.tsx'));
        if (tsxFile) {
          filePath = path.join(baseDir, tsxFile);
        }
        break;
      case 'jsx':
        const jsxFile = files.find(file => file.endsWith('.jsx'));
        if (jsxFile) {
          filePath = path.join(baseDir, jsxFile);
        }
        break;
      case 'css':
        const cssFile = files.find(file => file.endsWith('.css'));
        if (cssFile) {
          filePath = path.join(baseDir, cssFile);
        }
        break;
      default:
        return NextResponse.json(
          { error: `Invalid format: ${format}` },
          { status: 400 }
        );
    }

    if (filePath && fs.existsSync(filePath)) {
      const code = fs.readFileSync(filePath, 'utf8');
      return NextResponse.json({ code });
    }
    
    let backupFilePath = '';
    
    switch (format) {
      case 'typescript':
        backupFilePath = path.join(baseDir, 'typescript', 'index.tsx');
        break;
      case 'jsx':
        backupFilePath = path.join(baseDir, 'javascript', 'index.jsx');
        break;
      case 'css':
        backupFilePath = path.join(baseDir, 'css', 'styles.css');
        break;
    }
    
    if (backupFilePath && fs.existsSync(backupFilePath)) {
      const code = fs.readFileSync(backupFilePath, 'utf8');
      return NextResponse.json({ code });
    }

    return NextResponse.json(
      { 
        error: `No ${format} file found for ${component}/${variant}`,
        code: getFallbackCode(component, variant, format)  
      },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error serving component code:', error);
    return NextResponse.json(
      { error: 'Error serving component code' },
      { status: 500 }
    );
  }
}

function getFallbackCode(component: string, variant: string, format: CodeFormat): string {
  switch (format) {
    case 'typescript':
      return `import React from 'react';

interface ${component}Props {
  children: React.ReactNode;
  className?: string;
  // Add other props as needed
}

const ${component} = ({
  children,
  className = '',
  ...props
}: ${component}Props) => {
  // Component implementation
  return (
    <button 
      className={\`default-${component.toLowerCase()}-${variant} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ${component};`;

    case 'jsx':
      return `import React from 'react';

const ${component} = ({
  children,
  className = '',
  ...props
}) => {
  // Component implementation
  return (
    <button 
      className={\`default-${component.toLowerCase()}-${variant} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ${component};`;

    case 'css':
      return `.${component.toLowerCase()}-${variant} {
  /* Default styles */
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
}`;

    default:
      return `// No sample code available for ${format} format`;
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
} 