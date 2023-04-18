import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const caseRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const casemodel = await ctx.prisma.casemodel.findUnique({
        where: {
          id: input.id,
        },
        include: {
          applicant: true,
          assistance: {
            include: {
              productassistances: true,
            },
          },
          product: true,
        },
      });
      return casemodel;
    }),
});

export const caseStageRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        case_id: z.string().uuid(),
        stage: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const casestage = await ctx.prisma.casestage.findFirst({
        where: {
          case_id: input.case_id,
          stage: {
            name: input.stage,
          },
        },
        include: {
          stage: true,
        },
      });

      return casestage;
    }),
});
