export interface Component {
  name: string;
  description: string;
}

export interface ComponentGroup {
  title: string;
  description: string;
  components: Component[];
}

export type ViewMode = 'grid' | 'list'; 