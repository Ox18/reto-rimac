import { FindRepository } from "../../../data/protocols/db/repositories/omdb/FindRepository";
import { FindMovie } from "../../../domain/usecases/FindMovie";
import axios from "axios";
import { Cache } from "../../../shared/cache";

const OMDB_API_KEY = process.env.OMDB_API_KEY;

export class OmdbRepository implements FindRepository {
  private cache: Cache;

  constructor() {
    this.cache = new Cache();
  }

  async find(data: FindMovie.Params): Promise<FindMovie.Response> {
    const cacheKey = this.createCacheKey(data);

    const cachedData = await this.cache.getCache<FindMovie.Response>(cacheKey);
    if (cachedData) return cachedData;

    const movieData = await this.fetchMovieFromApi(data);
    await this.cache.setCache(cacheKey, movieData);

    return movieData;
  }

  private createCacheKey(data: FindMovie.Params): string {
    return `movie_${data.title}_${data.year}`;
  }

  private async fetchMovieFromApi(
    data: FindMovie.Params
  ): Promise<FindMovie.Response> {
    if (!OMDB_API_KEY) {
      throw new Error("OMDB_API_KEY is not defined in environment variables");
    }

    const url = `https://www.omdbapi.com?t=${data.title}&y=${data.year}&apikey=${OMDB_API_KEY}`;
    const response = await axios.get<FindMovie.Response>(url);

    return response.data;
  }
}
