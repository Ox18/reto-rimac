import { Fusionados } from "../models/Fusionados";

export interface CreateFusion {
  create: (data: CreateFusion.Params) => Promise<CreateFusion.Response>;
}

export namespace CreateFusion {
  export type Params = Fusionados;

  export type Response = boolean;
}
