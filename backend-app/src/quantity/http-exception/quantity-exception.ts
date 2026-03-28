import { HttpStatus } from '@nestjs/common';
import { ExceptionCode } from '../../const/exception-code';

import { AppException } from 'src/decorators/app-exception.decorator';

export class QuantityNotFoundException extends AppException {
  constructor() {
    super({
      code: ExceptionCode.NOT_FOUND,
      message: 'Quantity not found',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
