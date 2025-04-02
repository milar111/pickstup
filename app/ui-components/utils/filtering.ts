import { Component } from '../types';
import { componentGroups } from '../data';


export function getAllComponents() {
  return componentGroups.flatMap(group => 
    group.components.map(component => ({
      ...component,
      groupTitle: group.title,
      groupIcon: group.icon,
      groupColor: group.color || 'gray'
    }))
  );
}


export function getTotalVariantCount(components: any[], includeComponentsWithoutVariants = true) {
  let total = 0;
  
  components.forEach(component => {
    const group = componentGroups.find(g => g.title === component.groupTitle);
    if (!group) return;
    
    const variants = group.variants?.[component.name] || [];
    
    if (variants.length > 0) {
      total += variants.length;
    } else if (includeComponentsWithoutVariants) {
      total += 1;
    }
  });
  
  return total;
}


export function getFilteredComponents(searchQuery: string, selectedCategory: string) {
  let components = getAllComponents();
  
  
  if (selectedCategory !== 'All') {
    components = components.filter(component => 
      component.groupTitle === selectedCategory
    );
  }
  
  
  if (searchQuery) {
    components = components.filter(component => 
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return components;
} 
