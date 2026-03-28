import type { z } from "zod/v4";
import type { BaseServiceConfig, CrudResult, FetchOptions } from "../types";

import { getLogger } from "@/lib/logger";

/**
 * Base fetcher class for CRUD operations
 * Provides common functionality for all API services including:
 * - Token management from session
 * - Request/Response Zod validation
 * - CRUD operations (GET, POST, PUT, PATCH, DELETE)
 * - Error handling and logging
 */
abstract class BaseFetcher {
  protected readonly logger = getLogger();
  protected readonly baseUrl: string;

  constructor(config: BaseServiceConfig) {
    this.baseUrl = config.baseUrl;
  }

  /**
   * Core fetcher method for making HTTP requests
   * Handles authentication, error handling, and response parsing
   */
  protected readonly fetcher = async <T>(url: string, options: FetchOptions = {}): Promise<T | null> => {
    try {
      const { headers = {}, blob, ...fetchOptions } = options;

      /**
       * Build headers
       */
      const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
        ...headers
      };

      /**
       * Make request
       */
      const response = await fetch(url, {
        ...fetchOptions,
        headers: requestHeaders,
        credentials: "include"
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // ignore
        }
        this.logger.error(`${errorMessage}, url: ${url}`);
        throw new Error(errorMessage);
      }

      /**
       * Handle empty responses (e.g., 204 No Content)
       */
      if (response.status === 204 || response.headers.get("content-length") === "0") {
        return null as T;
      }

      if (blob) {
        return response.blob() as Promise<T>;
      }

      return response.json() as Promise<T>;
    } catch (error) {
      this.logger.error(`Error fetching data from ${url}: ${error}`);
      throw error;
    }
  };

  /**
   * GET request
   */
  protected async get<TRes>(
    path: string,
    RESPONSE_SCHEMA: z.ZodType<TRes>,
    options: FetchOptions = {}
  ): Promise<CrudResult<TRes>> {
    try {
      const response = await this.fetcher<TRes>(`${this.baseUrl}${path}`, {
        ...options,
        method: "GET"
      });

      if (response === null) {
        return null;
      }

      const validation = RESPONSE_SCHEMA.safeParse(response);

      if (!validation.success) {
        this.logger.error(`Invalid response from GET ${path}: ${validation.error.message}`);
        throw new Error(`Invalid response from GET ${path}: ${validation.error.message}`);
      }

      return validation.data;
    } catch (error) {
      this.logger.error(`Error in GET ${path}: ${error}`);
      throw error;
    }
  }

  protected async delete<TRes>(
    path: string,
    RESPONSE_SCHEMA: z.ZodType<TRes>,
    options: FetchOptions = {}
  ): Promise<CrudResult<TRes>> {
    try {
      const response = await this.fetcher<TRes>(`${this.baseUrl}${path}`, {
        ...options,
        method: "DELETE"
      });

      if (response === null) {
        return null;
      }

      const validation = RESPONSE_SCHEMA.safeParse(response);

      if (!validation.success) {
        this.logger.error(`Invalid response from DELETE ${path}: ${validation.error.message}`);
        throw new Error(`Invalid response from DELETE ${path}: ${validation.error.message}`);
      }

      return validation.data;
    } catch (error) {
      this.logger.error(`Error in DELETE ${path}: ${error}`);
      throw error;
    }
  }

  protected async patch<TReq, TRes>(
    path: string,
    request: TReq,
    REQUEST_SCHEMA: z.ZodType<TReq>,
    RESPONSE_SCHEMA: z.ZodType<TRes>,
    options: FetchOptions = {}
  ): Promise<CrudResult<TRes>> {
    try {
      const requestValidation = REQUEST_SCHEMA.safeParse(request);

      if (!requestValidation.success) {
        this.logger.error(`Invalid request from PATCH ${path}: ${requestValidation.error.message}`);
        throw new Error(`Invalid request from PATCH ${path}: ${requestValidation.error.message}`);
      }

      const { headers = {}, ...fetchOptions } = options;
      const contentType = (headers["Content-Type"] || headers["content-type"] || "application/json").toString();
      const payload = requestValidation.data;

      let body: BodyInit | undefined;

      if (fetchOptions.body !== undefined) {
        body = fetchOptions.body as BodyInit;
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        const form = new URLSearchParams();
        for (const [k, v] of Object.entries(payload as Record<string, string>)) {
          if (v !== undefined && v !== null) form.append(k, String(v));
        }
        body = form;
      } else {
        body = JSON.stringify(payload);
      }

      const response = await this.fetcher<TRes>(`${this.baseUrl}${path}`, {
        ...options,
        method: "PATCH",
        body
      });

      if (response === null) {
        return null;
      }

      const validation = RESPONSE_SCHEMA.safeParse(response);

      if (!validation.success) {
        this.logger.error(`Invalid response from PATCH ${path}: ${validation.error.message}`);
        throw new Error(`Invalid response from PATCH ${path}: ${validation.error.message}`);
      }

      return validation.data;
    } catch (error) {
      this.logger.error(`Error in PATCH ${path}: ${error}`);
      throw error;
    }
  }

  /**
   * POST request
   * @param path
   * @param request (Request payload)
   * @param REQUEST_SCHEMA (Request schema)
   * @param RESPONSE_SCHEMA (Response schema)
   * @param options (Fetch options)
   */
  protected async post<TReq, TRes>(
    path: string,
    request: TReq,
    REQUEST_SCHEMA: z.ZodType<TReq>,
    RESPONSE_SCHEMA: z.ZodType<TRes>,
    options: FetchOptions = {}
  ): Promise<CrudResult<TRes>> {
    try {
      const requestValidation = REQUEST_SCHEMA.safeParse(request);

      if (!requestValidation.success) {
        this.logger.error(`Invalid request from POST ${path}: ${requestValidation.error.message}`);
        throw new Error(`Invalid request from POST ${path}: ${requestValidation.error.message}`);
      }

      const { headers = {}, ...fetchOptions } = options;
      const contentType = (headers["Content-Type"] || headers["content-type"] || "application/json").toString();
      const payload = requestValidation.data;

      let body: BodyInit | undefined;

      if (fetchOptions.body !== undefined) {
        body = fetchOptions.body as BodyInit;
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        const form = new URLSearchParams();
        for (const [k, v] of Object.entries(payload as Record<string, string>)) {
          if (v !== undefined && v !== null) form.append(k, String(v));
        }
        body = form;
      } else {
        body = JSON.stringify(payload);
      }

      const response = await this.fetcher<TRes>(`${this.baseUrl}${path}`, {
        ...options,
        method: "POST",
        body
      });

      if (response === null) {
        return null;
      }

      const validation = RESPONSE_SCHEMA.safeParse(response);

      if (!validation.success) {
        this.logger.error(`Invalid response from POST ${path}: ${validation.error.message}`);
        throw new Error(`Invalid response from POST ${path}: ${validation.error.message}`);
      }

      return validation.data;
    } catch (error) {
      this.logger.error(`Error in POST ${path}: ${error}`);
      throw error;
    }
  }

  protected async put<TReq, TRes>(
    path: string,
    request: TReq,
    REQUEST_SCHEMA: z.ZodType<TReq>,
    RESPONSE_SCHEMA: z.ZodType<TRes>,
    options: FetchOptions = {}
  ): Promise<CrudResult<TRes>> {
    try {
      const requestValidation = REQUEST_SCHEMA.safeParse(request);

      if (!requestValidation.success) {
        this.logger.error(`Invalid request from PUT ${path}: ${requestValidation.error.message}`);
        throw new Error(`Invalid request from PUT ${path}: ${requestValidation.error.message}`);
      }

      const { headers = {}, ...fetchOptions } = options;
      const contentType = (headers["Content-Type"] || headers["content-type"] || "application/json").toString();
      const payload = requestValidation.data;

      let body: BodyInit | undefined;

      if (fetchOptions.body !== undefined) {
        body = fetchOptions.body as BodyInit;
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        const form = new URLSearchParams();
        for (const [k, v] of Object.entries(payload as Record<string, string>)) {
          if (v !== undefined && v !== null) form.append(k, String(v));
        }
        body = form;
      } else {
        body = JSON.stringify(payload);
      }

      const response = await this.fetcher<TRes>(`${this.baseUrl}${path}`, {
        ...options,
        method: "PUT",
        body
      });

      if (response === null) {
        return null;
      }

      const validation = RESPONSE_SCHEMA.safeParse(response);

      if (!validation.success) {
        this.logger.error(`Invalid response from PUT ${path}: ${validation.error.message}`);
        throw new Error(`Invalid response from PUT ${path}: ${validation.error.message}`);
      }

      return validation.data;
    } catch (error) {
      this.logger.error(`Error in PUT ${path}: ${error}`);
      throw error;
    }
  }
}

export { BaseFetcher };
