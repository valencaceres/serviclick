import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { getFileViewLink } from "~/utils/s3";

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
          insured: true,
          beneficiary: true,
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

export const caseStageAttachRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        case_id: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const attachments = await ctx.prisma.casestageattach.findMany({
        where: {
          case_id: input.case_id,
        },
        include: {
          document: true,
        },
      });

      const attachmentsWithSignedUrl = await Promise.all(
        attachments.map(async (attachment) => {
          if (attachment.file_tag === null) {
            return {
              ...attachment,
              viewLink: null,
            };
          }

          const signedUrl = await getFileViewLink(attachment.file_tag);
          return {
            ...attachment,
            viewLink: signedUrl,
          };
        })
      );

      return attachmentsWithSignedUrl;
    }),
});
