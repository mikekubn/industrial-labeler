import { z } from "zod/v4";

const CREATE_USER_FORM_SCHEMA = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
  role: z.enum(["user", "admin"])
});

type CreateUserFormSchema = z.infer<typeof CREATE_USER_FORM_SCHEMA>;

export { CREATE_USER_FORM_SCHEMA, type CreateUserFormSchema };
