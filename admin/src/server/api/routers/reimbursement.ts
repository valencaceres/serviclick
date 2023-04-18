import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const reimbursementRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const reimbursement = await ctx.prisma.casereimbursment.findMany({
      include: {
        casemodel: {
          include: {
            applicant: true,
            assistance: {
              include: {
                productassistances: true,
              },
            },
          },
        },
        casestageresult: true,
      },
      orderBy: {
        casemodel: {
          number: "asc",
        },
      },
    });

    return reimbursement;
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        status: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const reimbursement = await ctx.prisma.casereimbursment.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });

      return reimbursement;
    }),
});
