import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { RecordModule } from 'src/record/record.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [DatabaseModule, RecordModule],
})
export class ItemModule {}
