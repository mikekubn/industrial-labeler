import type { Column } from 'exceljs';

const columns = (
  maxQuantities: number,
  uniqueMaterials: string[],
): Partial<Column>[] => [
  { header: 'Id', key: 'id', hidden: true },
  ...uniqueMaterials.map((materialName, index) => {
    const match = materialName.match(/_(\d+)$/i);
    const titleSuffix = match ? match[1] : String(index + 1);

    return {
      header: `Materiál ${titleSuffix}`,
      key: `material_${titleSuffix}`,
      width: 20,
    };
  }),
  {
    header: 'Položka',
    key: 'item',
    width: 20,
  },
  ...Array.from({ length: maxQuantities }, (_, index) => {
    const i = index + 1;
    return [
      {
        header: `${i} | Vstupní Váha / kg`,
        key: `input_weight_${i}`,
        width: 22,
      },
      {
        header: `${i} | Vystupní Váha / kg`,
        key: `output_weight_${i}`,
        width: 22,
      },
      {
        header: `${i} | Označená Váha`,
        key: `marked_weight_${i}`,
        width: 22,
      },
    ];
  }).flat(),
  {
    header: 'Celková vstupní váha / kg',
    key: 'total_input_weight',
    width: 24,
  },
  {
    header: 'Celková výstupní váha / kg',
    key: 'total_output_weight',
    width: 24,
  },
];

export { columns };
