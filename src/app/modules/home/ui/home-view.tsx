'use client';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  if (!session) {
    return (
      <div>
        <p>Loading ... </p>
      </div>
    );
  }

  const onSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push('/sign-in'),
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4">
      <p> Logged in as {session.user.name} </p>
      <Button onClick={onSignOut}>Sign out</Button>
    </div>
  );
};
