import type { RowRecord } from '../types/row-record';

const rows = (record: RowRecord, uniqueMaterials: string[]) => {
  const materials = uniqueMaterials.reduce(
    (acc: Record<string, string>, materialName, index) => {
      const match = materialName.match(/_(\d+)$/i);
      const titleSuffix = match ? match[1] : String(index + 1);
      acc[`material_${titleSuffix}`] =
        record.material.name === materialName ? 'TRUE' : 'FALSE';
      return acc;
    },
    {},
  );

  return {
    id: record.id,
    ...materials,
    item: record.item.name,
    ...record.quantities.reduce(
      (acc: Record<string, string | number>, quantity, index) => {
        acc[`input_weight_${index + 1}`] = quantity.input;
        acc[`output_weight_${index + 1}`] = quantity.output;
        acc[`marked_weight_${index + 1}`] = quantity.isMarked
          ? 'TRUE'
          : 'FALSE';
        return acc;
      },
      {},
    ),
    ['total_input_weight']: record.quantities.reduce(
      (total, quantity) => total + Number(quantity.input),
      0,
    ),
    ['total_output_weight']: record.quantities.reduce(
      (total, quantity) => total + Number(quantity.output),
      0,
    ),
  };
};

export { rows };
