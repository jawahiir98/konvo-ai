'use client';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorState } from '@/components/error-state';
import { CallProvider } from '@/app/modules/call/ui/components/call-provider';

interface Props {
  meetingId: string;
}

export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  if (data.status === 'completed') {
    return (
      <div className={'flex h-screen items-center justify-center'}>
        <ErrorState
          title={'Meeting has ended'}
          description={'You can no longer join this meeting.'}
        />
      </div>
    );
  }
  return <CallProvider meetingName={data.name} meetingId={meetingId} />;
};
