import { PaginatedFusionados} from "../../../../../domain/usecases/PaginatedFusionados";

export interface PaginatedRepository {
  paginated: (
    params: PaginatedFusionados.Params
  ) => Promise<PaginatedFusionados.Response>;
}
