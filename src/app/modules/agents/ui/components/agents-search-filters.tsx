import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAgentsFilters } from '@/app/modules/agents/hooks/use-agents-filters';

export const AgentsSearchFilters = () => {
  const [filters, setFilters] = useAgentsFilters();
  return (
    <div className="relative">
      <Input
        className={'h-9 bg-white w-[200px] pl-7'}
        placeholder="Search by name"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};
