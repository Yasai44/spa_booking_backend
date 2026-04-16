import { UpdateBookingsStatusUseCase } from "../../application/use-cases/UpdateBookingsStatusUseCase";

describe("UpdateBookingsStatusUseCase", () => {
  let mockRepo: any;
  let useCase: UpdateBookingsStatusUseCase;

  beforeEach(() => {
    mockRepo = {
      updateStatus: jest.fn()
    };

    useCase = new UpdateBookingsStatusUseCase(mockRepo);
  });

  it("should update booking status successfully", async () => {
    mockRepo.updateStatus.mockResolvedValue({
      id: 1,
      status: "completed"
    });

    const result = await useCase.execute(1, "completed");

    expect(mockRepo.updateStatus).toHaveBeenCalledWith(1, "completed");
    expect(result).toHaveProperty("status", "completed");
  });

  it("should throw if repository throws an error", async () => {
    mockRepo.updateStatus.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute(1, "cancelled")).rejects.toThrow("DB error");
  });
});
