export interface Component {
  name: string;
  description: string;
}

export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  codePath?: string; 
  previewCode?: string;
  code?: string;
}

export interface ComponentGroup {
  title: string;
  description: string;
  icon?: string;
  color?: string;
  components: Component[];
  variants?: Record<string, ComponentVariant[]>;
}

export type ViewMode = 'grid' | 'list'; 