import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository";

export class DeleteServiceUseCase{
    constructor(private repo: ServiceRepository){}

    async execute(id: number) {
        return this.repo.delete(id);
    }
}