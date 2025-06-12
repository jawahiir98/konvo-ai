'use client';

import { useRouter } from 'next/navigation';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DataTable } from '../../../../../components/data-table';
import { columns } from '../components/columns';
import { EmptyState } from '@/app/modules/agents/ui/components/empty-table-state';
import { useAgentsFilters } from '@/app/modules/agents/hooks/use-agents-filters';
import { DataPagination } from '@/app/modules/agents/ui/components/data-pagination';

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );
  return (
    <div className={'flex-1 pb-4 px-2 md:px-8 flex flex-col gap-y-4'}>
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
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
