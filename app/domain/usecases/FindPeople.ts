import { People } from "../models/People";

export interface FindPeople {
  find: (data: FindPeople.Params) => Promise<People>;
}

export namespace FindPeople {
  export type Params = {
    peopleId: number;
  };
  export type Result = People;
}
