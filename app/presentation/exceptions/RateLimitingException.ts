import { BaseException } from "./BaseException";

export class RateLimitingException extends BaseException {
  constructor() {
    super("Muchas peticiones", 429);
  }
}
