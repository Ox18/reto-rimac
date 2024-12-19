import { RateLimitingRepository } from "../../../infra/db/repositories/RateLimitingRepository";
import { RateLimitingMiddleware } from "../../../presentation/middlewares/RateLimitingMiddleware";
import { Middleware } from "../../../presentation/protocols/Middleware";

export const makeAlmacenarMiddleware = (): Middleware[] => {
  const middlewares: Middleware[] = [
    new RateLimitingMiddleware(new RateLimitingRepository("almacenar")),
  ];

  return middlewares;
};
