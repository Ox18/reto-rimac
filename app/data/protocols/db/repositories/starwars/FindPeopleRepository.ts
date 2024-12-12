import { FindPeople } from "../../../../../domain/usecases/FindPeople";

export interface FindPeopleRepository {
  findPeople: (data: FindPeople.Params) => Promise<FindPeople.Result>;
}
