import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { apiReference } from '@scalar/nestjs-api-reference';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './decorators/global-exception-filter.decorator';
import { setupSwaggerDocument } from './swagger';
import { ENABLED_ORIGINS } from './utils/origins';
import { isProduction } from './utils/production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for better-auth
    logger: ['log', 'error', 'warn', 'fatal', 'debug'],
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableShutdownHooks();

  if (!isProduction) {
    setupSwaggerDocument(app);
    app.use(
      '/api/v1/reference',
      apiReference({
        sources: [
          { url: '/api/v1/openapi.json', title: 'Core' },
          { url: '/api/v1/auth/open-api/generate-schema', title: 'Auth' },
        ],
      }),
    );
  }

  app.enableCors({
    origin: ENABLED_ORIGINS,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
