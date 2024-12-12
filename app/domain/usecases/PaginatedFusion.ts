import { Fusion } from "../models/Fusion";

export namespace PaginatedFusion {
  export type Params = {
    page: number;
    limit: number;
  };

  export type Response = {
    data: Fusion[];
    total: number;
    page: number;
    limit: number;
  };
}
