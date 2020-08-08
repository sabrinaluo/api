import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Types of helmet is incorrect
  app.use(helmet());

  app.enableCors({
    origin: configService.get('corsWhitelistOrigin'),
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const options = new DocumentBuilder()
    .setTitle('Hiitea API Docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  app.use(express.static('public'));

  const port = configService.get('PORT');
  await app.listen(port);
  console.info('App starts on port:', port);
}

bootstrap();
