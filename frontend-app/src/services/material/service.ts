import { BaseFetcher } from "../core/base-fetcher";
import { getApiBaseUrl } from "../utils/get-api-base-url";

import {
  MATERIAL_LIST_RESPONSE_SCHEMA,
  MATERIAL_REQUEST_SCHEMA,
  MATERIAL_RESPONSE_SCHEMA,
  type MaterialIdQuerySchema,
  type MaterialListResponseSchema,
  type MaterialRequestSchema,
  type MaterialResponseSchema
} from "./schemes/material";

class MaterialService extends BaseFetcher {
  constructor() {
    const baseUrl = getApiBaseUrl();
    super({
      baseUrl
    });
  }

  public createMaterial = async (payload: MaterialRequestSchema): Promise<MaterialResponseSchema | null> => {
    const response = await this.post<MaterialRequestSchema, MaterialResponseSchema>(
      `/api/v1/materials`,
      payload,
      MATERIAL_REQUEST_SCHEMA,
      MATERIAL_RESPONSE_SCHEMA
    );

    return response;
  };

  public getMaterialById = async (query: MaterialIdQuerySchema): Promise<MaterialResponseSchema | null> => {
    const { id } = query;

    const response = await this.get<MaterialResponseSchema>(`/api/v1/materials/${id}`, MATERIAL_RESPONSE_SCHEMA);

    return response;
  };

  public getAllMaterials = async (): Promise<MaterialListResponseSchema | null> => {
    const response = await this.get<MaterialListResponseSchema>(`/api/v1/materials`, MATERIAL_LIST_RESPONSE_SCHEMA);

    return response;
  };

  public deleteMaterialById = async (query: MaterialIdQuerySchema): Promise<MaterialResponseSchema | null> => {
    const { id } = query;

    const response = await this.delete<MaterialResponseSchema>(`/api/v1/materials/${id}`, MATERIAL_RESPONSE_SCHEMA);

    return response;
  };
}

let materialServiceInstance: MaterialService | null = null;

const getMaterialService = () => {
  if (!materialServiceInstance) {
    materialServiceInstance = new MaterialService();
  }
  return materialServiceInstance;
};

export { getMaterialService };
