import { createTRPCRouter, publicProcedure } from "../trpc";

import { z } from "zod";

import { type IProductPlan, type IProduct } from "~/interfaces/product";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure
    .input(
      z.object({
        brokerId: z.string(),
        familyId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.$queryRaw<IProduct[]>`select  pro.id,
                                                                  pro.name,
                                                                  pro.currency,
                                                                  pro.frequency,
                                                                  bpr.companyprice,
                                                                  bpr.customerprice
                                                            from    app.product pro
                                                                    inner join app.family fam on pro.family_id = fam.id
                                                                    inner join app.brokerproduct bpr on pro.id = bpr.product_id
                                                            where   bpr.broker_id = ${input.brokerId}::UUID and
                                                                  fam.id = ${input.familyId}::UUID and
                                                                  bpr.isActive is true`;

      return result;
    }),
  getProductPlan: publicProcedure
    .input(
      z.object({
        agentId: z.string().uuid(),
        productId: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.$queryRaw<IProductPlan[]>`select *
                                                from app.productplan ppl
                                                where ppl.product_id = ${input.productId}::UUID and
                                                      ppl.agent_id = ${input.agentId}::UUID`;

      return result;
    }),
});
