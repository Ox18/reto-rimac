import { FindFusion } from "../../../../../domain/usecases/FindFusion";

export interface FindFusionRepository {
  findFusion: (data: FindFusion.Params) => Promise<FindFusion.Response>;
}
