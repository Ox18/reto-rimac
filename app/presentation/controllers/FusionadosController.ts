import { FusionRepository } from "../../infra/db/repositories/FusionRepository";
import { Controller } from "../protocols/Controller";
import { SwapiService } from "../../infra/thirdparty/swapi/swapi.service";
import { OMDBService } from "../../infra/thirdparty/omdb/omdb.service";
import { fusionadosAdapter } from "../../main/adapters/FusionadosAdapter";
import { Fusionados } from "../../domain/models/Fusionados";
import { randomNumber } from "../../shared/helpers/number.helper";

import {
  FUSIONADOS_MAX_PEOPLE_ID,
  FUSIONADOS_MIN_PEOPLE_ID,
} from "../../shared/consts/common";
import logger from "../../shared/logger";
export class FusionadosController implements Controller {
  constructor(
    public readonly swapiService: SwapiService,
    public readonly omdbRepository: OMDBService,
    public readonly fusionRepository: FusionRepository
  ) {}

  async handle(event: any): Promise<Fusionados> {
    logger.info("Iniciando búsqueda de fusionados");
    const peopleId = Number(
      event.queryStringParameters?.peopleId ||
        randomNumber(FUSIONADOS_MIN_PEOPLE_ID, FUSIONADOS_MAX_PEOPLE_ID)
    );

    const fusionFinded = await this.fusionRepository.findFusion({
      characterId: peopleId,
    });

    if (fusionFinded) {
      return fusionFinded;
    }

    const people = await this.swapiService.findPeople({
      peopleId,
    });

    const sizeFilms = people.films.length;

    const randomFilm = Math.floor(Math.random() * sizeFilms);

    const filmId = Number(people.films[randomFilm].split("/")[5]);

    const film = await this.swapiService.findFilm({
      id: filmId,
    });

    const [year] = film.release_date.split("-");

    const movie = await this.omdbRepository.find({
      year: Number(year),
      title: film.title,
    });

    const fusion = fusionadosAdapter(peopleId, people, movie);

    await this.fusionRepository.create(fusion);

    logger.info("Fusionado encontrado con éxito");
    return fusion;
  }
}
