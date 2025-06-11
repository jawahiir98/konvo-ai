'use client';

import { AgentIdViewHeader } from '@/app/modules/agents/ui/views/agent-id-view-header';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTRPC } from '@/trpc/client';
import { useConfirm } from '@/hooks/use-confirm';
import { Badge } from '@/components/ui/badge';
import { PlaceholderAvatar } from '@/components/placeholder-avatar';
import { VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        // TODO: Invalidate free tier usage
        router.push('/agents');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    'Are you sure you want to delete this agent?',
    `The following action will remove ${data.meetingCount} associated meeting(s).`
  );
  const onRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeAgent.mutateAsync({ id: agentId });
  };
  return (
    <>
      <div className={'flex-1 p-4 md:px-8 flex flex-col gap-y-4'}>
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => {}}
          onRemove={onRemoveAgent}
        />
        <div className={'bg-white rounded-lg border '}>
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <PlaceholderAvatar variant={'botttsNeutral'} seed={data.name} />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>
            <Badge
              variant={'outline'}
              className={'flex items-center gap-x-2 [&>svg]:size-4'}
            >
              <VideoIcon className={'text-blue-700'} /> {data.meetingCount}{' '}
              {data.meetingCount === 1 ? 'Meeting' : 'Meetings'}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
      <RemoveConfirmation />
    </>
  );
};
