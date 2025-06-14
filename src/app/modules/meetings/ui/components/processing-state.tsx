'use client';
import { EmptyState } from '@/app/modules/agents/ui/components/empty-table-state';

export const ProcessingState = () => {
  return (
    <div
      className={
        'bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'
      }
    >
      <EmptyState
        image={'/processing.svg'}
        title={'Meeting completed'}
        description={'The completed meeting is being processed.'}
      />
    </div>
  );
};
