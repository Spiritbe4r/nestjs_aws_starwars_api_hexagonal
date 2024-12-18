# API Gestor de Personajes Favoritos de Star Wars

![Star Wars](https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg)

## Descripción

**API Gestor de Personajes Favoritos de Star Wars** es una aplicación backend desarrollada con **NestJS** que permite a los usuarios gestionar sus personajes favoritos del universo de Star Wars. Utiliza **DynamoDB** como base de datos y **Dynamoose** como ODM para interactuar con la base de datos. La aplicación ofrece una API RESTful para crear favoritos, leer favoritos desde la bd dynamodb, consultar personajes favoritos de SWAPI, garantizando una gestión eficiente y escalable de los datos.

## Índice

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Pruebas](#pruebas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Licencia](#licencia)

### 1. Características

- **Crear** nuevos personajes favoritos en aws dynamoDb.
- **Obtener** todos los personajes favoritos from aws dynamoDb.
- **Obtener from SWAPI** personaje específico por su ID y su planeta.
- **Validación** de datos de entrada para garantizar la integridad de la información.
- **Manejo de errores** robusto para una experiencia de usuario fluida.
- **Pruebas unitarias** con Jest para asegurar la calidad del código.
- **Deploy** en AWS Lambda y AWS DynamoDB.
- **Documentación** de Swagger.
- **Pruebas de integración** con Postman.
- **Configuración** de variables de entorno.
- **evidencias** de la implementación vease la carpeta EVIDENCIAS.

### 2. Tecnologías Utilizadas

- [NestJS](https://nestjs.com/) - Framework de Node.js para construir aplicaciones escalables y eficientes.
- [DynamoDB](https://aws.amazon.com/dynamodb/) - Base de datos NoSQL de alta disponibilidad y escalabilidad.
- [Dynamoose](https://dynamoosejs.com/) - ODM para DynamoDB en Node.js.
- [Jest](https://jestjs.io/) - Framework de pruebas para JavaScript o Typescript.
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript que añade tipado estático.
- [UUID](https://www.pnpmjs.com/package/uuid) - Generación de identificadores únicos universales.

### 3. Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

###  Clonar el Repositorio


git clone https://github.com/Spiritbe4r/nestjs_aws_starwars_api
cd nestjs_aws_starwars_api 

### Instalar Dependencias
Asegúrate de tener Node.js y ppnpm instalados en tu sistema.

bash

npm install

### 4 .Configuración
La aplicación utiliza variables de entorno para la configuración. Crea un archivo .env en la raíz del proyecto y añade las siguientes variables:

NODE_ENV=development

SWAPI_ENDPOINT=https://swapi.py4e.com/api

AWS_ACS_KEY_ID=tu_access_key_id
AWS_SECRET_ACS_KEY=tu_secret_access_key
AWS_RGN=us-east-2
DYNAMODB_ENDPOINT=https://dynamodb.us-east-1.amazonaws.com

### 5. Uso
Una vez que hayas instalado las dependencias y configurado las variables de entorno, puedes iniciar la aplicación.

1. Iniciar la Aplicación
bash

npm run start:dev
La aplicación se ejecutará en el puerto especificado en el archivo .env (por defecto, http://localhost:3000).

2. Endpoints de la API

Para interactuar con la API, consulta la documentación detallada disponible en la interfaz de Swagger. Swagger proporciona una interfaz interactiva donde puedes ver todos los endpoints disponibles, sus parámetros, y realizar pruebas directamente desde el navegador.

Acceder a la Documentación de Swagger
Una vez que la aplicación esté en ejecución, puedes acceder a la documentación de Swagger local o en AWS navegando a la siguiente URL en tu navegador:

LOCAL http://localhost:3000/api-docs
AWS https://0bq5xp6612.execute-api.us-east-2.amazonaws.com/api-docs

### 6. Pruebas
El proyecto incluye pruebas unitarias para asegurar el correcto funcionamiento de los componentes clave, especialmente el repositorio que interactúa con DynamoDB, ademas los controladores y servicios. Para ejecutar las pruebas unitarias, sigue estos pasos:

1. Ejecutar Pruebas Unitarias
bash

npm run test

### 7. Estructura del Proyecto

starwars-api/
├── EVIDENCIAS/deploy_aws_lambda.png
├── EVIDENCIAS/SWAPI_API_CHALLENGE.postman_collection.json
├── EVIDENCIAS/deploy-cloud-formation.png
├── .serverless/
├── .github/workflows/main.yml
├── .gitignore
├── src/
│   ├── adapters/
│   │   ├── external/
│   │   │   └── swapi/
│   │   │       └── swapi.service.ts
│   │   │       └── swapi.controller.ts
│   │   │       └── swapi.controller.spec.ts
│   │   └── persistence/
│   │       └── dynamoose/
│   │           ├── favorite-character.model.ts
│   │           ├── favorite-character.interface.ts
│   │           └── dynamoose.repository.spec.ts
│   │           ├── dynamoose.repository.ts
│   ├── application/
│   │   ├── services/
│   │   │   ├── favorite-character.service.ts
│   │   │   └── favorite-character.service.spec.ts
│   │   ├── dtos/
│   │   │   ├── crear-favorito.dto.ts
│   │   │   └── favorite-character-response.dto.ts
│   │   ├── mappers/
│   │   │   └── favorite-character.mapper.ts
│   │   └── ports/
│   │       └── repository.interface.ts
│   ├── common/
│   │   └── constants/constants.ts
│   │   └── filters/
│   │       └── http-exception.filter.ts
│   ├── infrastructure/
│   │   └── config/
│   │       └── dynamoose.config.ts
│   └── domain/
│       └── entities/
│           └── favorite-character.entity.ts
├── test/
│   └── ..
├── .env
├── eslint.config.mjs
├── docker-compose.yml
├── nest-cli.json
├── serverless.yml
├── tsconfig.build.json
├── package.json
├── README.md
└── tsconfig.json


### 8. Licencia
Este proyecto está licenciado bajo la Licencia MIT.