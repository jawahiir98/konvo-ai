import { Suspense } from 'react';
import {
  MeetingsView,
  MeetingsViewLoading,
  MeetingsViewError,
} from '@/app/modules/meetings/ui/views/meetings-view';
import { ListHeader } from '@/app/modules/meetings/ui/components/list-header';
import { getQueryClient, trpc } from '@/trpc/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));
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
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
