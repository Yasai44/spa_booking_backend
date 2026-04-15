import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository";

export class GetAllServiceUseCase{
    constructor(private repo: ServiceRepository){}

    async execute(){
        return this.repo.getAll();
    }
}