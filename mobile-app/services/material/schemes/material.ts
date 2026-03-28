import { z } from "zod/v4";

const MATERIAL_RESPONSE_SCHEMA = z.object({
  id: z.string(),
  name: z.string()
});

const MATERIAL_LIST_RESPONSE_SCHEMA = z.array(MATERIAL_RESPONSE_SCHEMA);

const MATERIAL_REQUEST_SCHEMA = z.object({
  name: z.string()
});

const MATERIAL_ID_QUERY_SCHEMA = z.object({
  id: z.string()
});

type MaterialResponseSchema = z.infer<typeof MATERIAL_RESPONSE_SCHEMA>;
type MaterialRequestSchema = z.infer<typeof MATERIAL_REQUEST_SCHEMA>;
type MaterialListResponseSchema = z.infer<typeof MATERIAL_LIST_RESPONSE_SCHEMA>;
type MaterialIdQuerySchema = z.infer<typeof MATERIAL_ID_QUERY_SCHEMA>;

export {
  MATERIAL_ID_QUERY_SCHEMA,
  MATERIAL_LIST_RESPONSE_SCHEMA,
  MATERIAL_REQUEST_SCHEMA,
  MATERIAL_RESPONSE_SCHEMA,
  type MaterialIdQuerySchema,
  type MaterialListResponseSchema,
  type MaterialRequestSchema,
  type MaterialResponseSchema
};
