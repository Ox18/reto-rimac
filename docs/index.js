const express = require("express");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const path  = require('path');

const app = express();

// Carga del archivo Swagger
const dir = path.join(__dirname, 'swagger.yaml');
const swaggerDocument = yaml.load(dir);

// Ruta para Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicia el servidor
app.listen(3000, () => {
  console.log("Swagger disponible en http://localhost:3000/api-docs");
});
