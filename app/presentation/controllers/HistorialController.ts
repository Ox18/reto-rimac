import { Controller } from "../protocols/Controller";
import { HistorialParameters } from "../protocols/HistorialRequest";
import { FusionRepository } from "../../infra/db/repositories/FusionRepository";
import logger from "../../shared/logger";

export class HistorialController implements Controller {
  constructor(public readonly fusionRepository: FusionRepository) {}

  async handle(event: any): Promise<any> {
    logger.info("Iniciando búsqueda de historial");

    const parameters = {
      page: 1,
      limit: 10,
      ...event.queryStringParameters,
    } as HistorialParameters;

    const response = await this.fusionRepository.paginated({
      page: Number(parameters.page),
      limit: Number(parameters.limit),
    });

    logger.info("Historial encontrado con éxito");

    return response;
  }
}
