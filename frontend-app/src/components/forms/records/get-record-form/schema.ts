import { z } from "zod/v4";

const GET_RECORD_FORM_SCHEMA = z.object({
  recordId: z.string()
});

type GetRecordFormSchema = z.infer<typeof GET_RECORD_FORM_SCHEMA>;

export { GET_RECORD_FORM_SCHEMA, type GetRecordFormSchema };
