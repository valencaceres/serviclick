import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
export const userRouter = createTRPCRouter({

	getAll: publicProcedure
		.query(async () => {
			const users = await clerkClient.users.getUserList();

			if (!users || users.length === 0) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "No users found",
				});
			}

			return users;
		}),
	create: publicProcedure
		.input(
			z.object({
				name: z.string(),
				last_name: z.string(),
				role_admin: z.string(),
				role_broker: z.string(),
				role_operations: z.string(),
				role_serviclick: z.string(),
				type_role_admin: z.enum(["user", "admin", "moderator"]),
				type_role_broker: z.enum(["user", "admin", "moderator"]),
				type_role_operations: z.enum(["user", "admin", "moderator"]),
				type_role_serviclick: z.enum(["user", "admin", "moderator"]),
				email_address: z.string(),
				password: z.string(),
			})
		)
		.mutation(async ({ input }) => {

			const commonData = {
				firstName: input.name,
				lastName: input.last_name,
				emailAddress: [input.email_address],
				publicMetadata: {
					roles: {
						[input.role_admin]: input.type_role_admin,
						[input.role_broker]: input.type_role_broker,
						[input.role_operations]: input.type_role_operations,
						[input.role_serviclick]: input.type_role_serviclick,
					}
				},
				password: input.password

			};
			return await clerkClient.users.createUser({
				...commonData,
			});

		}),

	getById: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const userId = input.userId;

			const clerkUser = await clerkClient.users.getUser(userId);

			if (!clerkUser) {
				throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
			}

			return clerkUser;
		}),
	update: publicProcedure
		.input(
			z.object({
				name: z.string(),
				last_name: z.string(),
				role_admin: z.string(),
				role_broker: z.string(),
				role_operations: z.string(),
				role_serviclick: z.string(),
				type_role_admin: z.enum(["user", "admin", "moderator"]),
				type_role_broker: z.enum(["user", "admin", "moderator"]),
				type_role_operations: z.enum(["user", "admin", "moderator"]),
				type_role_serviclick: z.enum(["user", "admin", "moderator"]),
				email_address: z.string(),
				password: z.string(),
				user_id: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const userId = input.user_id
			if (userId) {
				await clerkClient.users.updateUser(userId, {
					firstName: input.name,
					lastName: input.last_name,
					publicMetadata: {
						roles: {
							[input.role_admin]: input.type_role_admin,
							[input.role_broker]: input.type_role_broker,
							[input.role_operations]: input.type_role_operations,
							[input.role_serviclick]: input.type_role_serviclick,
						}
					},
				});
				if (input.password != "") {
					await clerkClient.users.updateUser(userId, {
						password: input.password
					})
				}
			}

		}),
	delete: publicProcedure
		.input(
			z.object({
				user_id: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const userId = input.user_id
			if (userId) {
				return await clerkClient.users.deleteUser(userId);
			}

		})
});