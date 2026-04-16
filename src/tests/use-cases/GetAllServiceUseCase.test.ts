import { GetAllServiceUseCase } from "../../application/use-cases/GetAllServiceUseCase";

describe("GetAllServiceUseCase", () => {
  let mockRepo: any;
  let useCase: GetAllServiceUseCase;

  beforeEach(() => {
    mockRepo = {
      getAll: jest.fn()
    };

    useCase = new GetAllServiceUseCase(mockRepo);
  });

  it("should return all services", async () => {
    const services = [
      {
        id: 1,
        name: "Facial",
        description: "Deep cleansing facial treatment",
        price: 80,
        duration: 60
      },
      {
        id: 2,
        name: "Hot Stone Therapy",
        description: "Relaxing hot stone massage",
        price: 120,
        duration: 90
      }
    ];

    mockRepo.getAll.mockResolvedValue(services);

    const result = await useCase.execute();

    expect(mockRepo.getAll).toHaveBeenCalled();
    expect(result).toEqual(services);
  });

  it("should throw if repository throws an error", async () => {
    mockRepo.getAll.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute()).rejects.toThrow("DB error");
  });
});
