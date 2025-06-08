'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: 'Jawahiir' }));
  return (
    <div className="flex flex-col gap-4 px-4">
      <h1>{data?.greeting}</h1>
    </div>
  );
};
