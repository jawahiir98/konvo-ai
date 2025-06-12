'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { DataTable } from '@/components/data-table';
import { columns } from '@/app/modules/meetings/ui/components/columns';
import { EmptyState } from '@/app/modules/agents/ui/components/empty-table-state';

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className={'flex-1 pb-4 px-8 md:px-4 flex flex-col gap-y-4'}>
      <DataTable columns={columns} data={data.items} />
      {data.items.length === 0 && (
        <EmptyState
          title={'Create your first meeting'}
          description={
            'Schedule a meeting with your agents and get started. Each meeting lets you collaborate, share ideas, and interact with participants real time.'
          }
        />
      )}
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title={'Loading Meetings'}
      description={'This may take a few seconds.'}
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState title={'Error'} description={'Failed to load the meetings'} />
  );
};
