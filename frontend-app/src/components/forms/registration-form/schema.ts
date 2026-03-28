import { z } from "zod/v4";

const REGISTRATION_FORM_SCHEMA = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  passwordConfirmation: z.string()
});

type RegistrationFormSchema = z.infer<typeof REGISTRATION_FORM_SCHEMA>;

export { REGISTRATION_FORM_SCHEMA, type RegistrationFormSchema };
