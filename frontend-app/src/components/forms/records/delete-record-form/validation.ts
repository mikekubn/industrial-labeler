import { z } from "zod/v4";
import { DELETE_RECORD_FORM_SCHEMA } from "./schema";

const useDeleteRecordFormValidation = () => {
  return DELETE_RECORD_FORM_SCHEMA.check((ctx) => {
    const data = ctx.value;

    const recordIdResult = z.string().min(1, { error: "Záznam je povinný údaj" }).safeParse(data.recordId);

    if (!recordIdResult.success) {
      const message = recordIdResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.recordId,
        path: ["recordId"],
        message
      });
    }
  });
};

export { useDeleteRecordFormValidation };
