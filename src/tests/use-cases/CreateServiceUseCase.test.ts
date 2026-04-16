import { CreateServiceUseCase } from "../../application/use-cases/CreateServiceUseCase";

describe("CreateServiceUseCase", () => {
  let mockRepo: any;
  let useCase: CreateServiceUseCase;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn()
    };

    useCase = new CreateServiceUseCase(mockRepo);
  });

  it("should create a service successfully", async () => {
    const dto = {
      name: "Haircut",
      description: "Basic haircut",
      price: 25,
      duration: 30
    };

    mockRepo.create.mockResolvedValue({
      id: 1,
      ...dto
    });

    const result = await useCase.execute(dto);

    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(result).toHaveProperty("id");
    expect(result.name).toBe("Haircut");
  });

  it("should throw if repository throws an error", async () => {
    const dto = {
      name: "Haircut",
      description: "Basic haircut",
      price: 25,
      duration: 30
    };

    mockRepo.create.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute(dto)).rejects.toThrow("DB error");
  });
});
