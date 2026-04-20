import request from "supertest";
import { createTestApp } from "./helpers/testApp";

describe("Booking Error Integration", () => {
  const app = createTestApp();
  let serviceId: number;

  beforeAll(async () => {
    const service = await request(app).post("/services").send({
      name: "Massage",
      duration: 60,
      price: 100
    });

    serviceId = service.body.data.id;
  });

  it("fails to create booking with missing fields", async () => {
    const res = await request(app).post("/bookings").send({
      serviceId
    });

    expect(res.status).toBe(400);
  });

  it("fails to create booking for non-existent service", async () => {
    const res = await request(app).post("/bookings").send({
      serviceId: 9999,
      date: "2026-05-01",
      time: "10:00"
    });

    expect(res.status).toBe(404);
  });

  it("fails to cancel non-existent booking", async () => {
    const res = await request(app).delete("/bookings/9999");

    expect(res.status).toBe(404);
  });

  it("fails to update status of non-existent booking", async () => {
    const res = await request(app)
      .patch("/bookings/9999/status")
      .send({ status: "approved" });

    expect(res.status).toBe(404);
  });
});
