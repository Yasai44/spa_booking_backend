import { BookingRepository } from "../../infrastructure/repositories/BookingRepository";

export class GetAllBookingsUseCase{
    constructor(private repo: BookingRepository){}

    async execute(){
        return this.repo.getAll();
    }
}