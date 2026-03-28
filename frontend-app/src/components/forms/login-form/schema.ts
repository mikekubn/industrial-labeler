import { z } from "zod/v4";

const LOGIN_FORM_SCHEMA = z.object({
  email: z.string(),
  password: z.string()
});

type LoginFormSchema = z.infer<typeof LOGIN_FORM_SCHEMA>;

export { LOGIN_FORM_SCHEMA, type LoginFormSchema };
