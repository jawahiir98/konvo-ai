'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: session } = authClient.useSession();

  const onCreateUser = () => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: () => window.alert('Something went wrong'),
        onSuccess: () => window.alert('User created'),
      }
    );
  };

  if (session)
    return (
      <div>
        <div className="">Welcome {session.user.name}</div>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 px-4 justify-center h-screen">
      <Input
        placeholder={'Name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder={'Email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder={'Password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onCreateUser}>Submit</Button>
    </div>
  );
}
