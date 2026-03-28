import { z } from "zod/v4";
import { CREATE_RECORD_FORM_SCHEMA } from "./schema";

const useCreateRecordFormValidation = () => {
  return CREATE_RECORD_FORM_SCHEMA.check((ctx) => {
    const data = ctx.value;

    const itemIdResult = z.string().min(1, { error: "Položka je povinný údaj" }).safeParse(data.itemId);

    if (!itemIdResult.success) {
      const message = itemIdResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.itemId,
        path: ["itemId"],
        message
      });
    }

    const materialIdResult = z.string().min(1, { error: "Materiál je povinný údaj" }).safeParse(data.materialId);

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

export { useCreateRecordFormValidation };
