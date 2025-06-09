'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NewAgentDialog } from './new-agent-dialog';
import { PlusIcon } from 'lucide-react';

export const ListHeader = () => {
  const [open, setOpen] = useState<boolean>(false);
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
      <NewAgentDialog open={open} onOpenChange={onToggleOpen} />
    </>
  );
};
