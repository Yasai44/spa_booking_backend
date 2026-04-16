import request from "supertest";
import { createTestApp } from "./helpers/testApp";

describe("Auth Integration", () => {
  const app = createTestApp();

  it("registers a user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Sainabou",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("test@example.com");
  });
});
