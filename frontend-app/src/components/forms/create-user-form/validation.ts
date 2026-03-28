import { z } from "zod/v4";
import { CREATE_USER_FORM_SCHEMA } from "./schema";

const useCreateUserFormValidation = () => {
  return CREATE_USER_FORM_SCHEMA.check((ctx) => {
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

    const nameResult = z.string().min(1, { error: "Meno je povinný údaj" }).safeParse(data.name);

    if (!nameResult.success) {
      const message = nameResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.name,
        path: ["name"],
        message
      });
    }

    const passwordResult = z.string().min(1, { error: "Heslo je povinný údaj" }).safeParse(data.password);

    if (!passwordResult.success) {
      const message = passwordResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.password,
        path: ["password"],
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

export { useCreateUserFormValidation };
