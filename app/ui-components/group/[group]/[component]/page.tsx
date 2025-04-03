'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { componentGroups } from '../../../data';
import { Component } from '../../../types';

import PageBackground from '../../../../components/ui-components/common/PageBackground';
import LoadingSkeleton from '../../../../components/ui-components/common/LoadingSkeleton';
import GroupHeader from '../../../../components/ui-components/group/GroupHeader';
import VariantGrid from '../../../../components/ui-components/group/VariantGrid';

interface GroupData {
  title: string;
  color: string;
  components: Component[];
}

export default function ComponentGroupPage() {
  const params = useParams();
  const router = useRouter();
  const group = decodeURIComponent(params.group as string);
  const componentName = decodeURIComponent(params.component as string);
  
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [componentData, setComponentData] = useState<Component | null>(null);
  
  useEffect(() => {
    const formattedGroup = group.replace(/-/g, ' ');
    const matchedGroup = componentGroups.find(g => 
      g.title.toLowerCase() === formattedGroup
    );
    
    if (matchedGroup) {
      setGroupData(matchedGroup as GroupData);
      
      const formattedComponent = componentName.replace(/-/g, ' ');
      const matchedComponent = matchedGroup.components.find(c => 
        c.name.toLowerCase() === formattedComponent
      );
      
      if (matchedComponent) {
        setComponentData(matchedComponent);
      } else {
        router.push('/ui-components');
      }
    } else {
      router.push('/ui-components');
    }
  }, [group, componentName, router]);

  if (!groupData || !componentData) {
    return <LoadingSkeleton />;
  }

  return (
    <PageBackground>
      <GroupHeader 
        componentData={componentData} 
        groupTitle={groupData.title} 
      />
      
      <VariantGrid 
        componentData={componentData} 
        groupData={groupData} 
      />
    </PageBackground>
  );
} 