import { FusionRepository } from "../../infra/db/repositories/FusionRepository";
import { OmdbRepository } from "../../infra/db/repositories/OmdbRepository";
import { StarWarsRepository } from "../../infra/db/repositories/StarWarsRepository";
import { FusionadosController } from "../../presentation/controllers/FusionadosController";
import { Controller } from "../../presentation/protocols/Controller";

export const makeFusionadosController = (): Controller => {
  const controller = new FusionadosController(
    new StarWarsRepository(),
    new OmdbRepository(),
    new FusionRepository()
  );

  return controller;
};
