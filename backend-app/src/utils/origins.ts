import { isProduction } from './production';

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002',
  'http://10.0.2.2:3000',
  'http://10.0.2.2:3001',
  'http://10.0.2.2:3002',
  'labeler-app://',
  'labeler-app://**',
  'exp://',
  'exp://**',
  'exp://192.168.*.*:*/**',
];

/**
 * If you want to test in Docker Compose Orchestration, add http://127.0.0.1:3001' to PROD_ORIGINS
 */
const PROD_ORIGINS = ['https://app.example.com', 'labeler-app://'];

const ENABLED_ORIGINS = isProduction
  ? PROD_ORIGINS
  : [...DEV_ORIGINS, ...PROD_ORIGINS];

export { ENABLED_ORIGINS };
