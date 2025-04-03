import { Component } from '../types';
import { componentGroups } from '../data';

export const getComponentVariants = (groupData: any, componentData: Component) => {
  if (!groupData || !componentData) return [];
  
  const group = componentGroups.find(g => g.title === groupData.title);
  if (!group || !group.variants) return [];
  
  return group.variants[componentData.name] || [];
}; 