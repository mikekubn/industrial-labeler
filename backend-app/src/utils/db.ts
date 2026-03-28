import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

import { Pool } from 'pg';
import { extractEnvVariableToString } from './env';

let databaseInstance: PrismaPg | null = null;

const getDatabaseConnection = () => {
  if (!databaseInstance) {
    const connection = extractEnvVariableToString(
      'DATABASE_URL',
      process.env.DATABASE_URL,
    );
    const connectionString = connection;
    const pool = new Pool({
      connectionString,
    });

    databaseInstance = new PrismaPg(pool);
  }
  return databaseInstance;
};

export { getDatabaseConnection };
