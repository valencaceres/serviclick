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
