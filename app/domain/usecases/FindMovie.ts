import { MovieResult } from "../models/Movie";

export interface FindMovie {
  find: (data: FindMovie.Params) => Promise<FindMovie.Response>;
}

export namespace FindMovie {
  export type Params = {
    title: string;
    year: number;
  };

  export type Response = MovieResult;
}
