import type { ConditionalFormattingOptions } from 'exceljs';

const conditionContainsText = (): ConditionalFormattingOptions => ({
  ref: 'A1:ZZ300',
  rules: [
    {
      type: 'containsText',
      operator: 'containsText',
      text: 'FALSE',
      priority: 1,
      style: {
        alignment: {
          vertical: 'middle',
          horizontal: 'center',
        },
        font: {
          color: { argb: 'FF0000' },
        },
      },
    },
    {
      type: 'containsText',
      operator: 'containsText',
      text: 'TRUE',
      priority: 1,
      style: {
        alignment: {
          vertical: 'middle',
          horizontal: 'center',
        },
        font: {
          color: { argb: 'FF008000' },
        },
      },
    },
  ],
});

export { conditionContainsText };
