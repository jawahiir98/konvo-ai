'use client';

import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { MeetingIdViewHeader } from '@/app/modules/meetings/ui/views/meeting-id-view-header';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/hooks/use-confirm';
import { UpdateMeetingDialog } from '@/app/modules/meetings/ui/components/update-meeting-dialog';
import { UpcomingState } from '@/app/modules/meetings/ui/components/upcoming-state';
import { ActiveState } from '@/app/modules/meetings/ui/components/active-state';
import { CancelledState } from '@/app/modules/meetings/ui/components/cancelled-state';
import { ProcessingState } from '@/app/modules/meetings/ui/components/processing-state';

interface Props {
  meetingId: string;
}
export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditMeetingDialogOpen, setIsEditMeetingDialogOpen] = useState(false);
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const isActive = data.status === 'active';
  const isUpcoming = data.status === 'upcoming';
  const isCancelled = data.status === 'cancelled';
  const isProcessing = data.status === 'processing';
  const isCompleted = data.status === 'completed';

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    'Are you sure you want to remove this meeting?',
    'The following action will remove this meeting.'
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        //   TODO: Invalidate free tier usage
        router.push('/meetings');
      },
      onError: (error) => {
        toast.error(error.message || 'Something went wrong');
      },
    })
  );
  const onRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };

  return (
    <>
      <div className={'flex-1 p-4 md:px-8 flex flex-col gap-y-4'}>
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setIsEditMeetingDialogOpen(true)}
          onRemove={onRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {isProcessing && <ProcessingState />}
        {isCompleted && <div>Completed</div>}
      </div>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={isEditMeetingDialogOpen}
        onOpenChange={setIsEditMeetingDialogOpen}
        initialValues={data}
      />
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
