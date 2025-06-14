'use client';
import { EmptyState } from '@/app/modules/agents/ui/components/empty-table-state';
export const CancelledState = () => {
  return (
    <div
      className={
        'bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'
      }
    >
      <EmptyState
        image={'/cancelled.svg'}
        title={'Meeting has been cancelled'}
        description={'This meeting was cancelled'}
      />
    </div>
  );
};
