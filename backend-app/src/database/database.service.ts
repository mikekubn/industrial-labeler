import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';

import { getDatabaseConnection } from 'src/utils/db';

@Injectable()
export class DatabaseService extends PrismaClient {
  constructor() {
    const adapter = getDatabaseConnection();
    super({ adapter, log: ['info', 'warn', 'error'] });
  }
}
