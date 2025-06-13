'use client';
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

interface Props {
  meetingId: string;
}
export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

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
          onEdit={() => {}}
          onRemove={onRemoveMeeting}
        />
      </div>
      <RemoveConfirmation />
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
