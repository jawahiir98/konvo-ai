import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getQueryClient, trpc } from '@/trpc/server';
import { AgentIdView } from '@/app/modules/agents/ui/views/agent-id-view';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';

interface Props {
  params: Promise<{ agentId: string }>;
}

const Page = async ({ params }: Props) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary fallback={<AgentsError />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
export default Page;

const AgentsViewLoading = () => {
  return (
    <LoadingState
      title={'Loading Agent'}
      description={'This may take a few seconds.'}
    />
  );
};

const AgentsError = () => {
  return (
    <ErrorState title={'Error'} description={'Failed to load the agent'} />
  );
};
