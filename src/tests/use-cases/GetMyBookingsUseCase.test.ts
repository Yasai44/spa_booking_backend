import { GetMyBookingsUseCase } from "../../application/use-cases/GetMyBookingsUseCase";

describe("GetMyBookingsUseCase", () => {
  let mockRepo: any;
  let useCase: GetMyBookingsUseCase;

  beforeEach(() => {
    mockRepo = {
      getByUser: jest.fn()
    };

    useCase = new GetMyBookingsUseCase(mockRepo);
  });

  it("should return bookings for a user", async () => {
    const bookings = [
      { id: 1, userId: 123, serviceId: 10, date: "2026-05-01", time: "10:00" },
      { id: 2, userId: 123, serviceId: 11, date: "2026-05-02", time: "14:00" }
    ];

    mockRepo.getByUser.mockResolvedValue(bookings);

    const result = await useCase.execute(123);

    expect(mockRepo.getByUser).toHaveBeenCalledWith(123);
    expect(result).toEqual(bookings);
  });

  it("should throw if repository throws an error", async () => {
    mockRepo.getByUser.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute(123)).rejects.toThrow("DB error");
  });
});
