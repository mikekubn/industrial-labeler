import { z } from "zod/v4";

const UPDATE_QUANTITY_FORM_SCHEMA = z.object({
  isMarked: z.boolean(),
  output: z.string(),
  input: z.string()
});

type UpdateQuantityFormSchema = z.infer<typeof UPDATE_QUANTITY_FORM_SCHEMA>;

export { UPDATE_QUANTITY_FORM_SCHEMA, type UpdateQuantityFormSchema };
