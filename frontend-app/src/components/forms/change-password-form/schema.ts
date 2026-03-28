import { z } from "zod/v4";

const CHANGE_PASSWORD_FORM_SCHEMA = z.object({
  email: z.string(),
  password: z.string()
});

type ChangePasswordFormSchema = z.infer<typeof CHANGE_PASSWORD_FORM_SCHEMA>;

export { CHANGE_PASSWORD_FORM_SCHEMA, type ChangePasswordFormSchema };
