import { PersonalizadoRepository } from "../../infra/db/repositories/PersonalizadoRepository";
import logger from "../../shared/logger";
import { Controller } from "../protocols/Controller";

export class AlmacenarController implements Controller {
  constructor(
    public readonly personalizadoRepository: PersonalizadoRepository
  ) {}

  async handle(request: any): Promise<any> {
    logger.info("Iniciando almacenamiento de personalizado");

    const { body } = request;

    const payload = JSON.parse(body as string);

    const personalizado = await this.personalizadoRepository.create(payload);

    logger.info("Personalizado almacenado con éxito");
    return {
      statusCode: 201,
      body: personalizado,
    };
  }
}
