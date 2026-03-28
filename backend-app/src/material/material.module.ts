import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { RecordModule } from 'src/record/record.module';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

@Module({
  imports: [DatabaseModule, RecordModule],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
