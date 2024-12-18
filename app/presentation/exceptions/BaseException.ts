export class BaseException {
  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {}
}
