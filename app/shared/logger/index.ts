import winston from "winston";

const logger = winston.createLogger({
  level: "info", // Controla el nivel de log desde el nivel global
  format: winston.format.json(), // Logs estructurados en formato JSON
  transports: [
    new winston.transports.Console(), // Enviar logs a CloudWatch automáticamente
  ],
});

export default logger;
