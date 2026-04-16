import request from "supertest";
import { createTestApp } from "./helpers/testApp";

describe("Service Error Integration", () => {
  const app = createTestApp();

  it("fails to create service with missing name", async () => {
    const res = await request(app).post("/services").send({
      duration: 60,
      price: 80
    });

    expect(res.status).toBe(400);
    expect(res.body.message.toLowerCase()).toContain("name");
  });

  it("fails to update service with invalid duration", async () => {
    const service = await request(app).post("/services").send({
      name: "Facial",
      duration: 60,
      price: 80
    });

    const res = await request(app)
      .patch(`/services/${service.body.data.id}`)
      .send({
        name: "Facial",
        duration: -10,
        price: 80
      });

    expect(res.status).toBe(400);
    expect(res.body.message.toLowerCase()).toContain("duration");
  });

  it("fails to get service with invalid ID", async () => {
    const res = await request(app).get("/services/9999");

    expect(res.status).toBe(404);
  });

  it("fails to delete service that does not exist", async () => {
    const res = await request(app).delete("/services/9999");

    expect(res.status).toBe(404);
  });
});
