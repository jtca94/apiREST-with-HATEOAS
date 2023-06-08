import { Router } from "express";
import { controllers } from "../controllers/controllers";
import { queryReporte } from "../middlewares/reporte";
const router = Router();

router.get("/filtros", queryReporte, controllers.getAllItems);
router.get("/", queryReporte, controllers.getItemsHATEOAS);
router.get("/:id", queryReporte, controllers.getItemById);

export { router };