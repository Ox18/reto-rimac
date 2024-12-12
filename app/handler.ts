import AlmacenarRoutes from "./main/routes/AlmacenarRoutes";
import FusionadosRoutes from "./main/routes/FusionadosRoutes";
import HistorialRoutes from "./main/routes/HistorialRoutes";

export const getFusionados = FusionadosRoutes.getFusionados;
export const getHistorial = HistorialRoutes.getHistorial;
export const postAlmacenar = AlmacenarRoutes.postAlmacenar;
