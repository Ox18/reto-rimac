import { routeAdapter } from "../adapters/RouteAdapter";
import { makeFusionadosController } from "../factories/controllers/MakeFusionadosController";
import { makeFusionadosMiddleware } from "../factories/middlewares/MakeFusionadosMiddleware";

export default {
  getFusionados: routeAdapter(
    makeFusionadosController(),
    makeFusionadosMiddleware()
  ),
};
