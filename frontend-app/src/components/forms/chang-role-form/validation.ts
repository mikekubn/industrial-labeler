import { z } from "zod/v4";
import { CHANGE_ROLE_FORM_SCHEMA } from "./schema";

const useChangeRoleFormValidation = () => {
  return CHANGE_ROLE_FORM_SCHEMA.check((ctx) => {
    const data = ctx.value;

    const emailResult = z
      .string()
      .min(1, { error: "Email je povinný údaj" })
      .check(z.trim(), z.email({ error: "Email nemá správny formát" }), z.toLowerCase())
      .safeParse(data.email);

    if (!emailResult.success) {
      const message = emailResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.email,
        path: ["email"],
        message
      });
    }

    const roleResult = z.enum(["admin", "user"]).safeParse(data.role);

    if (!roleResult.success) {
      const message = roleResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.role,
        path: ["role"],
        message
      });
    }
  });
};

export { useChangeRoleFormValidation };
