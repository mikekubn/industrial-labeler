import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from '@thallesp/nestjs-better-auth';

import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { ExportModule } from './export/export.module';
import { HealthModule } from './health/health.module';
import { InternalModule } from './internal/internal.module';
import { ItemModule } from './item/item.module';
import { MaterialModule } from './material/material.module';
import { QuantityModule } from './quantity/quantity.module';
import { RecordModule } from './record/record.module';
import { getAuth } from './utils/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    AuthModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (
        eventEmitter: EventEmitter2,
        databaseService: DatabaseService,
      ) => ({
        auth: getAuth({
          eventEmitter,
          logger: new Logger(AuthModule.name),
          prisma: databaseService,
        }),
      }),
      inject: [EventEmitter2, DatabaseService],
    }),
    RecordModule,
    QuantityModule,
    ItemModule,
    MaterialModule,
    ExportModule,
    DatabaseModule,
    HealthModule,
    InternalModule,
  ],
})
export class AppModule {}
