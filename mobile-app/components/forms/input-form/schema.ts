import { z } from "zod/v4";

const INPUT_FORM_SCHEMA = z.object({
  itemId: z.string()
});

const WEIGHT_INPUT_FORM_SCHEMA = z.object({
  weight: z.string()
});

type InputFormSchema = z.infer<typeof INPUT_FORM_SCHEMA>;
type WeightInputFormSchema = z.infer<typeof WEIGHT_INPUT_FORM_SCHEMA>;

export { INPUT_FORM_SCHEMA, type InputFormSchema, WEIGHT_INPUT_FORM_SCHEMA, type WeightInputFormSchema };
