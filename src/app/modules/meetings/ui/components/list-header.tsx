'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { NewMeetingsDialog } from '@/app/modules/meetings/ui/components/new-meeting-dialog';

export const ListHeader = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onToggleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className={'p-4 md:px-8 flex flex-col gap-y-4'}>
        <div className="flex items-center justify-between">
          <h5 className={'font-medium text-xl'}>My Meetings</h5>
          <Button onClick={onToggleOpen}>
            <PlusIcon />
            New Meetings
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-x-2 py-1 px-2">TODO: Filters</div>
      <NewMeetingsDialog open={open} onOpenChange={onToggleOpen} />
    </>
  );
};
