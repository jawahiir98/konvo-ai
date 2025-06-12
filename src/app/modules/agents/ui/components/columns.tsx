'use client';

import { ColumnDef } from '@tanstack/react-table';

import { AgentGetMany } from '../../types';
import { Badge } from '@/components/ui/badge';
import { PlaceholderAvatar } from '@/components/placeholder-avatar';
import { CornerDownRightIcon, VideoIcon } from 'lucide-react';

export const columns: ColumnDef<AgentGetMany[number]>[] = [
  {
    accessorKey: 'name',
    header: 'Agent Name',
    cell: ({ row }) => (
      <div className={'flex flex-col gap-y-1'}>
        <div className="flex items-center gap-x-2">
          <PlaceholderAvatar
            variant={'botttsNeutral'}
            seed={row.original.name}
          />
          <span className={'flex items-center capitalize'}>
            {row.original.name}
          </span>
        </div>
        <div className={'flex items-center gap-x-2'}>
          <CornerDownRightIcon className={'size-3 text-muted-foreground'} />
          <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'meetingCount',
    header: 'Meetings',
    cell: ({ row }) => (
      <Badge
        variant={'outline'}
        className={'flex items-center gap-x-2 [&>svg]:size-4'}
      >
        <VideoIcon className={'text-blue-500'} />
        {row.original.meetingCount}{' '}
        {row.original.meetingCount === 1 ? 'Meeting' : 'Meetings'}
      </Badge>
    ),
  },
];
