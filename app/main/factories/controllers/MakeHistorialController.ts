import { FusionRepository } from "../../../infra/db/repositories/FusionRepository";
import { HistorialController } from "../../../presentation/controllers/HistorialController";
import { Controller } from "../../../presentation/protocols/Controller";

export const makeHistorialController = (): Controller => {
  const controller = new HistorialController(new FusionRepository());

  return controller;
};
