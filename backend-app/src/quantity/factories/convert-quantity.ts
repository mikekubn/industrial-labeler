import type { Quantity } from 'generated/prisma/client';

import { convertDecimalToNumber } from 'src/utils/factories/decimal-to-number';

const convertQuantityObjectToDto = (quantity: Quantity) => {
  return {
    ...quantity,
    input: convertDecimalToNumber(quantity.input),
    output: convertDecimalToNumber(quantity.output),
  };
};

export { convertQuantityObjectToDto };
