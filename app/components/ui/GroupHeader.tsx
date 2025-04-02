import React from 'react';
import { ComponentGroup } from '../../ui-components/types';
import { getIconComponent } from '../../ui-components/utils/icons';

interface GroupHeaderProps {
  group: ComponentGroup;
  componentsCount: number;
  variantsCount: number;
}

export function GroupHeader({ group, componentsCount, variantsCount }: GroupHeaderProps) {
  const IconComponent = getIconComponent(group.icon);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
      {IconComponent && (
        <div className={`text-${group.color || 'blue'}-500 mb-1 md:mb-0`}>
          <IconComponent className="h-7 w-7" />
        </div>
      )}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{group.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {variantsCount} variants from {componentsCount} components
        </p>
      </div>
    </div>
  );
} 