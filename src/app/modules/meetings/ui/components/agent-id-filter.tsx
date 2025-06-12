import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { CommandSelect } from '@/app/modules/meetings/ui/components/command-select';
import { PlaceholderAvatar } from '@/components/placeholder-avatar';
import { useMeetingsFilters } from '@/app/modules/meetings/hooks/use-meetings-filters';

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const trpc = useTRPC();
  const [agentSearch, setAgentSearch] = useState<string>('');
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch })
  );
  return (
    <CommandSelect
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className={'flex items-center gap-x-2'}>
            <PlaceholderAvatar
              className={'size-4'}
              seed={agent.name}
              variant={'botttsNeutral'}
            />
            <span>{agent.name}</span>
          </div>
        ),
      }))}
      onSelect={(value) => setFilters({ agentId: value })}
      value={filters.agentId ?? ''}
      onSearch={setAgentSearch}
      className={'h-9'}
      placeholder={'Agent'}
    />
  );
};
