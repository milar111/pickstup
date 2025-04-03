import React from 'react';
import { Component } from '../../types';
import VariantCard from './VariantCard';
import { getComponentVariants } from '../helpers/variantUtils';

interface VariantGridProps {
  componentData: Component;
  groupData: any;
}

export default function VariantGrid({ componentData, groupData }: VariantGridProps) {
  const variants = getComponentVariants(groupData, componentData);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {variants.map(variant => (
        <VariantCard
          key={variant.id}
          variant={variant}
          componentData={componentData}
          groupData={groupData}
        />
      ))}
    </div>
  );
} 