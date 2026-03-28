import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Labeler App')
  .setDescription('The Labeler App API description')
  .setVersion('1.0')
  .build();

const setupSwaggerDocument = (app: INestApplication) => {
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/docs', app, documentFactory, {
    jsonDocumentUrl: 'api/v1/openapi.json',
  });
};

export { config, setupSwaggerDocument };
