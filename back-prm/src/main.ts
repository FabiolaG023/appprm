import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import { appConstants } from './constans';
import * as express from 'express';
import * as path from 'path';

import { urlencoded, json } from 'express';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');
  app.setGlobalPrefix('api/prm');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));

 app.use( express.static(path.join(__dirname,'..', 'public')));
 
 app.use(json({ limit: '50mb' }));
 app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(appConstants.port);
  logger.log(`App Running on port ${appConstants.port}`);

}
bootstrap();
