const codeCache: Record<string, string> = {};
const htmlCache: Record<string, string> = {};

export async function readComponentFile(componentName: string, variantName: string): Promise<string> {
  const cacheKey = `${componentName}:${variantName}:code`;
  
  if (codeCache[cacheKey]) {
    return codeCache[cacheKey];
  }
  
  try {
    const previewResponse = await fetch(`/api/component-variants/preview?component=${componentName}&variant=${variantName}`);
    
    if (previewResponse.ok) {
      const data = await previewResponse.json();
      if (data.code) {
        codeCache[cacheKey] = data.code;
        return data.code;
      }
    }
    
    const response = await fetch(`/api/component-variants?component=${componentName}&variant=${variantName}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch component code: ${response.statusText}`);
    }
    
    const data = await response.json();
    const content = data.independentCode || data.code || '';
    
    codeCache[cacheKey] = content;
    
    return content;
  } catch (error) {
    console.error(`Error reading component file for ${componentName}/${variantName}:`, error);
    return '';
  }
}

export async function getComponentPreviewHTML(componentName: string, variantName: string): Promise<string> {
  const cacheKey = `${componentName}:${variantName}:html`;
  
  if (htmlCache[cacheKey]) {
    return htmlCache[cacheKey];
  }
  
  try {
    const response = await fetch(`/api/component-variants/preview?component=${componentName}&variant=${variantName}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get component preview: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.html) {
      htmlCache[cacheKey] = data.html;
      return data.html;
    }
    
    return '';
  } catch (error) {
    console.error(`Error getting preview HTML for ${componentName}/${variantName}:`, error);
    return '';
  }
} 