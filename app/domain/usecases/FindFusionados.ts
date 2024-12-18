import { Fusionados } from "../models/Fusionados";

export namespace FindFusionados {
  export interface Params {
    characterId: number;
  }

  export type Response = Fusionados | null;
}
