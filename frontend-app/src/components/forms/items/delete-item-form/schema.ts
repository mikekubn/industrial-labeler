import { z } from "zod/v4";

const DELETE_ITEM_FORM_SCHEMA = z.object({
  itemId: z.string()
});

type DeleteItemFormSchema = z.infer<typeof DELETE_ITEM_FORM_SCHEMA>;

export { DELETE_ITEM_FORM_SCHEMA, type DeleteItemFormSchema };
