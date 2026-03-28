import { HttpStatus } from '@nestjs/common';

import { ExceptionCode } from 'src/const/exception-code';
import { AppException } from 'src/decorators/app-exception.decorator';

export class RecordAlreadyExistsException extends AppException {
  constructor() {
    super({
      code: ExceptionCode.ALREADY_EXISTS,
      message: 'Record with this material and item already exists',
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}

export class RecordNotFoundException extends AppException {
  constructor() {
    super({
      code: ExceptionCode.NOT_FOUND,
      message: 'Record not found',
      status: HttpStatus.NOT_FOUND,
    });
  }
}

export class RecordHasQuantitiesException extends AppException {
  constructor() {
    super({
      code: ExceptionCode.ALREADY_EXISTS,
      message: 'Record has quantities',
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}
