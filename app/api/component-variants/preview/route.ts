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
      // Extract styled component content - using a regex that works without the 's' flag
      const styleStartString = 'const';
      const styleEndString = '`;';
      const styleStartIndex = fileContent.indexOf(styleStartString);
      const styleEndIndex = fileContent.indexOf(styleEndString, styleStartIndex);
      
      let stylesContent = '';
      if (styleStartIndex !== -1 && styleEndIndex !== -1) {
        // Find the backtick after 'Styles ='
        const stylesDeclaration = fileContent.substring(styleStartIndex, styleEndIndex + styleEndString.length);
        const backtickIndex = stylesDeclaration.indexOf('`');
        
        if (backtickIndex !== -1) {
          const styleCSS = fileContent.substring(
            styleStartIndex + backtickIndex + 1, 
            styleEndIndex
          );
          stylesContent = `<style>${styleCSS}</style>`;
        }
      }
      
      // Generate preview HTML for each input variant
      if (variantName === 'default') {
        const html = `
          ${stylesContent}
          <input 
            type="text"
            placeholder="Default input"
            class="input-default"
          />
        `;
        return NextResponse.json({ html, code: fileContent });
      } 
      else if (variantName === 'with-label') {
        const html = `
          ${stylesContent}
          <div class="space-y-2">
            <label class="input-label" for="input-example">Example Label</label>
            <input
              id="input-example"
              type="text"
              placeholder="Labeled input"
              class="labeled-input"
            />
          </div>
        `;
        return NextResponse.json({ html, code: fileContent });
      }
      else if (variantName === 'password') {
        const html = `
          ${stylesContent}
          <div>
            <label class="input-label" for="password-example">Password</label>
            <div class="password-input-container">
              <input
                type="password"
                placeholder="Enter password..."
                class="password-input"
                id="password-example"
                value="password123"
              />
              <button 
                type="button"
                class="toggle-password-button"
                aria-label="Show password"
                onclick="
                  const input = document.getElementById('password-example');
                  const button = this;
                  if (input.type === 'password') {
                    input.type = 'text';
                    button.innerHTML = '<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><path d=\\'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24\\'></path><line x1=\\'1\\' y1=\\'1\\' x2=\\'23\\' y2=\\'23\\'></line></svg>';
                    button.setAttribute('aria-label', 'Hide password');
                  } else {
                    input.type = 'password';
                    button.innerHTML = '<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><path d=\\'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\\'></path><circle cx=\\'12\\' cy=\\'12\\' r=\\'3\\'></circle></svg>';
                    button.setAttribute('aria-label', 'Show password');
                  }
                "
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
        `;
        return NextResponse.json({ html, code: fileContent });
      }
      else if (variantName === 'search') {
        const html = `
          ${stylesContent}
          <div class="search-input-container">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search..."
              class="search-input"
              oninput="this.nextElementSibling.classList.toggle('visible', !!this.value)"
            />
            <button
              type="button"
              class="clear-button"
              aria-label="Clear search"
              onclick="this.previousElementSibling.value = ''; this.classList.remove('visible'); this.previousElementSibling.focus();"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        `;
        return NextResponse.json({ html, code: fileContent });
      }
      else if (variantName === 'with-icon') {
        const html = `
          ${stylesContent}
          <div>
            <label class="label" for="icon-example">With Icon</label>
            <div class="icon-input-container">
              <span class="left-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Input with icon"
                class="icon-input with-left-icon"
                id="icon-example"
              />
            </div>
          </div>
        `;
        return NextResponse.json({ html, code: fileContent });
      }
      else if (variantName === 'with-validation') {
        // Update: Show a default state instead of an error state
        const html = `
          ${stylesContent}
          <div>
            <label class="validation-label" for="validation-example">Validation Input</label>
            <div class="validation-input-container">
              <input
                type="text"
                placeholder="Enter text..."
                class="validation-input"
                id="validation-example"
              />
            </div>
            <p class="text-sm text-gray-500 mt-1">
              Click in and out of the field without entering text to see validation
            </p>
          </div>
        `;
        return NextResponse.json({ html, code: fileContent });
      }
      else if (variantName === 'underlined') {
        const html = `
          ${stylesContent}
          <div class="underlined-input-container">
            <label class="underlined-label" for="underlined-example">Underlined Input</label>
            <input
              type="text"
              placeholder="Enter text..."
              class="underlined-input primary"
              id="underlined-example"
            />
          </div>
        `;
        return NextResponse.json({ html, code: fileContent });
      }
      else if (variantName === 'rounded') {
        const html = `
          ${stylesContent}
          <div class="rounded-input-container">
            <label class="rounded-label" for="rounded-example">Rounded Input</label>
      <input
              type="text"
              placeholder="Enter text..."
              class="rounded-input medium"
              id="rounded-example"
      />
    </div>
        `;
        return NextResponse.json({ html, code: fileContent });
      }
      
      // Default fallback for input components
      const html = `
        <input 
          type="text"
          placeholder="${capitalize(variantName)} input"
          class="px-3 py-2 border border-gray-300 rounded w-full"
        />
      `;
        
      return NextResponse.json({ html, code: fileContent });
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