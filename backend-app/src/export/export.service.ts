import { Injectable, Logger } from '@nestjs/common';

import * as ExcelJs from 'exceljs';
import { QueryRecordDto } from 'src/record/dto/query-record.dto';
import { RecordService } from 'src/record/record.service';
import { columns } from './factories/columns';
import { conditionContainsText } from './factories/conditions';
import { rows } from './factories/rows';
import { alignment, font } from './factories/worksheet-style';

@Injectable()
export class ExportService {
  private readonly logger = new Logger(ExportService.name);

  constructor(private recordService: RecordService) {}

  public async exportExcel(query: QueryRecordDto) {
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('export_records');

    const records = await this.recordService.findAll(query);
    const maxQuantities = Math.max(
      ...records.data.map((record) => record.quantities.length),
      0,
    );

    const uniqueMaterials = Array.from(
      new Set(records.data.map((record) => record.material.name)),
    );

    worksheet.columns = columns(maxQuantities, uniqueMaterials);
    worksheet.getRow(1).font = font;
    worksheet.getRow(1).alignment = alignment;
    records.data.forEach((record) => {
      worksheet.addRow(rows(record, uniqueMaterials));
    });

    worksheet.addConditionalFormatting({
      ...conditionContainsText(),
    });

    const buffer = await workbook.xlsx.writeBuffer();

    this.logger.log(`Exported ${records.data.length} records`);
    return buffer;
  }
}
