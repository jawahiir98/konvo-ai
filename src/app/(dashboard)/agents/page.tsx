import { AgentsView } from '@/app/modules/agents/ui/views/agents-view';
import { trpc, getQueryClient } from '@/trpc/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ListHeader } from '@/app/modules/agents/ui/components/list-header';
import { LoadingState } from '@/components/loading-state';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
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
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({}));
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/sign-in');
  }
  return (
    <>
      <ListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};
export default Agents;
