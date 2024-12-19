import { routeAdapter } from "../adapters/RouteAdapter";
import { makeHistorialController } from "../factories/controllers/MakeHistorialController";
import { makeHistorialMiddleware } from "../factories/middlewares/MakeHistorialMiddleware";

export default {
  getHistorial: routeAdapter(
    makeHistorialController(),
    makeHistorialMiddleware()
  ),
};
