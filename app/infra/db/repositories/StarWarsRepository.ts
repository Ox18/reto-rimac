import axios, { AxiosInstance } from "axios";
import { FindFilmRepository } from "../../../data/protocols/db/repositories/starwars/FindFilmRepository";
import { FindPeopleRepository } from "../../../data/protocols/db/repositories/starwars/FindPeopleRepository";
import { FindFilm } from "../../../domain/usecases/FindFilm";
import { FindPeople } from "../../../domain/usecases/FindPeople";
import { Cache } from "../../../shared/cache";

export class StarWarsRepository
  implements FindFilmRepository, FindPeopleRepository
{
  private cache: Cache;
  private apiClient: AxiosInstance;

  constructor() {
    this.cache = new Cache();
    this.apiClient = axios.create({
      baseURL: "https://swapi.dev/api/",
    });
  }

  async findPeople(data: FindPeople.Params): Promise<FindPeople.Result> {
    const cacheKey = this.createCacheKey("people", data.peopleId);

    const cachedData = await this.cache.getCache<FindPeople.Result>(cacheKey);
    if (cachedData) return cachedData;

    const peopleData = await this.apiClient.get<FindPeople.Result>(
      `people/${data.peopleId}`
    );
    await this.cache.setCache(cacheKey, peopleData.data);

    return {
      ...peopleData.data,
      height: Number(peopleData.data.height),
      mass: Number(peopleData.data.mass),
    };
  }

  async findFilm(data: FindFilm.Params): Promise<FindFilm.Response> {
    const cacheKey = this.createCacheKey("film", data.id);

    const cachedData = await this.cache.getCache<FindFilm.Response>(cacheKey);
    if (cachedData) return cachedData;

    const filmData = await this.apiClient.get<FindFilm.Response>(
      `films/${data.id}`
    );
    await this.cache.setCache(cacheKey, filmData.data);

    return filmData.data;
  }

  /**
   * Genera una clave de caché basada en el tipo y el identificador.
   * @param type - Tipo de recurso (e.g., "people", "film")
   * @param id - Identificador único del recurso
   * @returns Clave única para el caché
   */
  private createCacheKey(type: string, id: string | number): string {
    return `${type}_${id}`;
  }
}
