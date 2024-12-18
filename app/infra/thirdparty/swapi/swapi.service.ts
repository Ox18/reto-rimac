import axios, { AxiosInstance } from "axios";
import { Cache } from "../../../shared/cache";
import { FindFilm, FindPeople } from "./swapi.interface";

export class SwapiService {
  private cache: Cache;
  private apiClient: AxiosInstance;

  constructor() {
    this.cache = new Cache();
    this.apiClient = axios.create({
      baseURL: "https://swapi.py4e.com/api/",
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
