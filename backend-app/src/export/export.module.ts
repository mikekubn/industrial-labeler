import { Module } from '@nestjs/common';
import { RecordModule } from '../record/record.module';

import { ExportController } from './export.controller';
import { ExportService } from './export.service';

@Module({
  controllers: [ExportController],
  imports: [RecordModule],
  providers: [ExportService],
})
export class ExportModule {}
