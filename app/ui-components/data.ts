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
        { id: 'outline', name: 'Outline', description: 'Button with border only', codePath: 'components/ui/Button/outline' }
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
