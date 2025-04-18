import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface Component {
  name: string;
  description: string;
}

export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  previewCode?: string; 
  code?: string; 
  codePath?: string;
}

export interface ComponentGroup {
  title: string;
  description: string;
  icon?: string; 
  color?: string; 
  components: Component[];
  variants?: Record<string, ComponentVariant[]>; 
  renderPreview?: Record<string, Record<string, (variant: ComponentVariant) => React.ReactNode>>; 
  componentCode?: Record<string, (variant: string) => string>; 
  props?: Record<string, Record<string, {type: string, default: any, description: string}[]>>; 
}

export type ViewMode = 'grid' | 'list'; 
