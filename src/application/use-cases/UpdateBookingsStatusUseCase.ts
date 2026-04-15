import { BookingRepository } from "../../infrastructure/repositories/BookingRepository";

export class UpdateBookingsStatusUseCase{
    constructor(private repo: BookingRepository){}

    async execute(id: number, status: string){
        return this.repo.updateStatus(id, status);
    }
}