import { CreateFusion } from "../../../../../domain/usecases/CreateFusion";

export interface CreateFusionRepository {
  create: (data: CreateFusion.Params) => Promise<CreateFusion.Response>;
}
