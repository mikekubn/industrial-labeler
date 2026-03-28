import { z } from "zod/v4";
import { INPUT_FORM_SCHEMA, WEIGHT_INPUT_FORM_SCHEMA } from "./schema";

const useInputFormValidation = () => {
  return INPUT_FORM_SCHEMA.check((ctx) => {
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

const useWeightInputFormValidation = () => {
  return WEIGHT_INPUT_FORM_SCHEMA.check((ctx) => {
    const data = ctx.value;

    const raw = data.weight.trim();

    if (raw === "") {
      ctx.issues.push({
        code: "custom",
        input: data.weight,
        path: ["weight"],
        message: "Váha je povinný údaj"
      });
      return;
    }

    const number = Number.parseFloat(raw.replace(",", "."));

    if (!Number.isFinite(number) || number <= 0) {
      ctx.issues.push({
        code: "custom",
        input: data.weight,
        path: ["weight"],
        message: "Zadejte platnou váhu"
      });
    }
  });
};

export { useInputFormValidation, useWeightInputFormValidation };
