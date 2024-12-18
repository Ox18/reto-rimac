import { FindFusionados } from "../../../../../domain/usecases/FindFusionados";

export interface FindFusionRepository {
  findFusion: (data: FindFusionados.Params) => Promise<FindFusionados.Response>;
}
