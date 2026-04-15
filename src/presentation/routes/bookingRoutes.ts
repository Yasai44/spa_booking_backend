import { Router } from "express";
import { BookingController } from "../controllers/BookingController";
import { BookingRepository } from "../../infrastructure/repositories/BookingRepository";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();


const repo = new BookingRepository();
const controller = new BookingController(repo);

// User routes
router.post("/", authMiddleware, controller.create);
router.get("/me", authMiddleware, controller.getMine);
router.put("/cancel/:id", authMiddleware, controller.cancel);

// Admin routes
router.get("/", authMiddleware, adminMiddleware, controller.getAll);
router.put("/:id/status", authMiddleware, adminMiddleware, controller.updateStatus);

export default router;
