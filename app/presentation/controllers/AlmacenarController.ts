import { PersonalizadoRepository } from "../../infra/db/repositories/PersonalizadoRepository";
import { Controller } from "../protocols/Controller";

export class AlmacenarController implements Controller {
  constructor(
    public readonly personalizadoRepository: PersonalizadoRepository
  ) {}

  async handle(request: any): Promise<any> {
    const { body } = request;

    const payload = JSON.parse(body as string);

    const personalizado = await this.personalizadoRepository.create(payload);

    return {
      statusCode: 201,
      body: personalizado,
    };
  }
}
