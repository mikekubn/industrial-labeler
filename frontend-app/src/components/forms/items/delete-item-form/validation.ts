import { z } from "zod/v4";
import { DELETE_ITEM_FORM_SCHEMA } from "./schema";

const useDeleteItemFormValidation = () => {
  return DELETE_ITEM_FORM_SCHEMA.check((ctx) => {
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
  });
};

export { useDeleteItemFormValidation };
