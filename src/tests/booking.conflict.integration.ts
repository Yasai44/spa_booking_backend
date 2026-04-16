import request from "supertest";
import { createTestApp } from "./helpers/testApp";

describe("Booking Conflict Detection", () => {
  const app = createTestApp();
  let serviceId: number;

  beforeAll(async () => {
    // Create a service to book
    const service = await request(app).post("/services").send({
      name: "Massage",
      duration: 60,
      price: 100
    });

    serviceId = service.body.data.id;
  });

  it("allows the first booking", async () => {
    const res = await request(app).post("/bookings").send({
      serviceId,
      date: "2026-05-01",
      time: "10:00"
    });

    expect(res.status).toBe(201);
  });

  it("rejects a second booking at the same date and time", async () => {
    const res = await request(app).post("/bookings").send({
      serviceId,
      date: "2026-05-01",
      time: "10:00"
    });

    expect(res.status).toBe(400);
    expect(res.body.message.toLowerCase()).toContain("already booked");
  });
});
