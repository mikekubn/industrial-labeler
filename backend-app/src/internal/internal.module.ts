import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { InternalController } from './internal.controller';
import { InternalService } from './internal.service';

@Module({
  providers: [InternalService],
  imports: [DatabaseModule],
  controllers: [InternalController],
})
export class InternalModule {}
