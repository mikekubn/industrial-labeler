import { z } from "zod/v4";

const ITEM_RESPONSE_SCHEMA = z.object({
  id: z.string(),
  name: z.string()
});

const ITEM_LIST_RESPONSE_SCHEMA = z.array(ITEM_RESPONSE_SCHEMA);

const ITEM_REQUEST_SCHEMA = z.object({
  name: z.string()
});

const ITEM_ID_QUERY_SCHEMA = z.object({
  id: z.string()
});

type ItemResponseSchema = z.infer<typeof ITEM_RESPONSE_SCHEMA>;
type ItemRequestSchema = z.infer<typeof ITEM_REQUEST_SCHEMA>;
type ItemListResponseSchema = z.infer<typeof ITEM_LIST_RESPONSE_SCHEMA>;
type ItemIdQuerySchema = z.infer<typeof ITEM_ID_QUERY_SCHEMA>;

export {
  ITEM_ID_QUERY_SCHEMA,
  ITEM_LIST_RESPONSE_SCHEMA,
  ITEM_REQUEST_SCHEMA,
  ITEM_RESPONSE_SCHEMA,
  type ItemIdQuerySchema,
  type ItemListResponseSchema,
  type ItemRequestSchema,
  type ItemResponseSchema
};
