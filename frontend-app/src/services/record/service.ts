import { BaseFetcher } from "../core/base-fetcher";
import { getApiBaseUrl } from "../utils/get-api-base-url";

import {
  RECORD_CREATE_REQUEST_SCHEMA,
  RECORD_ID_RESPONSE_SCHEMA,
  RECORD_RESPONSE_SCHEMA,
  RECORDS_RESPONSE_SCHEMA,
  type RecordCreateRequestSchema,
  type RecordIdQuerySchema,
  type RecordIdResponseSchema,
  type RecordRequestPayloadSchema,
  type RecordResponseSchema,
  type RecordsResponseSchema
} from "./schemes/recod";

class RecordService extends BaseFetcher {
  constructor() {
    const baseUrl = getApiBaseUrl();
    super({
      baseUrl
    });
  }

  public createRecord = async (payload: RecordCreateRequestSchema): Promise<RecordIdResponseSchema | null> => {
    const response = await this.post<RecordCreateRequestSchema, RecordIdResponseSchema>(
      `/api/v1/records`,
      payload,
      RECORD_CREATE_REQUEST_SCHEMA,
      RECORD_ID_RESPONSE_SCHEMA
    );

    return response;
  };

  public getRecordById = async (query: RecordIdQuerySchema): Promise<RecordResponseSchema | null> => {
    const { id } = query;

    const response = await this.get<RecordResponseSchema>(`/api/v1/records/${id}`, RECORD_RESPONSE_SCHEMA);

    return response;
  };

  public getAllRecords = async ({
    from,
    to,
    isMarked,
    page,
    limit
  }: RecordRequestPayloadSchema): Promise<RecordsResponseSchema | null> => {
    const response = await this.get<RecordsResponseSchema>(
      `/api/v1/records?from=${from}&to=${to}&isMarked=${isMarked}&page=${page}&limit=${limit}`,
      RECORDS_RESPONSE_SCHEMA
    );

    return response;
  };

  public deleteRecord = async (query: RecordIdQuerySchema): Promise<RecordIdResponseSchema | null> => {
    const { id } = query;

    const response = await this.delete<RecordIdResponseSchema>(`/api/v1/records/${id}`, RECORD_ID_RESPONSE_SCHEMA);

    return response;
  };
}

let recordServiceInstance: RecordService | null = null;

const getRecordService = () => {
  if (!recordServiceInstance) {
    recordServiceInstance = new RecordService();
  }
  return recordServiceInstance;
};

export { getRecordService };
