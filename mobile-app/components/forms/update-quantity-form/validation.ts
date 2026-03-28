import { z } from "zod/v4";
import { UPDATE_QUANTITY_FORM_SCHEMA } from "./schema";

const useUpdateQuantityFormValidation = () => {
  return UPDATE_QUANTITY_FORM_SCHEMA.check((ctx) => {
    const data = ctx.value;

    const isMarkedResult = z.boolean().safeParse(data.isMarked);

    if (!isMarkedResult.success) {
      const message = isMarkedResult.error.issues[0].message;
      ctx.issues.push({
        code: "custom",
        input: data.isMarked,
        path: ["isMarked"],
        message
      });
    }

    const rawInput = data.input.trim();

    if (rawInput === "") {
      ctx.issues.push({
        code: "custom",
        input: data.input,
        path: ["input"],
        message: "Váha je povinný údaj"
      });
      return;
    }

    const numberInput = Number.parseFloat(rawInput.replace(",", "."));

    if (!Number.isFinite(numberInput) || numberInput <= 0) {
      ctx.issues.push({
        code: "custom",
        input: data.input,
        path: ["input"],
        message: "Zadejte platnou váhu"
      });
    }

    const rawOutput = data.output.trim();

    if (rawOutput === "") {
      ctx.issues.push({
        code: "custom",
        input: data.output,
        path: ["output"],
        message: "Váha je povinný údaj"
      });
      return;
    }

    const numberOutput = Number.parseFloat(rawOutput.replace(",", "."));

    if (!Number.isFinite(numberOutput) || numberOutput <= 0) {
      ctx.issues.push({
        code: "custom",
        input: data.output,
        path: ["output"],
        message: "Zadejte platnou váhu"
      });
    }
  });
};

export { useUpdateQuantityFormValidation };
