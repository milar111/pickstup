import React from 'react';
import { Layers, Layout, Navigation, AlertTriangle, Database, FileText, Image } from 'lucide-react';


export function getIconComponent(iconName?: string) {
  if (!iconName) return Layers;
  
  switch (iconName) {
    case 'Layers': return Layers;
    case 'Layout': return Layout;
    case 'Navigation': return Navigation;
    case 'AlertTriangle': return AlertTriangle;
    case 'Database': return Database;
    case 'FileText': return FileText;
    case 'Image': return Image;
    default: return Layers;
  }
} 
