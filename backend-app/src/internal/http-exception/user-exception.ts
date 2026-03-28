import { HttpStatus } from '@nestjs/common';

import { ExceptionCode } from 'src/const/exception-code';
import { AppException } from 'src/decorators/app-exception.decorator';

export class UserNotFoundException extends AppException {
  constructor() {
    super({
      message: 'User not found',
      code: ExceptionCode.NOT_FOUND,
      status: HttpStatus.NOT_FOUND,
    });
  }
}
