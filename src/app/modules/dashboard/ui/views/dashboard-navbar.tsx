'use client';

import { PanelLeftCloseIcon, PanelLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export const DashboardNavbar = () => {
  const { isMobile, state, toggleSidebar } = useSidebar();
  return (
    <nav
      className={'flex gap-x-2 py-3 px-4 items-center border-b bg-background'}
    >
      <Button variant={'outline'} className={'size-9'} onClick={toggleSidebar}>
        {isMobile || state === 'collapsed' ? (
          <PanelLeftIcon className={'size-4'} />
        ) : (
          <PanelLeftCloseIcon className={'size-4'} />
        )}
      </Button>
    </nav>
  );
};
