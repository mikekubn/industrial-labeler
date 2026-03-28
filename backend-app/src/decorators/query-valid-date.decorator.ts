import { applyDecorators } from '@nestjs/common';

import { Transform } from 'class-transformer';
import { fromUnixTime, isDate } from 'date-fns';

export function TransformQueryToValidDate() {
  return applyDecorators(
    Transform(({ value }) => {
      if (isDate(value)) {
        return value;
      }

      if (value) {
        const date = isNaN(value)
          ? fromUnixTime(value)
          : fromUnixTime(Number(value));

        return date;
      }

      return value;
    }),
  );
}
