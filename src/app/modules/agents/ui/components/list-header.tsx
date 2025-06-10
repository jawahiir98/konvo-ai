'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NewAgentDialog } from './new-agent-dialog';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import { DEFAULT_PAGE } from '@/constants';
import { useAgentsFilters } from '@/app/modules/agents/hooks/use-agents-filters';
import { AgentsSearchFilters } from '@/app/modules/agents/ui/components/agents-search-filters';

export const ListHeader = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [filters, setFilters] = useAgentsFilters();
  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: '',
      page: DEFAULT_PAGE,
    });
  };
  const onToggleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className={'p-4 md:px-8 flex flex-col gap-y-4'}>
        <div className="flex items-center justify-between">
          <h5 className={'font-medium text-xl'}>My Agents</h5>
          <Button onClick={onToggleOpen}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-x-2 py-1 px-2">
        <AgentsSearchFilters />
      </div>
      {isAnyFilterModified && (
        <Button onClick={onClearFilters} variant={'outline'} size={'sm'}>
          <XCircleIcon /> Clear
        </Button>
      )}
      <NewAgentDialog open={open} onOpenChange={onToggleOpen} />
    </>
  );
};
