import { Fusion } from "../models/Fusion";

export interface CreateFusion {
    create: (data: CreateFusion.Params) => Promise<CreateFusion.Response>;
}

export namespace CreateFusion {
    export type Params = Fusion;

    export type Response = boolean;
}