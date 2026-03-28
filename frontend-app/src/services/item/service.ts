import { BaseFetcher } from "../core/base-fetcher";
import { getApiBaseUrl } from "../utils/get-api-base-url";

import {
  ITEM_LIST_RESPONSE_SCHEMA,
  ITEM_REQUEST_SCHEMA,
  ITEM_RESPONSE_SCHEMA,
  type ItemIdQuerySchema,
  type ItemListResponseSchema,
  type ItemRequestSchema,
  type ItemResponseSchema
} from "./schemes/item";

class ItemService extends BaseFetcher {
  constructor() {
    const baseUrl = getApiBaseUrl();
    super({
      baseUrl
    });
  }

  public createItem = async (payload: ItemRequestSchema): Promise<ItemResponseSchema | null> => {
    const response = await this.post<ItemRequestSchema, ItemResponseSchema>(
      `/api/v1/items`,
      payload,
      ITEM_REQUEST_SCHEMA,
      ITEM_RESPONSE_SCHEMA
    );

    return response;
  };

  public getItemById = async (query: ItemIdQuerySchema): Promise<ItemResponseSchema | null> => {
    const { id } = query;

    const response = await this.get<ItemResponseSchema>(`/api/v1/items/${id}`, ITEM_RESPONSE_SCHEMA);

    return response;
  };

  public getAllItems = async (): Promise<ItemListResponseSchema | null> => {
    const response = await this.get<ItemListResponseSchema>(`/api/v1/items`, ITEM_LIST_RESPONSE_SCHEMA);

    return response;
  };

  public deleteItemById = async (query: ItemIdQuerySchema): Promise<ItemResponseSchema | null> => {
    const { id } = query;

    const response = await this.delete<ItemResponseSchema>(`/api/v1/items/${id}`, ITEM_RESPONSE_SCHEMA);

    return response;
  };
}

let itemServiceInstance: ItemService | null = null;

const getItemService = () => {
  if (!itemServiceInstance) {
    itemServiceInstance = new ItemService();
  }
  return itemServiceInstance;
};

export { getItemService };
