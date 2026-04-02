import { z } from "zod/v4";

const SIGN_IN_FORM_SCHEMA = z.object({
  email: z.string(),
  password: z.string()
});

type SignInFormSchema = z.infer<typeof SIGN_IN_FORM_SCHEMA>;

export { SIGN_IN_FORM_SCHEMA, type SignInFormSchema };
