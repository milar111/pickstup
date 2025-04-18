import React from 'react';
import { ComponentGroup, ComponentVariant } from './types';

export const componentGroups: ComponentGroup[] = [
  {
    title: 'Basic Components',
    description: 'Essential UI components for building your interface',
    icon: 'Layers',
    color: 'blue',
    components: [
      { name: 'Button', description: 'Interactive button elements' },
      { name: 'Input', description: 'Text input fields' },
    ],
    variants: {
      'Button': [
        { id: 'primary', name: 'Primary', description: 'Main call-to-action button', codePath: 'components/ui/Button/primary' },
        { id: 'secondary', name: 'Secondary', description: 'Alternative action button', codePath: 'components/ui/Button/secondary' },
        { id: 'outline', name: 'Outline', description: 'Button with border only', codePath: 'components/ui/Button/outline' },
        { id: 'ghost', name: 'Ghost', description: 'Subtle, transparent button for less prominent actions', codePath: 'components/ui/Button/ghost' },
        { id: 'neon', name: 'Neon', description: 'Glowing button with vibrant colors', codePath: 'components/ui/Button/neon' },
        { id: 'gradient', name: 'Gradient', description: 'Button with smooth color transitions', codePath: 'components/ui/Button/gradient' },
        { id: 'glass', name: 'Glass', description: 'Transparent button with blur effect', codePath: 'components/ui/Button/glass' },
        { id: 'metallic', name: 'Metallic', description: 'Button with metallic shine effect', codePath: 'components/ui/Button/metallic' },
        { id: 'glow', name: 'Glow', description: 'Button with soft light effect', codePath: 'components/ui/Button/glow' },
        { id: 'cyberpunk', name: 'Cyberpunk', description: 'Futuristic neon grid style', codePath: 'components/ui/Button/cyberpunk' },
        { id: 'nature', name: 'Nature', description: 'Organic and natural style button', codePath: 'components/ui/Button/nature' },
        { id: 'futuristic', name: 'Futuristic', description: 'Modern and sleek button design', codePath: 'components/ui/Button/futuristic' }
      ],
      'Input': [
        { id: 'default', name: 'Default', description: 'Standard input field', codePath: 'components/ui/Input/default' },
        { id: 'with-label', name: 'With Label', description: 'Input with a label', codePath: 'components/ui/Input/with-label' }
      ]
    }
  }
];

export const categories = [
  'All',
  ...new Set(componentGroups.map(group => group.title.split(' ')[0]))
]; 
