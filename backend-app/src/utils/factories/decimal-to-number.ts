import type { Prisma } from 'generated/prisma/client';

const convertDecimalToNumber = (value: Prisma.Decimal) => {
  return value.toNumber() ?? Number(value);
};

export { convertDecimalToNumber };
