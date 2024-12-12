import { routeAdapter } from "../adapters/RouteAdapter";
import { makeFusionadosController } from "../factories/MakeFusionadosController";

export default {
  getFusionados: routeAdapter(makeFusionadosController()),
};
