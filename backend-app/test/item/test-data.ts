const createOneItem = ({ name = 'ITEM_TEST_01' }: { name?: string } = {}) => ({
  id: '1',
  name,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createManyItems = ({ length = 4 }: { length?: number } = {}) =>
  Array.from({ length }, (_, index) =>
    createOneItem({ name: `ITEM_TEST_${index + 1}` }),
  );

export { createOneItem, createManyItems };
