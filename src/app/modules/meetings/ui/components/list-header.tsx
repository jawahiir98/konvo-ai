'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import { NewMeetingsDialog } from '@/app/modules/meetings/ui/components/new-meeting-dialog';
import { MeetingsSearchFilters } from '@/app/modules/meetings/ui/components/meetings-search-filters';
import { StatusFilter } from '@/app/modules/agents/ui/components/status-filter';
import { AgentIdFilter } from '@/app/modules/meetings/ui/components/agent-id-filter';
import { useMeetingsFilters } from '@/app/modules/meetings/hooks/use-meetings-filters';
import { DEFAULT_PAGE } from '@/constants';

export const ListHeader = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [filters, setFilters] = useMeetingsFilters();

  const isFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      search: '',
      status: null,
      agentId: '',
      page: DEFAULT_PAGE,
    });
  };

  const onToggleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className={'px-4 py-4 md:px-8 flex flex-col gap-y-4'}>
        <div className="flex items-center justify-between">
          <h5 className={'font-medium text-xl'}>My Meetings</h5>
          <Button onClick={onToggleOpen}>
            <PlusIcon />
            New Meetings
          </Button>
        </div>
      </div>
      <ScrollArea>
        <div className="flex items-center gap-x-2 py-1 px-4">
          <MeetingsSearchFilters />
          <StatusFilter />
          <AgentIdFilter />
          {isFilterModified && (
            <Button variant={'outline'} onClick={onClearFilters}>
              <XCircleIcon /> Clear
            </Button>
          )}
        </div>
        <ScrollBar orientation={'horizontal'} />
      </ScrollArea>
      <NewMeetingsDialog open={open} onOpenChange={onToggleOpen} />
    </>
  );
};
