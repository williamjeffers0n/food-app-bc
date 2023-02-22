import { NestFactory } from '@nestjs/core';

import {SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {swaggerOptions} from './options/swagger.options';
import {HttpExceptionFilter} from './filters/http-exception.filter';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const filters = process.env.APP_ENVIRONMENT === 'development'
      ? new AllExceptionsFilter()
      : new HttpExceptionFilter();
  app.useGlobalFilters(filters);

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(3000);
}

bootstrap().then();
