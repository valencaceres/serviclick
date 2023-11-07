import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const reimbursementRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        isImed: z.boolean(),
      })
    )
    .query(async ({ input, ctx }) => {
      const whereCondition = input.isImed
        ? {
            OR: [
              {
                AND: [
                  { register_imedamount: { not: { equals: 0 } } },
                  { register_imedamount: { not: { equals: null } } },
                ],
              },
            ],
          }
        : {
            OR: [
              {
                AND: [
                  { register_amount: { not: { equals: 0 } } },
                  { register_amount: { not: { equals: null } } },
                ],
              },
            ],
          };

      const reimbursement = await ctx.prisma.casereimbursment.findMany({
        where: whereCondition,
        include: {
          casemodel: {
            include: {
              insured: true,
              beneficiary: true,
              assistance: {
                include: {
                  productassistances: true,
                },
              },
              product: true,
            },
          },
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
        user_id: z.string(),
        imed_amount: z.number().nullable(),
        amount: z.number().nullable(),
        comment: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const reimbursement = await ctx.prisma.casereimbursment.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
          user_id: input.user_id,
          imed_amount: input.imed_amount,
          amount: input.amount,
          comment: input.comment,
        },
      });

      return reimbursement;
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const reimbursement = await ctx.prisma.casereimbursment.findUnique({
        where: {
          id: input.id,
        },
        include: {
          casemodel: {
            include: {
              insured: true,
              beneficiary: true,
              product: true,
              assistance: {
                include: {
                  productassistances: true,
                },
              },
            },
          },
        },
      });

      return reimbursement;
    }),
});
