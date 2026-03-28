import { z } from "zod/v4";

const DELETE_RECORD_FORM_SCHEMA = z.object({
  recordId: z.string()
});

type DeleteRecordFormSchema = z.infer<typeof DELETE_RECORD_FORM_SCHEMA>;

export { DELETE_RECORD_FORM_SCHEMA, type DeleteRecordFormSchema };
