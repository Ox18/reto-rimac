import { routeAdapter } from "../adapters/RouteAdapter";
import { makeHistorialController } from "../factories/MakeHistorialController";

export default {
  getHistorial: routeAdapter(makeHistorialController()),
};
