import { agentsRouter } from '@/app/modules/agents/server/procedures';
import { meetingsRouter } from '@/app/modules/meetings/server/procedures';
import { createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
