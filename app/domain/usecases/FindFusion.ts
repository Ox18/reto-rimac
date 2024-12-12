import { Fusion } from "../models/Fusion";

export namespace FindFusion {
  export interface Params {
    characterId: number;
  }

  export type Response = Fusion | null;
}
