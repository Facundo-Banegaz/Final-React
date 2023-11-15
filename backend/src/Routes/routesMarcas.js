import { Router } from "express";
import { methods as controlador } from "../Controllers/controllersMarcas";

const router = Router();

router.get("/", controlador.getMarcas);
router.get("/:id", controlador.getMarca);
router.post("/", controlador.addMarca);
router.put("/:id", controlador.updateMarca);
router.delete("/:id", controlador.deleteMarca);

export default router;