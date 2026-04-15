import { BookingRepository } from "../../infrastructure/repositories/BookingRepository";

export class CancelBookingUseCase {
  constructor(private repo: BookingRepository) {}

  async execute(bookingId: number, userId: number) {
    return this.repo.cancel(bookingId, userId);
  };
}