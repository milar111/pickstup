'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

interface ComponentGroupClientProps {
  groupData: GroupData | null;
  componentData: Component | null;
  group: string;
  componentName: string;
}

export default function ComponentGroupClient({
  groupData,
  componentData,
  group,
  componentName
}: ComponentGroupClientProps) {
  const router = useRouter();
  
  useEffect(() => {
    if (!groupData || !componentData) {
      router.push('/ui-components');
    }
  }, [groupData, componentData, router]);

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