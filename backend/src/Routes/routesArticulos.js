import { Router } from "express";
import { methods as controlador } from "../Controllers/controllersArticulos";

const router = Router();

router.get("/", controlador.getArticulos);
router.get("/:id", controlador.getArticulo);
router.post("/", controlador.addArticulo);
router.put("/:id", controlador.updateArticulo);
router.delete("/:id", controlador.deleteArticulo);


export default router;