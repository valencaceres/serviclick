import { createTRPCRouter, publicProcedure } from "../trpc";

import { z } from "zod";

import { type IReport } from "~/interfaces/report";
import { type IFamily } from "~/interfaces/family";
import { type IProduct } from "~/interfaces/product";

export const brokerRouter = createTRPCRouter({
  getByUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const brokers = await ctx.prisma.broker.findMany({
        where: {
          brokerusers: {
            some: {
              user_id: input.userId,
            },
          },
        },
      });

      return brokers;
    }),
  getReport: publicProcedure
    .input(
      z.object({
        agentId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.$queryRaw<
        IReport[]
      >`select customer_name, customer_email, customer_phone,
                                                      '' as executive_name,
                                                      product_name,
                                                      to_char(incorporation, 'DD-MM-YYYY') as incorporation,
                                                      fee_value,
                                                      free_months,
                                                      fees - free_months as fees_charged,
                                                      fee_value * (fees - free_months) as charged,
                                                      paid,
                                                      case when (fee_value * (fees - free_months)) - paid > 0 then (fee_value * (fees - free_months)) - paid else 0 end as balance
                                                from 	(
                                                      select	max(age.name) as channel_name,
                                                              max(bro.name) as broker_name,
                                                              max(concat(cus.name,' ', cus.paternallastname, ' ', cus.maternallastname)) as customer_name,
                                                              max(cus.email) as customer_email,
                                                              max(cus.phone) as customer_phone,
                                                              max(pro.name) as product_name,
                                                              min(case when pay.date is null then sub.date else pay.date end) as incorporation,
                                                              max(lpr.price) as fee_value,
                                                              max(case when ppl.discount_type = 't' and ppl.discount_cicles > 0 then ppl.discount_cicles else 0 end) as free_months,
                                                              (extract(month from age(now(), min(case when pay.date is null then sub.date else pay.date end))) + 1) as fees,
                                                              sum(case when pay.amount is null then 0 else pay.amount end) paid
                                                      from	  app.lead lea
                                                                left outer join app.agent age on lea.agent_id = age.id
                                                                left outer join app.broker bro on lea.agent_id = bro.id
                                                                left outer join app.customer cus on lea.customer_id = cus.id
                                                                left outer join app.leadproduct lpr on lea.id = lpr.lead_id
                                                                left outer join app.productplan ppl on lpr.productplan_id = ppl.plan_id
                                                                left outer join app.product pro on lpr.product_id = pro.id
                                                                left outer join app.subscription sub on lea.subscription_id = sub.subscription_id
                                                                left outer join app.payment pay on pay.subscription_id = sub.subscription_id
                                                      where   not lea.policy_id is null and
                                                              lea.agent_id = ${input.agentId}::UUID
                                                      group  	by
                                                              sub.subscription_id) as report
                                                order 	by
                                                      customer_name,
                                                      product_name`;

      return result;
    }),
  getFamilies: publicProcedure
    .input(
      z.object({
        brokerId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.$queryRaw<IFamily[]>`select  distinct
                                                      fam.id,
                                                      fam.icon,
                                                      fam.name
                                                from	  app.product pro
                                                        inner join app.family fam on pro.family_id = fam.id
                                                        inner join app.brokerproduct bpr on pro.id = bpr.product_id
                                                where	  bpr.broker_id = ${input.brokerId}::UUID and
                                                      bpr.isActive is true`;

      return result;
    }),
});
