import request from "supertest";
import { createTestApp } from "./helpers/testApp";

describe("Auth Error Integration", () => {
  const app = createTestApp();

  it("fails registration when email already exists", async () => {
    await request(app).post("/auth/register").send({
      name: "Sainabou",
      email: "dup@example.com",
      password: "123456"
    });

    const res = await request(app).post("/auth/register").send({
      name: "Another",
      email: "dup@example.com",
      password: "123456"
    });

    expect(res.status).toBe(400);
    expect(res.body.message.toLowerCase()).toContain("email");
  });

  it("fails login with wrong password", async () => {
    await request(app).post("/auth/register").send({
      name: "Sainabou",
      email: "wrongpass@example.com",
      password: "123456"
    });

    const res = await request(app).post("/auth/login").send({
      email: "wrongpass@example.com",
      password: "badpassword"
    });

    expect(res.status).toBe(400);
    expect(res.body.message.toLowerCase()).toContain("invalid");
  });

  it("fails login when user does not exist", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "missing@example.com",
      password: "123456"
    });

    expect(res.status).toBe(400);
    expect(res.body.message.toLowerCase()).toContain("invalid");
  });
});
