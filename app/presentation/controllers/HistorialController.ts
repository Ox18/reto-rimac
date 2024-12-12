import { APIGatewayProxyEvent } from "aws-lambda";
import { Controller } from "../protocols/Controller";
import { HistorialParameters } from "../protocols/HistorialRequest";
import { FusionRepository } from "../../infra/db/repositories/FusionRepository";

export class HistorialController implements Controller {
  constructor(public readonly fusionRepository: FusionRepository) {}

  async handle(event: APIGatewayProxyEvent): Promise<any> {
    const parameters = (event.queryStringParameters || {
      page: 1,
      limit: 10,
    }) as HistorialParameters;

    const response = await this.fusionRepository.paginated({
      page: Number(parameters.page),
      limit: Number(parameters.limit),
    });

    return response;
  }
}
