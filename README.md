# Reto Backend

### Este es un proyecto basado en una arquitectura limpia, usando los handlers nativos pero adaptado clean code

# Features

- <b>Serverless</b> como base del proyecto
- <b>AWS Lambda</b> para despliegue del servicio
- <b>DynamoDB</b> para manejar el cache de la aplicación
- <b>Integración con API SWAPI</b> para obtener datos de personajes de Star Wars
- <b>Integración con API Omdb</b> para obtener información de las peliculas por su titulo y por año de publicación

# Requisitos

- <b>Node.js</b> >= 14.x

- <b>npm</b> >= 6.x

- <b>AWS CLI configurado</b>

- <b>Serverless Framework</b> instalado globalmente

> npm install -g serverless

# Instalación

Clonar el repositorio en tu entorno de trabajo.

Cambiar al directorio del proyecto: cd reto-backend

Instalar las dependencias del proyecto:

> npm install

# Uso

Construir el proyecto

> npm run build

Levantar proyecto localmente

> npm run local

Ejecutar pruebas

> npm run test

Desplegar proyecto

> npm run deploy

## Swagger - Documentación del API
Para visualizar la documentación del API con Swagger:

Ejecuta el siguiente comando para levantar el servidor de documentación:

```bash
node docs/index
```

Abre tu navegador y accede a http://localhost:3000/api-docs para explorar y probar los endpoints del API.

# Referencia del API

## Obtener datos fusionados

> GET /fusionados?peopleId=4

## Almacenar informacion personalizada

> POST /almacenar

## Historial con Paginado

> GET /historial?page=1&limit=3

## Ejemplo de solicitud

### Datos fusionados

> curl --location 'https://el0vyj5gjl.execute-api.us-east-1.amazonaws.com/dev/fusionados'

### Historial

> curl --location 'https://el0vyj5gjl.execute-api.us-east-1.amazonaws.com/dev/historial?page=1&limit=3'

### Almacenar

> curl --location 'https://el0vyj5gjl.execute-api.us-east-1.amazonaws.com/dev/almacenar' \
> --header 'Content-Type: application/json' \
> --data '{
> "name": "Wilmer",
> "lastname": "Delgado"
> }'

## Despliegue

Para desplegar en AWS debemos usar el siguiente comando

> npm run deploy

Una vez hayamos desplegado, ya podemos hacer uso de las BD's localmente

> npm run local
