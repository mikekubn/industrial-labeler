import { HttpStatus } from '@nestjs/common';

import { ExceptionCode } from 'src/const/exception-code';
import { AppException } from 'src/decorators/app-exception.decorator';

export class ItemAlreadyExistsException extends AppException {
  constructor() {
    super({
      code: ExceptionCode.ALREADY_EXISTS,
      message: 'Item already exists, use another name',
      status: HttpStatus.CONFLICT,
    });
  }
}

export class ItemNotFoundException extends AppException {
  constructor() {
    super({
      code: ExceptionCode.NOT_FOUND,
      message: 'Item not found',
      status: HttpStatus.NOT_FOUND,
    });
  }
}

export class ItemHasAnyRecordException extends AppException {
  constructor() {
    super({
      code: ExceptionCode.CONNECTED_RECORD,
      message: 'Item can not be deleted, has any record',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
