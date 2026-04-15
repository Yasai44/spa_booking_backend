import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository";
import { UpdateServiceDTO } from "../dto/UpdateServiceDTO";

export class UpdateServiceUseCase{
    constructor(private repo: ServiceRepository){}

    async execute(id: number, data: UpdateServiceDTO){
        return this.repo.update(id, data);
    }
}