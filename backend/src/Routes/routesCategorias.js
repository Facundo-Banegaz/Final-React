import { Router } from "express";
import { methods as controlador } from "../Controllers/controllersCategorias";

const router = Router();

router.get("/", controlador.getCategorias);
router.get("/:id", controlador.getCategoria);
router.post("/", controlador.addCategoria);
router.put("/:id", controlador.updateCategoria);
router.delete("/:id", controlador.deleteCategoria);

export default router;