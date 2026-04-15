import { BookingRepository } from "../../infrastructure/repositories/BookingRepository";
import { CreateBookingDTO } from "../dto/CreateBookingDTO";

export class CreateBookingUseCase {
    constructor(private repo: BookingRepository) {}

    async execute(data: CreateBookingDTO) {
        return this.repo.create(data);
    }
}
