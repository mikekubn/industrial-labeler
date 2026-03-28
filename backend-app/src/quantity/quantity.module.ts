import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { QuantityController } from './quantity.controller';
import { QuantityService } from './quantity.service';

@Module({
  controllers: [QuantityController],
  providers: [QuantityService],
  imports: [DatabaseModule],
})
export class QuantityModule {}
