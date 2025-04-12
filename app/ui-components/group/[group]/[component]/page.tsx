import { componentGroups } from '../../../data';
import ComponentGroupClient from './ComponentGroupClient';
import { Component } from '../../../types';

interface GroupData {
  title: string;
  color: string;
  components: Component[];
}

interface PageParams {
  group: string;
  component: string;
}

export function generateStaticParams() {
  const params: PageParams[] = [];
  
  for (const group of componentGroups) {
    const groupSlug = group.title.toLowerCase().replace(/ /g, '-');
    
    for (const component of group.components) {
      const componentSlug = component.name.toLowerCase().replace(/ /g, '-');
      params.push({
        group: groupSlug,
        component: componentSlug
      });
    }
  }
  
  return params;
}

interface PageProps {
  params: PageParams;
}

export default async function ComponentGroupPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const group = decodeURIComponent(resolvedParams.group);
  const componentName = decodeURIComponent(resolvedParams.component);
  
  const formattedGroup = group.replace(/-/g, ' ');
  const matchedGroup = componentGroups.find(g => 
    g.title.toLowerCase() === formattedGroup.toLowerCase()
  );
  
  let groupData: GroupData | null = null;
  let componentData: Component | null = null;
  
  if (matchedGroup) {
    groupData = matchedGroup as GroupData;
    
    const formattedComponent = componentName.replace(/-/g, ' ');
    const matchedComponent = matchedGroup.components.find(c => 
      c.name.toLowerCase() === formattedComponent.toLowerCase()
    );
    
    if (matchedComponent) {
      componentData = matchedComponent;
    }
  }
  
  return (
    <ComponentGroupClient 
      groupData={groupData}
      componentData={componentData}
      group={group}
      componentName={componentName}
    />
  );
} 