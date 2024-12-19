import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('StarWars API Hexagonal')
      .setDescription(
        'API para gestionar personajes favoritos e integrar SWAPI con arquitectura hexagonal',
      )
      .addServer('Local', `http://localhost:${process.env.PORT || 3000}`)
      .addServer('AWS', `https://qz9kyxwn21.execute-api.us-east-2.amazonaws.com/api-docs`)
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('api-docs', nestApp, document);

    nestApp.useGlobalFilters(new AllExceptionsFilter());

    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
