import type { Alignment } from 'exceljs';

const font = {
  bold: true,
  size: 12,
};

const alignment: Partial<Alignment> = {
  horizontal: 'center',
  vertical: 'middle',
};

export { font, alignment };
