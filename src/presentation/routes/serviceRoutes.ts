import { Router } from "express";
import { ServiceController } from "../controllers/ServiceController";
import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();


const repo = new ServiceRepository();
const controller = new ServiceController(repo);

// Public
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// Admin only
router.post("/", authMiddleware, adminMiddleware, controller.create);
router.put("/:id", authMiddleware, adminMiddleware, controller.update);
router.delete("/:id", authMiddleware, adminMiddleware, controller.delete);

export default router;
