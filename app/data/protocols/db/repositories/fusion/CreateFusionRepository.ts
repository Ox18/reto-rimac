import { CreateFusion } from "../../../../../domain/usecases/CreateFusionados";

export interface CreateFusionRepository {
  create: (data: CreateFusion.Params) => Promise<CreateFusion.Response>;
}
