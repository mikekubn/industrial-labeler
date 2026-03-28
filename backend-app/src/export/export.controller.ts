import type { Response } from 'express';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { QueryRecordDto } from 'src/record/dto/query-record.dto';
import { ExportService } from './export.service';

@ApiTags('export')
@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('xls')
  public async exportExcel(
    @Query() query: QueryRecordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.exportService.exportExcel(query);

    res.header(
      'Content-Disposition',
      'attachment; filename=export_records.xlsx',
    );
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(result);
  }
}
