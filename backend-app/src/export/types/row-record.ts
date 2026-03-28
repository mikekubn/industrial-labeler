import type { Status } from 'generated/prisma/enums';

export interface RowRecord {
  quantities: {
    input: number;
    output: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isMarked: boolean;
    stateCode: Status;
    recordId: string;
  }[];
  item: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  };
  material: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  itemId: string;
  materialId: string;
}
