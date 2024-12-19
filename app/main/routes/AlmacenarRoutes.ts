import { routeAdapter } from "../adapters/RouteAdapter";
import { makeAlmacenarController } from "../factories/controllers/MakeAlmacenarController";
import { makeAlmacenarMiddleware } from "../factories/middlewares/MakeAlmacenarMiddleware";

export default {
  postAlmacenar: routeAdapter(
    makeAlmacenarController(),
    makeAlmacenarMiddleware()
  ),
};
