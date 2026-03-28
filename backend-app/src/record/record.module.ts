import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  controllers: [RecordController],
  providers: [RecordService],
  imports: [DatabaseModule],
  exports: [RecordService],
})
export class RecordModule {}
