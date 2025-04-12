import ComponentDetailClient from '../../components/ui-components/ComponentDetailClient';
import { componentGroups } from '../data';
import { Component } from '../types';

type Props = {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export async function generateStaticParams() {
  const paths: { slug: string }[] = [];
  
  componentGroups.forEach(group => {
    group.components.forEach(component => {
      const slug = component.name.toLowerCase().replace(/\s+/g, '-');
      paths.push({ slug });
    });
  });
  
  return paths;
}

export default async function Page({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  let foundComponent: Component | null = null;
  let foundGroup: string | null = null;
  
  componentGroups.forEach(group => {
    const match = group.components.find(comp => 
      comp.name.toLowerCase().replace(/\s+/g, '-') === slug
    );
    
    if (match) {
      foundComponent = match;
      foundGroup = group.title;
    }
  });
  
  return (
    <ComponentDetailClient 
      initialComponent={foundComponent} 
      initialComponentGroup={foundGroup}
      slug={slug}
    />
  );
} 