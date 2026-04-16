import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("LoginUserUseCase", () => {
  let mockRepo: any;
  let useCase: LoginUserUseCase;

  beforeEach(() => {
    mockRepo = {
      findByEmail: jest.fn()
    };

    useCase = new LoginUserUseCase(mockRepo);

    process.env.JWT_SECRET = "testsecret";
  });

  it("should throw if user does not exist", async () => {
    mockRepo.findByEmail.mockResolvedValue(null);

    await expect(useCase.execute("test@example.com", "password"))
      .rejects
      .toThrow("Invalid credentials");
  });

  it("should throw if password does not match", async () => {
    mockRepo.findByEmail.mockResolvedValue({
      id: 1,
      email: "test@example.com",
      password: "hashedpassword",
      role: "user"
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(useCase.execute("test@example.com", "wrongpass"))
      .rejects
      .toThrow("Invalid credentials");
  });

  it("should return a token on successful login", async () => {
    mockRepo.findByEmail.mockResolvedValue({
      id: 1,
      email: "test@example.com",
      password: "hashedpassword",
      role: "user"
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mocked-jwt-token");

    const result = await useCase.execute("test@example.com", "password");

    expect(result).toEqual({ token: "mocked-jwt-token" });
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, role: "user" },
      "testsecret",
      { expiresIn: "1d" }
    );
  });
});
