import { z } from "zod/v4";

const QUANTITY_REQUEST_SCHEMA = z.object({
  isMarked: z.boolean(),
  output: z.number(),
  input: z.number()
});

const QUANTITY_CREATE_REQUEST_SCHEMA = z.object({
  recordId: z.string(),
  input: z.number()
});

const QUANTITY_UPDATE_REQUEST_SCHEMA_PAYLOAD = z.object({
  id: z.string(),
  data: QUANTITY_REQUEST_SCHEMA
});

const QUANTITY_RESPONSE_SCHEMA = z.object({
  id: z.string(),
  stateCode: z.string(),
  isMarked: z.boolean(),
  input: z.number(),
  output: z.number()
});

const QUANTITY_ID_REQUEST_SCHEMA = z.object({
  id: z.string()
});

type QuantityRequestSchema = z.infer<typeof QUANTITY_REQUEST_SCHEMA>;
type QuantityUpdateRequestSchemaPayload = z.infer<typeof QUANTITY_UPDATE_REQUEST_SCHEMA_PAYLOAD>;
type QuantityCreateRequestSchema = z.infer<typeof QUANTITY_CREATE_REQUEST_SCHEMA>;
type QuantityResponseSchema = z.infer<typeof QUANTITY_RESPONSE_SCHEMA>;
type QuantityIdRequestSchema = z.infer<typeof QUANTITY_ID_REQUEST_SCHEMA>;

export {
  QUANTITY_CREATE_REQUEST_SCHEMA,
  QUANTITY_ID_REQUEST_SCHEMA,
  QUANTITY_REQUEST_SCHEMA,
  QUANTITY_RESPONSE_SCHEMA,
  QUANTITY_UPDATE_REQUEST_SCHEMA_PAYLOAD,
  type QuantityCreateRequestSchema,
  type QuantityIdRequestSchema,
  type QuantityRequestSchema,
  type QuantityResponseSchema,
  type QuantityUpdateRequestSchemaPayload
};
