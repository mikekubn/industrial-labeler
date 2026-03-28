import { Prisma } from 'generated/prisma/client';
import { Status } from 'generated/prisma/enums';

const createOneQuantity = ({
  id = '1',
  recordId = '1',
  input = new Prisma.Decimal(100),
  isMarked = false,
}: {
  id?: string;
  recordId?: string;
  input?: Prisma.Decimal;
  isMarked?: boolean;
} = {}) => ({
  id,
  recordId,
  input,
  output: new Prisma.Decimal(0),
  isMarked,
  stateCode: Status.CREATED,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createManyQuantities = ({ length = 10 }: { length: number }) =>
  Array.from({ length }).map((_, index) =>
    createOneQuantity({ id: String(index), recordId: `${index + 1}` }),
  );

export { createOneQuantity, createManyQuantities };
