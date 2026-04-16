import { CancelBookingUseCase } from "../../application/use-cases/CancelBookingUseCase";

describe("CancelBookingUseCase", () => {
  let mockRepo: any;
  let useCase: CancelBookingUseCase;

  beforeEach(() => {
    mockRepo = {
      cancel: jest.fn()
    };

    useCase = new CancelBookingUseCase(mockRepo);
  });

  it("should cancel a booking successfully", async () => {
    mockRepo.cancel.mockResolvedValue({
      id: 1,
      userId: 123,
      status: "cancelled"
    });

    const result = await useCase.execute(1, 123);

    expect(mockRepo.cancel).toHaveBeenCalledWith(1, 123);
    expect(result).toHaveProperty("status", "cancelled");
  });

  it("should throw if repository throws an error", async () => {
    mockRepo.cancel.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute(1, 123)).rejects.toThrow("DB error");
  });
});
