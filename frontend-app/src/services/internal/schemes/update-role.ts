import z from "zod/v4";

const UPDATE_ROLE_REQUEST_SCHEMA = z.object({
  email: z.string(),
  role: z.enum(["admin", "user"])
});

const UPDATE_ROLE_RESPONSE_SCHEMA = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  role: z.enum(["admin", "user"]),
  banned: z.boolean(),
  banReason: z.string().nullable(),
  banExpires: z.string().nullable(),
  username: z.string().nullable(),
  displayUsername: z.string().nullable()
});

type UpdateRoleRequestSchema = z.infer<typeof UPDATE_ROLE_REQUEST_SCHEMA>;
type UpdateRoleResponseSchema = z.infer<typeof UPDATE_ROLE_RESPONSE_SCHEMA>;

export {
  UPDATE_ROLE_REQUEST_SCHEMA,
  UPDATE_ROLE_RESPONSE_SCHEMA,
  type UpdateRoleRequestSchema,
  type UpdateRoleResponseSchema
};
