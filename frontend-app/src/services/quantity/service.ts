import { BaseFetcher } from "../core/base-fetcher";
import { getApiBaseUrl } from "../utils/get-api-base-url";

import {
  QUANTITY_CREATE_REQUEST_SCHEMA,
  QUANTITY_REQUEST_SCHEMA,
  QUANTITY_RESPONSE_SCHEMA,
  type QuantityCreateRequestSchema,
  type QuantityRequestSchema,
  type QuantityResponseSchema,
  type QuantityUpdateRequestSchemaPayload
} from "./schemes/quantity";

class QuantityService extends BaseFetcher {
  constructor() {
    const baseUrl = getApiBaseUrl();
    super({
      baseUrl
    });
  }

  public createQuantity = async (payload: QuantityCreateRequestSchema): Promise<QuantityResponseSchema | null> => {
    const response = await this.post<QuantityCreateRequestSchema, QuantityResponseSchema>(
      `/api/v1/quantities`,
      payload,
      QUANTITY_CREATE_REQUEST_SCHEMA,
      QUANTITY_RESPONSE_SCHEMA
    );

    return response;
  };

  public updateQuantity = async (
    payload: QuantityUpdateRequestSchemaPayload
  ): Promise<QuantityResponseSchema | null> => {
    const { id, data } = payload;

    const response = await this.put<QuantityRequestSchema, QuantityResponseSchema>(
      `/api/v1/quantities/${id}`,
      data,
      QUANTITY_REQUEST_SCHEMA,
      QUANTITY_RESPONSE_SCHEMA
    );

    return response;
  };
}

let quantityServiceInstance: QuantityService | null = null;

const getQuantityService = () => {
  if (!quantityServiceInstance) {
    quantityServiceInstance = new QuantityService();
  }
  return quantityServiceInstance;
};

export { getQuantityService };
