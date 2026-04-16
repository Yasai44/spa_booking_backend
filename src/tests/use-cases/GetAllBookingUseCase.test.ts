import { GetAllBookingsUseCase } from "../../application/use-cases/GetAllBookingsUseCase";

describe("GetAllBookingsUseCase", () => {
  let mockRepo: any;
  let useCase: GetAllBookingsUseCase;

  beforeEach(() => {
    mockRepo = {
      getAll: jest.fn()
    };

    useCase = new GetAllBookingsUseCase(mockRepo);
  });

  it("should return all bookings", async () => {
    const bookings = [
      { id: 1, userId: 123, serviceId: 10, date: "2026-05-01", time: "10:00" },
      { id: 2, userId: 456, serviceId: 11, date: "2026-05-02", time: "14:00" }
    ];

    mockRepo.getAll.mockResolvedValue(bookings);

    const result = await useCase.execute();

    expect(mockRepo.getAll).toHaveBeenCalled();
    expect(result).toEqual(bookings);
  });

  it("should throw if repository throws an error", async () => {
    mockRepo.getAll.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute()).rejects.toThrow("DB error");
  });
});
