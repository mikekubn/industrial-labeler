import { z } from "zod/v4";

const CREATE_ITEM_FORM_SCHEMA = z.object({
  name: z.string()
});

type CreateItemFormSchema = z.infer<typeof CREATE_ITEM_FORM_SCHEMA>;

export { CREATE_ITEM_FORM_SCHEMA, type CreateItemFormSchema };
