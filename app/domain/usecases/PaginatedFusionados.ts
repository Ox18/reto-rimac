import { Fusionados } from "../models/Fusionados";

export namespace PaginatedFusionados {
  export type Params = {
    page: number;
    limit: number;
  };

  export type Response = {
    data: Fusionados[];
    total: number;
    page: number;
    limit: number;
  };
}
