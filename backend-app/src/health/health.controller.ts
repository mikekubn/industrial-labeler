import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

import { DatabaseService } from 'src/database/database.service';

@AllowAnonymous()
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaHealthIndicator,
    private databaseService: DatabaseService,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get('liveness')
  @HealthCheck()
  liveness() {
    const bytes = 150;
    const megabytes = bytes * 1024 * 1024;

    return this.health.check([
      () => this.memory.checkHeap('memory_heap', megabytes),
    ]);
  }

  @Get('readiness')
  @HealthCheck()
  public readiness() {
    return this.health.check([
      () => this.prisma.pingCheck('database', this.databaseService),
    ]);
  }
}
