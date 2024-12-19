import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('StarWars API Hexagonal')
    .setDescription('API para gestionar personajes favoritos e integrar SWAPI')
    .addServer('Local', `http://localhost:${process.env.PORT || 3000}/api-docs`)
    .addServer('AWS', `https://qz9kyxwn21.execute-api.us-east-2.amazonaws.com/api-docs`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Aplicar el filtro de excepciones global
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicación corriendo en http://localhost:${port}`);
  console.log(
    `Documentación de Swagger disponible en http://localhost:${port}/api-docs`,
  );
}

bootstrap();
