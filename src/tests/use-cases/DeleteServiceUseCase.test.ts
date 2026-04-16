import { DeleteServiceUseCase } from "../../application/use-cases/DeleteServiceUseCase";

describe("DeleteServiceUseCase", () => {
  let mockRepo: any;
  let useCase: DeleteServiceUseCase;

  beforeEach(() => {
    mockRepo = {
      delete: jest.fn()
    };

    useCase = new DeleteServiceUseCase(mockRepo);
  });

  it("should delete a service successfully", async () => {
    mockRepo.delete.mockResolvedValue({
      id: 1,
      deleted: true
    });

    const result = await useCase.execute(1);

    expect(mockRepo.delete).toHaveBeenCalledWith(1);
    expect(result).toHaveProperty("deleted", true);
  });

  it("should throw if repository throws an error", async () => {
    mockRepo.delete.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute(1)).rejects.toThrow("DB error");
  });
});
