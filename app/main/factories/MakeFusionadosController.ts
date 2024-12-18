import { FusionRepository } from "../../infra/db/repositories/FusionRepository";
import { OMDBService } from "../../infra/thirdparty/omdb/omdb.service";
import { SwapiService } from "../../infra/thirdparty/swapi/swapi.service";
import { FusionadosController } from "../../presentation/controllers/FusionadosController";
import { Controller } from "../../presentation/protocols/Controller";

export const makeFusionadosController = (): Controller => {
  const controller = new FusionadosController(
    new SwapiService(),
    new OMDBService(),
    new FusionRepository()
  );

  return controller;
};
