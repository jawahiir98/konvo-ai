'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { MeetingIdViewHeader } from '@/app/modules/meetings/ui/views/meeting-id-view-header';

interface Props {
  meetingId: string;
}
export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  return (
    <>
      <div className={'flex-1 p-4 md:px-8 flex flex-col gap-y-4'}>
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => {}}
          onRemove={() => {}}
        />
      </div>
    </>
  );
};
export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title={'Loading Meeting'}
      description={'This may take a few seconds.'}
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState title={'Error'} description={'Failed to load the meeting'} />
  );
};
