import { HttpStatus } from '@nestjs/common';

import { ExceptionCode } from 'src/const/exception-code';
import { AppException } from 'src/decorators/app-exception.decorator';

export class MaterialAlreadyExistsException extends AppException {
  constructor() {
    super({
      code: ExceptionCode.ALREADY_EXISTS,
      message: 'Material already exists, use another name',
      status: HttpStatus.CONFLICT,
    });
  }
}

export class MaterialHasAnyRecordException extends AppException {
  constructor() {
    super({
      code: ExceptionCode.CONNECTED_RECORD,
      message: 'Material has any record, delete it first',
      status: HttpStatus.CONFLICT,
    });
  }
}

export class MaterialNotFoundException extends AppException {
  constructor() {
    super({
      code: ExceptionCode.NOT_FOUND,
      message: 'Material not found',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
