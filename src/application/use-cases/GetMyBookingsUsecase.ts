import { BookingRepository } from "../../infrastructure/repositories/BookingRepository";

export class GetMyBookingsUseCase{
    constructor(private repo: BookingRepository){}

    async execute(userId: number){
        return this.repo.getByUser(userId);
    }
}