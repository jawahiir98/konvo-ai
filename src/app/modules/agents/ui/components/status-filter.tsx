import {
  CircleCheckIcon,
  CircleXIcon,
  LoaderIcon,
  ClockArrowUpIcon,
  VideoIcon,
} from 'lucide-react';
import { useMeetingsFilters } from '@/app/modules/meetings/hooks/use-meetings-filters';
import { CommandSelect } from '@/app/modules/meetings/ui/components/command-select';
import { MeetingStatus } from '@/app/modules/meetings/types';

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];
export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  return (
    <CommandSelect
      placeholder={'Status'}
      className={'h-9'}
      options={options}
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status ?? ''}
    />
  );
};
