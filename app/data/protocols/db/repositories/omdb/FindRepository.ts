import { FindMovie } from "../../../../../domain/usecases/FindMovie";

export interface FindRepository {
  find: (data: FindMovie.Params) => Promise<FindMovie.Response>;
}
