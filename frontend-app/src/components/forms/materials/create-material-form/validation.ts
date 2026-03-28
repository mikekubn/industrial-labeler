import { z } from "zod/v4";
import { CREATE_MATERIAL_FORM_SCHEMA } from "./schema";

const useCreateMaterialFormValidation = () => {
  return CREATE_MATERIAL_FORM_SCHEMA.check((ctx) => {
    const data = ctx.value;

    const nameResult = z.string().min(1, { error: "Položka je povinný údaj" }).safeParse(data.name);

    if (!nameResult.success) {
      const message = nameResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.name,
        path: ["name"],
        message
      });
    }
  });
};

export { useCreateMaterialFormValidation };
