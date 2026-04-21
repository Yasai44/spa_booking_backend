import request from "supertest";
import express from "express";
import { ServiceController } from "../../presentation/controllers/ServiceController";
import { validateService } from "../../presentation/validation/serviceValidation";

jest.mock("../../presentation/validation/serviceValidation");

describe("ServiceController", () => {
  let app: express.Express;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };

    const controller = new ServiceController(mockRepo);

    app = express();
    app.use(express.json());

    app.post("/services", controller.create);
    app.get("/services", controller.getAll);
    app.get("/services/:id", controller.getById);
    app.patch("/services/:id", controller.update);
    app.delete("/services/:id", controller.delete);

    // Error handler
    app.use((err: any, req: any, res: any, next: any) => {
      res.status(err.status || 500).json({
        success: false,
        message: err.message
      });
    });
  });

  // -----------------------------------------------------
  // CREATE SERVICE
  // -----------------------------------------------------

  it("should return 400 if validation fails on create", async () => {
    (validateService as jest.Mock).mockImplementation(() => {
      throw { status: 400, message: "Service name is required" };
    });

    const res = await request(app)
      .post("/services")
      .send({ duration: 60, price: 80 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Service name is required");
  });

  it("should create a service successfully", async () => {
    (validateService as jest.Mock).mockImplementation(() => {});

    const service = {
      id: 1,
      name: "Facial",
      duration: 60,
      price: 80
    };

    mockRepo.create.mockResolvedValue(service);

    const res = await request(app)
      .post("/services")
      .send({
        name: "Facial",
        duration: 60,
        price: 80
      });

    expect(mockRepo.create).toHaveBeenCalledWith({
      name: "Facial",
      duration: 60,
      price: 80
    });

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual(service);
  });

  // -----------------------------------------------------
  // GET ALL SERVICES
  // -----------------------------------------------------

  it("should return all services", async () => {
    const services = [
      { id: 1, name: "Facial", duration: 60, price: 80 },
      { id: 2, name: "Hot Stone Therapy", duration: 90, price: 120 }
    ];

    mockRepo.getAll.mockResolvedValue(services);

    const res = await request(app).get("/services");

    expect(mockRepo.getAll).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(services);
  });

  // -----------------------------------------------------
  // GET SERVICE BY ID
  // -----------------------------------------------------

  it("should return a service by ID", async () => {
    const service = {
      id: 1,
      name: "Facial",
      duration: 60,
      price: 80
    };

    mockRepo.getById.mockResolvedValue(service);

    const res = await request(app).get("/services/1");

    expect(mockRepo.getById).toHaveBeenCalledWith(1);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(service);
  });

  // -----------------------------------------------------
  // UPDATE SERVICE
  // -----------------------------------------------------

  it("should return 400 if validation fails on update", async () => {
    (validateService as jest.Mock).mockImplementation(() => {
      throw { status: 400, message: "Duration is required" };
    });

    const res = await request(app)
      .patch("/services/1")
      .send({ name: "Facial" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Duration is required");
  });

  it("should update a service successfully", async () => {
    (validateService as jest.Mock).mockImplementation(() => {});

    const updated = {
      id: 1,
      name: "Facial",
      duration: 75,
      price: 90
    };

    mockRepo.update.mockResolvedValue(updated);

    const res = await request(app)
      .patch("/services/1")
      .send({
        name: "Facial",
        duration: 75,
        price: 90
      });

    expect(mockRepo.update).toHaveBeenCalledWith(1, {
      name: "Facial",
      duration: 75,
      price: 90
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(updated);
  });

  // -----------------------------------------------------
  // DELETE SERVICE
  // -----------------------------------------------------

  it("should delete a service", async () => {
    const deleted = { id: 1, deleted: true };

    mockRepo.delete.mockResolvedValue(deleted);

    const res = await request(app).delete("/services/1");

    expect(mockRepo.delete).toHaveBeenCalledWith(1);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(deleted);
  });
});