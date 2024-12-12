import { APIGatewayEvent } from "aws-lambda";
import { Fusion } from "../../domain/models/Fusion";
import { FusionRepository } from "../../infra/db/repositories/FusionRepository";
import { OmdbRepository } from "../../infra/db/repositories/OmdbRepository";
import { StarWarsRepository } from "../../infra/db/repositories/StarWarsRepository";
import { Controller } from "../protocols/Controller";
import { FusionadosParameters } from "../protocols/FusionadosRequest";
import logger from "../../shared/logger";

export class FusionadosController implements Controller {
  constructor(
    public readonly starWarsRepository: StarWarsRepository,
    public readonly omdbRepository: OmdbRepository,
    public readonly fusionRepository: FusionRepository
  ) {}

  async handle(event: APIGatewayEvent): Promise<Fusion> {
    logger.info("FusionadosController", { event });

    const parameters = (event.queryStringParameters || {
      peopleId: 5,
    }) as FusionadosParameters;

    const peopleId = Number(parameters.peopleId || 5);

    const fusionFinded = await this.fusionRepository.findFusion({
      characterId: peopleId,
    });

    if (fusionFinded) {
      return fusionFinded;
    }

    const people = await this.starWarsRepository.findPeople({
      peopleId,
    });

    const sizeFilms = people.films.length;

    const randomFilm = Math.floor(Math.random() * sizeFilms);

    const filmId = Number(people.films[randomFilm].split("/")[5]);

    const film = await this.starWarsRepository.findFilm({
      id: filmId,
    });

    const [year] = film.release_date.split("-");

    const movie = await this.omdbRepository.find({
      year: Number(year),
      title: film.title,
    });

    const fusion: Fusion = {
      character_id: peopleId,
      character_gender: people.gender,
      character_height: people.height,
      character_mass: people.mass,
      character_name: people.name,
      movie_actors: movie.Actors,
      movie_plot: movie.Plot,
      movie_released: movie.Released,
      movie_title: movie.Title,
      created_at: new Date().toISOString(),
    };

    await this.fusionRepository.create(fusion);

    return fusion;
  }
}
