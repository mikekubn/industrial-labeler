import { z } from "zod/v4";

const CHANGE_ROLE_FORM_SCHEMA = z.object({
  email: z.string(),
  role: z.enum(["admin", "user"])
});

type ChangeRoleFormSchema = z.infer<typeof CHANGE_ROLE_FORM_SCHEMA>;

export { CHANGE_ROLE_FORM_SCHEMA, type ChangeRoleFormSchema };
