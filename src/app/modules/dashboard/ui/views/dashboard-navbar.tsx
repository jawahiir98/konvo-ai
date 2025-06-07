'use client';

import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react';
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
      <Button
        className={
          'h-9 w-[260px] justify-start font-normal text-muted-foreground hover:text-muted-foreground'
        }
        variant={'outline'}
        size={'sm'}
        onClick={() => {}}
      >
        <SearchIcon /> Search
        <kbd
          className={
            'ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted' +
            ' px-1.5 font-mono text-[10px] font-medium text-muted-foreground'
          }
        >
          <span className={'text-xs'}>&#8984;</span>K
        </kbd>
      </Button>
    </nav>
  );
};
