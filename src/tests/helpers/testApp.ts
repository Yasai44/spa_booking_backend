import express from "express";
import { PrismaClient } from "@prisma/client";

// Controllers
import { AuthController } from "../../presentation/controllers/AuthController";
import { BookingController } from "../../presentation/controllers/BookingController";
import { ServiceController } from "../../presentation/controllers/ServiceController";

// Repositories
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";
import { BookingRepository } from "../../infrastructure/repositories/BookingRepository";
import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository";

// Use Cases
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";

export function createTestApp() {
  const prisma = new PrismaClient();

  // Instantiate repositories 
  const userRepo = new PrismaUserRepository();
  const bookingRepo = new BookingRepository();
  const serviceRepo = new ServiceRepository();

  // Instantiate use cases
  const registerUser = new RegisterUserUseCase(userRepo);
  const loginUser = new LoginUserUseCase(userRepo);

  // Instantiate controllers
  const authController = new AuthController(registerUser, loginUser);
  const bookingController = new BookingController(bookingRepo);
  const serviceController = new ServiceController(serviceRepo);

  const app = express();
  app.use(express.json());

  // Fake auth middleware
  app.use((req: any, res, next) => {
    req.user = { id: 1 };
    next();
  });

  // AUTH ROUTES
  app.post("/auth/register", authController.register);
  app.post("/auth/login", authController.login);

  // SERVICE ROUTES
  app.post("/services", serviceController.create);
  app.get("/services", serviceController.getAll);
  app.get("/services/:id", serviceController.getById);
  app.patch("/services/:id", serviceController.update);
  app.delete("/services/:id", serviceController.delete);

  // BOOKING ROUTES
  app.post("/bookings", bookingController.create);
  app.get("/bookings/mine", bookingController.getMine);
  app.delete("/bookings/:id", bookingController.cancel);
  app.get("/bookings", bookingController.getAll);
  app.patch("/bookings/:id/status", bookingController.updateStatus);

  return app;
}