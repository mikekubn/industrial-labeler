import { BaseFetcher } from "../core/base-fetcher";
import { getApiBaseUrl } from "../utils/get-api-base-url";

import {
  REQUEST_PASSWORD_TOKEN_RESPONSE_SCHEMA,
  type RequestPasswordTokenRequestSchema,
  type RequestPasswordTokenResponseSchema
} from "./schemes/request-password-token";
import {
  UPDATE_ROLE_REQUEST_SCHEMA,
  UPDATE_ROLE_RESPONSE_SCHEMA,
  type UpdateRoleRequestSchema,
  type UpdateRoleResponseSchema
} from "./schemes/update-role";

class InternalService extends BaseFetcher {
  constructor() {
    const baseUrl = getApiBaseUrl();
    super({
      baseUrl
    });
  }

  public updateRole = async (payload: UpdateRoleRequestSchema): Promise<UpdateRoleResponseSchema | null> => {
    const response = await this.patch<UpdateRoleRequestSchema, UpdateRoleResponseSchema>(
      `/api/v1/internals/update-role`,
      payload,
      UPDATE_ROLE_REQUEST_SCHEMA,
      UPDATE_ROLE_RESPONSE_SCHEMA
    );

    return response;
  };

  public getRequestPasswordToken = async (
    payload: RequestPasswordTokenRequestSchema
  ): Promise<RequestPasswordTokenResponseSchema | null> => {
    const { email } = payload;
    const response = await this.get<RequestPasswordTokenResponseSchema>(
      `/api/v1/internals/token?email=${email}`,
      REQUEST_PASSWORD_TOKEN_RESPONSE_SCHEMA
    );

    return response;
  };
}

let internalServiceInstance: InternalService | null = null;

const getInternalService = () => {
  if (!internalServiceInstance) {
    internalServiceInstance = new InternalService();
  }
  return internalServiceInstance;
};

export { getInternalService };
