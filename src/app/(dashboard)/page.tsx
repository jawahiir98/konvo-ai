import { HomeView } from '@/app/modules/home/ui/views/home-view';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { caller } from '@/trpc/server';

const Page = async () => {
  const greeting = await caller.hello({ text: 'Jawahiir Server' });

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/sign-in');
  }

  if (greeting) {
    return <p>{greeting.greeting}</p>;
  }

  return <HomeView />;
};
export default Page;
