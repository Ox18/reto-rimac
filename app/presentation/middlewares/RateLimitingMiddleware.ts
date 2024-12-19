import { Middleware } from "../protocols/Middleware";

import { RateLimitingRepository } from "../../infra/db/repositories/RateLimitingRepository";
import { RateLimitingException } from "../exceptions/RateLimitingException";

const LIMIT = 12;

export class RateLimitingMiddleware implements Middleware {
  constructor(
    private readonly rateLimitingRepository: RateLimitingRepository
  ) {}

  async execute(event: any): Promise<void> {
    const clientIp =
      event.requestContext?.identity?.sourceIp || // Para API Gateway REST
      event.requestContext?.http?.sourceIp || // Para API Gateway HTTP API v2
      event.headers?.["x-forwarded-for"]?.split(",")[0]; // Para proxies y balanceadores

    if (!clientIp) {
      console.log("No se pudo obtener la IP del cliente");
      return;
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const ttl = currentTimestamp + 60;

    const record = await this.rateLimitingRepository.findByIp(clientIp);

    console.log({ record })

    if (record) {
      const { count, ttl: recordTtl } = record;

      if (count >= LIMIT && currentTimestamp < recordTtl) {
        throw new RateLimitingException();
      }

      await this.rateLimitingRepository.incrementCounter(clientIp, ttl);
    } else {
      await this.rateLimitingRepository.create(clientIp, ttl);
    }

    console.log("Ip:", clientIp, "Count:", record?.count || 0);
  }
}
