import { z } from "zod/v4";
import { REGISTRATION_FORM_SCHEMA } from "./schema";

const useRegistrationFormValidation = () => {
  return REGISTRATION_FORM_SCHEMA.check((ctx) => {
    const data = ctx.value;

    const nameResult = z.string().min(1, { error: "Jméno je povinný údaj" }).safeParse(data.name);

    if (!nameResult.success) {
      const message = nameResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.name,
        path: ["name"],
        message
      });
    }

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

    const passwordResult = z
      .string()
      .min(1, { error: "Heslo je povinný údaj" })
      .refine((value) => value.length >= 6, { error: "Heslo musí mít alespoň 6 znaků" })
      .refine((value) => /[A-Z]/.test(value), { error: "Heslo musí obsahovat velké písmeno" })
      .refine((value) => /[a-z]/.test(value), { error: "Heslo musí obsahovat malé písmeno" })
      .refine((value) => /[0-9]/.test(value), { error: "Heslo musí obsahovat číslo" })
      .refine((value) => value === data.passwordConfirmation, { error: "Hesla se neshodují" })
      .safeParse(data.password);

    if (!passwordResult.success) {
      const message = passwordResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.password,
        path: ["password"],
        message
      });
    }

    const passwordConfirmationResult = z
      .string()
      .min(1, { error: "Heslo je povinný údaj" })
      .refine((value) => value === data.password, { error: "Hesla se neshodují" })
      .safeParse(data.passwordConfirmation);

    if (!passwordConfirmationResult.success) {
      const message = passwordConfirmationResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.passwordConfirmation,
        path: ["passwordConfirmation"],
        message
      });
    }
  });
};

export { useRegistrationFormValidation };
