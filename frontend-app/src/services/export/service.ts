import { BaseFetcher } from "../core/base-fetcher";
import { getApiBaseUrl } from "../utils/get-api-base-url";

import { EXPORT_BLOB_RESPONSE_SCHEMA, type ExportBlobResponseSchema, type ExportRequestSchema } from "./schemes/export";

class ExportService extends BaseFetcher {
  constructor() {
    const baseUrl = getApiBaseUrl();
    super({
      baseUrl
    });
  }

  public exportXlsx = async ({
    from,
    to,
    isMarked,
    limit
  }: ExportRequestSchema): Promise<ExportBlobResponseSchema | null> => {
    const response = await this.get<ExportBlobResponseSchema>(
      `/api/v1/export/xls?from=${from}&to=${to}&isMarked=${isMarked}&limit=${limit}`,
      EXPORT_BLOB_RESPONSE_SCHEMA,
      { blob: true }
    );
    return response;
  };
}

let exportServiceInstance: ExportService | null = null;

const getExportService = () => {
  if (!exportServiceInstance) {
    exportServiceInstance = new ExportService();
  }
  return exportServiceInstance;
};

export { getExportService };
