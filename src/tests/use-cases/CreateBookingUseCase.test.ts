import { CreateBookingUseCase } from "../../application/use-cases/CreateBookingUseCase";

describe("CreateBookingUseCase", () => {
  let mockRepo: any;
  let useCase: CreateBookingUseCase;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      existsConflict: jest.fn().mockResolvedValue(false)
    };

    useCase = new CreateBookingUseCase(mockRepo);
  });

  it("should create a booking successfully", async () => {
    const dto = {
      userId: 123,
      serviceId: 456,
      date: "2026-05-01",
      time: "10:00"
    };

    mockRepo.create.mockResolvedValue({
      id: 1,
      ...dto
    });

    const result = await useCase.execute(dto);

    expect(result).toHaveProperty("id");
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });

  it("should throw if repository throws an error", async () => {
    const dto = {
      userId: 123,
      serviceId: 456,
      date: "2026-05-01",
      time: "10:00"
    };

    mockRepo.create.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute(dto)).rejects.toThrow("DB error");
  });
});
