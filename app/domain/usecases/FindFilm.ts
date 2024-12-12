import { PeopleFilm } from "../models/PeopleFilm";

export interface FindFilm {
  find: (params: FindFilm.Params) => Promise<FindFilm.Response>;
}

export namespace FindFilm {
  export interface Params {
    id: number;
  }

  export type Response = PeopleFilm;
}
