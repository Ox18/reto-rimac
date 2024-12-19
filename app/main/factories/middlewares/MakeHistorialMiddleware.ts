import { RateLimitingRepository } from "../../../infra/db/repositories/RateLimitingRepository";
import { RateLimitingMiddleware } from "../../../presentation/middlewares/RateLimitingMiddleware";
import { Middleware } from "../../../presentation/protocols/Middleware";

export const makeHistorialMiddleware = (): Middleware[] => {
  const middlewares: Middleware[] = [
    new RateLimitingMiddleware(new RateLimitingRepository("historial")),
  ];

  return middlewares;
};
