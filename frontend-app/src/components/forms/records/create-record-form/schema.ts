import { z } from "zod/v4";

const CREATE_RECORD_FORM_SCHEMA = z.object({
  itemId: z.string(),
  materialId: z.string()
});

type CreateRecordFormSchema = z.infer<typeof CREATE_RECORD_FORM_SCHEMA>;

export { CREATE_RECORD_FORM_SCHEMA, type CreateRecordFormSchema };
