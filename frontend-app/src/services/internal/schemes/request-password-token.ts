import { z } from "zod/v4";

const REQUEST_PASSWORD_TOKEN_RESPONSE_SCHEMA = z.object({
  token: z.string()
});

const REQUEST_PASSWORD_TOKEN_REQUEST_SCHEMA = z.object({
  email: z.string()
});

type RequestPasswordTokenResponseSchema = z.infer<typeof REQUEST_PASSWORD_TOKEN_RESPONSE_SCHEMA>;
type RequestPasswordTokenRequestSchema = z.infer<typeof REQUEST_PASSWORD_TOKEN_REQUEST_SCHEMA>;

export {
  REQUEST_PASSWORD_TOKEN_RESPONSE_SCHEMA,
  REQUEST_PASSWORD_TOKEN_REQUEST_SCHEMA,
  type RequestPasswordTokenResponseSchema,
  type RequestPasswordTokenRequestSchema
};
