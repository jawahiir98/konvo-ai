import { AgentsView } from '@/app/modules/agents/ui/views/agents-view';
import { trpc, getQueryClient } from '@/trpc/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { LoadingState } from '@/components/loading-state';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorState } from '@/components/error-state';

const AgentsViewLoading = () => {
  return (
    <LoadingState
      title={'Loading Agents'}
      description={'This may take a few seconds.'}
    />
  );
};

const AgentsError = () => {
  return <ErrorState title={'Error'} description={'Failed to load agents'} />;
};
const Agents = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary fallback={<AgentsError />}>
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
export default Agents;
