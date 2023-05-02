import { createTRPCRouter } from "~/server/api/trpc";
import { reimbursementRouter } from "./routers/reimbursement";
import {
  caseRouter,
  caseStageRouter,
  caseStageAttachRouter,
} from "./routers/case";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  reimbursement: reimbursementRouter,
  case: caseRouter,
  caseStage: caseStageRouter,
  caseStageAttach: caseStageAttachRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
