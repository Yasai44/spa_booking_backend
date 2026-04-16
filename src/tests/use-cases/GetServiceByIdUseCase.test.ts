import { GetServiceByIdUseCase } from "../../application/use-cases/GetServiceByIdUseCase";

describe("GetServiceByIdUseCase", () => {
  let mockRepo: any;
  let useCase: GetServiceByIdUseCase;

  beforeEach(() => {
    mockRepo = {
      getById: jest.fn()
    };

    useCase = new GetServiceByIdUseCase(mockRepo);
  });

  it("should return a service by ID", async () => {
    const service = {
      id: 1,
      name: "Haircut",
      description: "Basic haircut",
      price: 25,
      duration: 30
    };

    mockRepo.getById.mockResolvedValue(service);

    const result = await useCase.execute(1);

    expect(mockRepo.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(service);
  });

  it("should throw if repository throws an error", async () => {
    mockRepo.getById.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute(1)).rejects.toThrow("DB error");
  });
});
