import { PersonalizadoRepository } from "../../infra/db/repositories/PersonalizadoRepository";
import { AlmacenarController } from "../../presentation/controllers/AlmacenarController";
import { Controller } from "../../presentation/protocols/Controller";

export const makeAlmacenarController = (): Controller => {
  const controller = new AlmacenarController(new PersonalizadoRepository());

  return controller;
};
