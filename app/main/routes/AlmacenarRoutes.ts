import { routeAdapter } from "../adapters/RouteAdapter";
import { makeAlmacenarController } from "../factories/MakeAlmacenarController";

export default {
  postAlmacenar: routeAdapter(makeAlmacenarController()),
};
