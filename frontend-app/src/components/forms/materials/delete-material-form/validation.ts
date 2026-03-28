import { z } from "zod/v4";
import { DELETE_MATERIAL_FORM_SCHEMA } from "./schema";

const useDeleteMaterialFormValidation = () => {
  return DELETE_MATERIAL_FORM_SCHEMA.check((ctx) => {
    const data = ctx.value;

    const materialIdResult = z.string().min(1, { error: "Položka je povinný údaj" }).safeParse(data.materialId);

    if (!materialIdResult.success) {
      const message = materialIdResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.materialId,
        path: ["materialId"],
        message
      });
    }
  });
};

export { useDeleteMaterialFormValidation };
