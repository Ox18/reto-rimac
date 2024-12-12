import { CreatePersonalizado } from "../../../../../domain/usecases/CreatePersonalizado";

export interface CreatePersonalizadoRepository {
  create: (
    data: CreatePersonalizado.Params
  ) => Promise<CreatePersonalizado.Result>;
}
