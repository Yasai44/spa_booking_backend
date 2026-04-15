import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository";
import { CreateServiceDTO } from "../dto/CreateServiceDTO";

export class CreateServiceUseCase{
    constructor(private repo: ServiceRepository){}

    async execute(data: CreateServiceDTO){
        return this.repo.create(data);
    }
}