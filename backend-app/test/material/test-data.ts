const createOneMaterial = ({
  name = 'MATERIAL_TEST_01',
}: {
  name?: string;
} = {}) => ({
  id: '1',
  name,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createManyMaterials = ({ length = 4 }: { length?: number } = {}) =>
  Array.from({ length }, (_, index) =>
    createOneMaterial({ name: `MATERIAL_TEST_${index + 1}` }),
  );

export { createOneMaterial, createManyMaterials };
