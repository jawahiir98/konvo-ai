'use client';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import { EmptyState } from '@/app/modules/agents/ui/components/empty-table-state';

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  return (
    <div className={'flex-1 pb-4 px-2 md:px-8 flex flex-col gap-y-4'}>
      <DataTable data={data} columns={columns} />
      {data.length === 0 && (
        <EmptyState
          title={'Create your first agent'}
          description={
            'You can create your first agent by clicking the button below'
          }
        />
      )}
    </div>
  );
};
