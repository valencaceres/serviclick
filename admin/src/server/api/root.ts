import { createTRPCRouter } from "~/server/api/trpc";
import { reimbursementRouter } from "./routers/reimbursement";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  reimbursement: reimbursementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
