import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMeetingsFilters } from '@/app/modules/meetings/hooks/use-meetings-filters';

export const MeetingsSearchFilters = () => {
  const [filters, setFilters] = useMeetingsFilters();
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
