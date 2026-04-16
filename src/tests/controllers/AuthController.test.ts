import request from "supertest";
import express from "express";
import { AuthController } from "../../presentation/controllers/AuthController";

describe("AuthController", () => {
  let app: express.Express;
  let mockRegisterUseCase: any;
  let mockLoginUseCase: any;

  beforeEach(() => {
    mockRegisterUseCase = { execute: jest.fn() };
    mockLoginUseCase = { execute: jest.fn() };

    const controller = new AuthController(
      mockRegisterUseCase,
      mockLoginUseCase
    );

    app = express();
    app.use(express.json());

    app.post("/auth/register", controller.register);
    app.post("/auth/login", controller.login);

    // error handler to catch next(err)
    app.use((err: any, req: any, res: any, next: any) => {
      res.status(500).json({ success: false, message: err.message });
    });
  });

  // -------------------------
  // REGISTER TESTS
  // -------------------------

  it("should return 400 if required fields are missing on register", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should register a user successfully", async () => {
    const user = {
      id: 1,
      name: "Sainabou",
      email: "test@example.com",
      password: "hashed",
      role: "user"
    };

    mockRegisterUseCase.execute.mockResolvedValue(user);

    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Sainabou",
        email: "test@example.com",
        password: "123456"
      });

    expect(mockRegisterUseCase.execute).toHaveBeenCalledWith(
      "Sainabou",
      "test@example.com",
      "123456"
    );

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).not.toHaveProperty("password");
  });

  it("should return 500 if register use case throws", async () => {
    mockRegisterUseCase.execute.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Test",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("DB error");
  });

  // -------------------------
  // LOGIN TESTS
  // -------------------------

  it("should return 400 if required fields are missing on login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should login successfully", async () => {
    const tokenResult = { token: "jwt-token" };

    mockLoginUseCase.execute.mockResolvedValue(tokenResult);

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "123456"
      });

    expect(mockLoginUseCase.execute).toHaveBeenCalledWith(
      "test@example.com",
      "123456"
    );

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBe("jwt-token");
  });

  it("should return 500 if login use case throws", async () => {
    mockLoginUseCase.execute.mockRejectedValue(new Error("Invalid credentials"));

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "wrong"
      });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Invalid credentials");
  });
});
