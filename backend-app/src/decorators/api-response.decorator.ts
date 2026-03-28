import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, type ApiResponseCommonMetadata } from '@nestjs/swagger';

export interface ApiStandardResponseOptions {
  type?: ApiResponseCommonMetadata['type'];
  description?: string;
  status?: HttpStatus;
  isArray?: boolean;
}

export function ApiStandardResponse(options: ApiStandardResponseOptions = {}) {
  const {
    type,
    description,
    status = HttpStatus.OK,
    isArray = false,
  } = options;

  return applyDecorators(
    ApiResponse({
      status: status,
      description: description || 'Operation successful',
      type,
      isArray,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid request',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Resource not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
}
