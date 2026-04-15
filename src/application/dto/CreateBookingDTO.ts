export interface CreateBookingDTO {
  userId: number;
  guestName?: string;
  guestEmail?: string;
  serviceId: number;
  date: string;
  time: string;
}
