const createOneRecord = ({
  id = '1',
  itemId = '1',
  materialId = '1',
}: {
  id?: string;
  itemId?: string;
  materialId?: string;
} = {}) => {
  return {
    id,
    itemId,
    materialId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const createManyRecords = ({ length = 10 }: { length?: number } = {}) => {
  return Array.from({ length }, (_, i) =>
    createOneRecord({
      id: String(i),
      materialId: `${i + 1}`,
      itemId: `${i + 1}`,
    }),
  );
};

export { createOneRecord, createManyRecords };
