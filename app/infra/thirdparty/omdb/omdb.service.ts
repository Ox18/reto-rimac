import axios, { AxiosInstance } from "axios";
import { Cache } from "../../../shared/cache";
import { FindMovie } from "./omdb.interface";

const OMDB_API_KEY = process.env.OMDB_API_KEY;

export class OMDBService {
  private cache: Cache;
  private apiClient: AxiosInstance;

  constructor() {
    this.cache = new Cache();
    this.apiClient = axios.create({
      baseURL: "https://www.omdbapi.com",
    });
  }

  async find(data: FindMovie.Params): Promise<FindMovie.Response> {
    if (!OMDB_API_KEY) {
      throw new Error("OMDB_API_KEY is not defined in environment variables");
    }

    const cacheKey = this.createCacheKey(data);

    const cachedData = await this.cache.getCache<FindMovie.Response>(cacheKey);
    if (cachedData) return cachedData;

    const movieData = await this.apiClient.get<FindMovie.Response>(
      `?t=${data.title}&y=${data.year}&apikey=${OMDB_API_KEY}`
    );
    await this.cache.setCache(cacheKey, movieData.data);

    return movieData.data;
  }

  private createCacheKey(data: FindMovie.Params): string {
    return `movie_${data.title}_${data.year}`;
  }
}
