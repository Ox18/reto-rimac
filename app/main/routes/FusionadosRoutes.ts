import { routeAdapter } from "../adapters/RouteAdapter";
import { makeFusionadosController } from "../factories/MakeFusionadosController";
import { makeFusionadosMiddleware } from "../factories/MakeFusionadosMiddleware";

export default {
  getFusionados: routeAdapter(
    makeFusionadosController(),
    makeFusionadosMiddleware()
  ),
};
