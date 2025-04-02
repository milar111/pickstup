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
      { name: 'Checkbox', description: 'Selection controls' },
      { name: 'Radio', description: 'Single selection controls' },
    ],
    variants: {
      'Button': [
        { id: 'primary', name: 'Primary', description: 'Main call-to-action button' },
        { id: 'secondary', name: 'Secondary', description: 'Alternative action button' },
        { id: 'default', name: 'Default', description: 'Standard button style' },
        { id: 'outline', name: 'Outline', description: 'Button with border only' },
        { id: 'disabled', name: 'Disabled', description: 'Inactive button state' },
        { id: 'icon', name: 'With Icon', description: 'Button with an icon' }
      ],
      'Input': [
        { id: 'default', name: 'Default', description: 'Standard input field' },
        { id: 'with-label', name: 'With Label', description: 'Input with a label' },
        { id: 'with-icon', name: 'With Icon', description: 'Input with an icon' },
        { id: 'with-error', name: 'With Error', description: 'Input with error state' }
      ],
      'Checkbox': [
        { id: 'default', name: 'Default', description: 'Standard checkbox' },
        { id: 'disabled', name: 'Disabled', description: 'Disabled checkbox' },
        { id: 'indeterminate', name: 'Indeterminate', description: 'Indeterminate checkbox' }
      ],
      'Radio': [
        { id: 'default', name: 'Default', description: 'Standard radio button' },
        { id: 'disabled', name: 'Disabled', description: 'Disabled radio button' },
        { id: 'group', name: 'Radio Group', description: 'Group of radio buttons' }
      ]
    },
    
  },
  {
    title: 'Layout Components',
    description: 'Components for structuring your page layout',
    icon: 'Layout',
    color: 'purple',
    components: [
      { name: 'Card', description: 'Container for content' },
      { name: 'Grid', description: 'Flexible grid system' },
      { name: 'Container', description: 'Responsive container' },
      { name: 'Stack', description: 'Vertical or horizontal stack' },
    ],
    variants: {
      'Card': [
        { id: 'standard', name: 'Standard', description: 'Basic card layout' },
        { id: 'header', name: 'With Header', description: 'Card with header section' },
        { id: 'footer', name: 'With Footer', description: 'Card with footer actions' },
        { id: 'shadowed', name: 'Shadowed', description: 'Card with shadow effect' },
        { id: 'bordered', name: 'Bordered', description: 'Card with border' }
      ],
      'Grid': [
        { id: 'basic', name: 'Basic', description: 'Simple grid layout' },
        { id: 'responsive', name: 'Responsive', description: 'Grid that changes with screen size' },
        { id: 'gap', name: 'With Gap', description: 'Grid with spacing between items' }
      ],
      'Container': [
        { id: 'default', name: 'Default', description: 'Standard container' },
        { id: 'fluid', name: 'Fluid', description: 'Full-width container' },
        { id: 'centered', name: 'Centered', description: 'Centered container' }
      ],
      'Stack': [
        { id: 'vertical', name: 'Vertical', description: 'Vertical stack layout' },
        { id: 'horizontal', name: 'Horizontal', description: 'Horizontal stack layout' },
        { id: 'responsive', name: 'Responsive', description: 'Stack that changes orientation' }
      ]
    }
  },
  {
    title: 'Navigation Components',
    description: 'Components for site navigation and menus',
    icon: 'Navigation',
    color: 'green',
    components: [
      { name: 'Navbar', description: 'Top navigation bar' },
      { name: 'Sidebar', description: 'Side navigation menu' },
      { name: 'Breadcrumb', description: 'Navigation hierarchy' },
      { name: 'Tabs', description: 'Tabbed interface' },
    ],
    variants: {
      'Navbar': [
        { id: 'simple', name: 'Simple', description: 'Basic navigation bar' },
        { id: 'responsive', name: 'Responsive', description: 'Mobile-friendly navbar' },
        { id: 'centered', name: 'Centered', description: 'Centered navigation items' },
        { id: 'with-dropdown', name: 'With Dropdown', description: 'Navbar with dropdown menu' }
      ],
      'Sidebar': [
        { id: 'fixed', name: 'Fixed', description: 'Fixed sidebar' },
        { id: 'collapsible', name: 'Collapsible', description: 'Sidebar that can collapse' },
        { id: 'with-submenu', name: 'With Submenu', description: 'Sidebar with nested menu items' }
      ],
      'Breadcrumb': [
        { id: 'simple', name: 'Simple', description: 'Basic breadcrumb navigation' },
        { id: 'with-icon', name: 'With Icons', description: 'Breadcrumbs with icons' },
        { id: 'truncated', name: 'Truncated', description: 'Breadcrumbs with truncation' }
      ],
      'Tabs': [
        { id: 'basic', name: 'Basic', description: 'Basic tabs interface' },
        { id: 'pills', name: 'Pills', description: 'Pill-style tabs' },
        { id: 'vertical', name: 'Vertical', description: 'Vertical tabs layout' },
        { id: 'with-icon', name: 'With Icons', description: 'Tabs with icons' }
      ]
    }
  },
  {
    title: 'Feedback Components',
    description: 'Components for user feedback and notifications',
    icon: 'AlertTriangle',
    color: 'orange',
    components: [
      { name: 'Alert', description: 'Status messages' },
      { name: 'Toast', description: 'Temporary notifications' },
      { name: 'Progress', description: 'Progress indicators' },
      { name: 'Spinner', description: 'Loading indicators' },
    ],
    variants: {
      'Alert': [
        { id: 'info', name: 'Information', description: 'Informational message' },
        { id: 'success', name: 'Success', description: 'Positive action confirmation' },
        { id: 'warning', name: 'Warning', description: 'Warning notification' },
        { id: 'error', name: 'Error', description: 'Error message' },
        { id: 'with-action', name: 'With Actions', description: 'Alert with action buttons' }
      ],
      'Toast': [
        { id: 'info', name: 'Information', description: 'Informational toast' },
        { id: 'success', name: 'Success', description: 'Success toast' },
        { id: 'warning', name: 'Warning', description: 'Warning toast' },
        { id: 'error', name: 'Error', description: 'Error toast' }
      ],
      'Progress': [
        { id: 'basic', name: 'Basic', description: 'Basic progress bar' },
        { id: 'with-label', name: 'With Label', description: 'Progress bar with percentage' },
        { id: 'indeterminate', name: 'Indeterminate', description: 'Loading progress indicator' }
      ],
      'Spinner': [
        { id: 'border', name: 'Border', description: 'Border spinner animation' },
        { id: 'dots', name: 'Dots', description: 'Dots loading animation' },
        { id: 'grow', name: 'Grow', description: 'Growing spinner animation' }
      ]
    }
  },
];


export const categories = [
  'All',
  ...new Set(componentGroups.map(group => group.title.split(' ')[0]))
]; 
