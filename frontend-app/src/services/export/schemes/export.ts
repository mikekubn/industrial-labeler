import z from "zod/v4";

const EXPORT_REQUEST_SCHEMA = z.object({
  from: z.string(),
  to: z.string(),
  isMarked: z.boolean(),
  limit: z.number()
});

const EXPORT_BLOB_RESPONSE_SCHEMA = z.instanceof(Blob);

type ExportBlobResponseSchema = z.infer<typeof EXPORT_BLOB_RESPONSE_SCHEMA>;
type ExportRequestSchema = z.infer<typeof EXPORT_REQUEST_SCHEMA>;

export { EXPORT_REQUEST_SCHEMA, EXPORT_BLOB_RESPONSE_SCHEMA, type ExportBlobResponseSchema, type ExportRequestSchema };
