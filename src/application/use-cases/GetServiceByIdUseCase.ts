import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository"

export class GetServiceByIdUseCase {
    constructor(private repo: ServiceRepository){}

    async execute(id: number){
        return this.repo.getById(id);
    }
}