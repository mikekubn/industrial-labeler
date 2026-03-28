import { z } from "zod/v4";
import { LOGIN_FORM_SCHEMA } from "./schema";

const useLoginFormValidation = () => {
  return LOGIN_FORM_SCHEMA.check((ctx) => {
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
  });
};

export { useLoginFormValidation };
