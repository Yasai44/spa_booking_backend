import { UpdateServiceUseCase } from "../../application/use-cases/UpdateServiceUseCase";

describe("UpdateServiceUseCase", () => {
  let mockRepo: any;
  let useCase: UpdateServiceUseCase;

  beforeEach(() => {
    mockRepo = {
      update: jest.fn()
    };

    useCase = new UpdateServiceUseCase(mockRepo);
  });

  it("should update a service successfully", async () => {
    const dto = {
      name: "Updated Haircut",
      description: "Updated description",
      price: 30,
      duration: 45
    };

    mockRepo.update.mockResolvedValue({
      id: 1,
      ...dto
    });

    const result = await useCase.execute(1, dto);

    expect(mockRepo.update).toHaveBeenCalledWith(1, dto);
    expect(result).toHaveProperty("id", 1);
    expect(result.name).toBe("Updated Haircut");
  });

  it("should throw if repository throws an error", async () => {
    const dto = {
      name: "Updated Haircut",
      description: "Updated description",
      price: 30,
      duration: 45
    };

    mockRepo.update.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute(1, dto)).rejects.toThrow("DB error");
  });
});
