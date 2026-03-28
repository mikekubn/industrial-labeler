import { z } from "zod/v4";

const RECORD_ITEM_RESPONSE_SCHEMA = z.object({
  id: z.string(),
  name: z.string()
});

const RECORD_MATERIAL_RESPONSE_SCHEMA = z.object({
  id: z.string(),
  name: z.string()
});

const RECORD_RESPONSE_SCHEMA = z.object({
  id: z.string(),
  item: RECORD_ITEM_RESPONSE_SCHEMA,
  material: RECORD_MATERIAL_RESPONSE_SCHEMA,
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

const RECORD_RESPONSE_BY_ITEM_ID_SCHEMA = z.object({
  id: z.string(),
  item: RECORD_ITEM_RESPONSE_SCHEMA,
  material: RECORD_MATERIAL_RESPONSE_SCHEMA
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

const RECORD_ITEM_ID_QUERY_SCHEMA = z.object({
  itemId: z.string()
});

type RecordResponseSchema = z.infer<typeof RECORD_RESPONSE_SCHEMA>;
type RecordResponseByItemIdSchema = z.infer<typeof RECORD_RESPONSE_BY_ITEM_ID_SCHEMA>;
type RecordRequestPayloadSchema = z.infer<typeof RECORD_REQUEST_PAYLOAD_SCHEMA>;
type RecordsResponseSchema = z.infer<typeof RECORDS_RESPONSE_SCHEMA>;
type RecordIdQuerySchema = z.infer<typeof RECORD_ID_QUERY_SCHEMA>;
type RecordCreateRequestSchema = z.infer<typeof RECORD_CREATE_REQUEST_SCHEMA>;
type RecordIdResponseSchema = z.infer<typeof RECORD_ID_RESPONSE_SCHEMA>;
type RecordItemIdQuerySchema = z.infer<typeof RECORD_ITEM_ID_QUERY_SCHEMA>;

export {
  RECORD_CREATE_REQUEST_SCHEMA,
  RECORD_ID_QUERY_SCHEMA,
  RECORD_ID_RESPONSE_SCHEMA,
  RECORD_ITEM_ID_QUERY_SCHEMA,
  RECORD_REQUEST_PAYLOAD_SCHEMA,
  RECORD_RESPONSE_BY_ITEM_ID_SCHEMA,
  RECORD_RESPONSE_SCHEMA,
  RECORDS_RESPONSE_SCHEMA,
  type RecordCreateRequestSchema,
  type RecordIdQuerySchema,
  type RecordIdResponseSchema,
  type RecordItemIdQuerySchema,
  type RecordRequestPayloadSchema,
  type RecordResponseByItemIdSchema,
  type RecordResponseSchema,
  type RecordsResponseSchema
};
