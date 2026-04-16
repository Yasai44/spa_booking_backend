import { BookingRepository } from "../../infrastructure/repositories/BookingRepository";
import { CreateBookingDTO } from "../dto/CreateBookingDTO";

export class CreateBookingUseCase {
    constructor(private repo: BookingRepository) {}

    async execute(data: CreateBookingDTO) {

        const conflict = await this.repo.existsConflict(
            data.serviceId,
            data.date,
            data.time
        );

        if (conflict) {
            throw new Error("This time slot is already booked.");
        }

        return this.repo.create(data);
    }
}

