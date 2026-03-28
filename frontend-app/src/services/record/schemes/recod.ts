import { z } from "zod/v4";

const RECORD_RESPONSE_SCHEMA = z.object({
  id: z.string(),
  item: z.object({
    id: z.string(),
    name: z.string()
  }),
  material: z.object({
    id: z.string(),
    name: z.string()
  }),
  quantities: z.array(
    z.object({
      id: z.string(),
      input: z.number(),
      output: z.number(),
      isMarked: z.boolean(),
      stateCode: z.enum(["CREATED", "IN_PROGRESS", "COMPLETED"])
    })
  )
});

const RECORDS_RESPONSE_SCHEMA = z.object({
  data: z.array(RECORD_RESPONSE_SCHEMA),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
});

const RECORD_REQUEST_PAYLOAD_SCHEMA = z.object({
  from: z.string(),
  to: z.string(),
  isMarked: z.boolean(),
  page: z.number(),
  limit: z.number()
});

const RECORD_CREATE_REQUEST_SCHEMA = z.object({
  itemId: z.string(),
  materialId: z.string()
});

const RECORD_ID_RESPONSE_SCHEMA = z.object({
  id: z.string()
});

const RECORD_ID_QUERY_SCHEMA = z.object({
  id: z.string()
});

type RecordResponseSchema = z.infer<typeof RECORD_RESPONSE_SCHEMA>;
type RecordRequestPayloadSchema = z.infer<typeof RECORD_REQUEST_PAYLOAD_SCHEMA>;
type RecordsResponseSchema = z.infer<typeof RECORDS_RESPONSE_SCHEMA>;
type RecordIdQuerySchema = z.infer<typeof RECORD_ID_QUERY_SCHEMA>;
type RecordCreateRequestSchema = z.infer<typeof RECORD_CREATE_REQUEST_SCHEMA>;
type RecordIdResponseSchema = z.infer<typeof RECORD_ID_RESPONSE_SCHEMA>;

export {
  RECORD_RESPONSE_SCHEMA,
  RECORDS_RESPONSE_SCHEMA,
  RECORD_REQUEST_PAYLOAD_SCHEMA,
  RECORD_ID_QUERY_SCHEMA,
  RECORD_CREATE_REQUEST_SCHEMA,
  RECORD_ID_RESPONSE_SCHEMA,
  type RecordResponseSchema,
  type RecordRequestPayloadSchema,
  type RecordsResponseSchema,
  type RecordIdQuerySchema,
  type RecordCreateRequestSchema,
  type RecordIdResponseSchema
};
