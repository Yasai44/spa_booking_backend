import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import bcrypt from "bcryptjs";

jest.mock("bcryptjs");

describe("RegisterUserUseCase", () => {
  let mockRepo: any;
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    mockRepo = {
      findByEmail: jest.fn(),
      create: jest.fn()
    };

    useCase = new RegisterUserUseCase(mockRepo);
  });

  it("should throw if email is already registered", async () => {
    mockRepo.findByEmail.mockResolvedValue({
      id: 1,
      name: "Existing User",
      email: "test@example.com",
      password: "hashed",
      role: "user"
    });

    await expect(
      useCase.execute("New User", "test@example.com", "password123")
    ).rejects.toThrow("Email already registered");
  });

  it("should hash the password and create a new user", async () => {
    mockRepo.findByEmail.mockResolvedValue(null);

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-password");

    mockRepo.create.mockResolvedValue({
      id: 1,
      name: "New User",
      email: "new@example.com",
      password: "hashed-password",
      role: "user"
    });

    const result = await useCase.execute(
      "New User",
      "new@example.com",
      "password123"
    );

    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);

    expect(mockRepo.create).toHaveBeenCalledWith({
      name: "New User",
      email: "new@example.com",
      password: "hashed-password",
      role: "user"
    });

    expect(result).toHaveProperty("id");
    expect(result.email).toBe("new@example.com");
  });
});
