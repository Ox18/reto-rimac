import { FindFilm } from "../../../../../domain/usecases/FindFilm";

export interface FindFilmRepository {
  findFilm: (data: FindFilm.Params) => Promise<FindFilm.Response>;
}
