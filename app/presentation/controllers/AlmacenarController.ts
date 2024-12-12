import { APIGatewayProxyEvent } from "aws-lambda";
import { PersonalizadoRepository } from "../../infra/db/repositories/PersonalizadoRepository";
import { Controller } from "../protocols/Controller";
import logger from "../../shared/logger";

export class AlmacenarController implements Controller {
  constructor(
    public readonly personalizadoRepository: PersonalizadoRepository
  ) {}

  async handle(request: APIGatewayProxyEvent): Promise<any> {
    const { body } = request;

    logger.info("AlmacenarController", { body });

    const payload = JSON.parse(body as string);

    const personalizado = await this.personalizadoRepository.create(payload);

    return {
      statusCode: 201,
      body: personalizado,
    };
  }
}
