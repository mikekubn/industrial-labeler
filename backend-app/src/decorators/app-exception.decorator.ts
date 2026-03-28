import type { HttpStatus } from '@nestjs/common';
import type { ExceptionCodeType } from 'src/const/exception-code';
import { HttpException } from '@nestjs/common';

interface AppExceptionParams {
  code: ExceptionCodeType;
  message: string;
  status: HttpStatus;
  description?: string;
}

export class AppException extends HttpException {
  constructor({ code, message, status, description }: AppExceptionParams) {
    super(
      {
        code,
        message,
        status,
        timestamp: new Date().toISOString(),
        description,
      },
      status,
    );
  }
}
