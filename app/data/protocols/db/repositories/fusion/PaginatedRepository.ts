import { PaginatedFusion } from "../../../../../domain/usecases/PaginatedFusion";

export interface PaginatedRepository {
  paginated: (
    params: PaginatedFusion.Params
  ) => Promise<PaginatedFusion.Response>;
}
