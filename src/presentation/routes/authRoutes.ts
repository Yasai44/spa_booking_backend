import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";

const router = Router();


const repo = new PrismaUserRepository();

const registerUC = new RegisterUserUseCase(repo);
const loginUC = new LoginUserUseCase(repo);

const controller = new AuthController(registerUC, loginUC);

router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;
