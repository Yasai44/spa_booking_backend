import { PrismaClient } from "@prisma/client";
import { CreateBookingDTO } from "../../application/dto/CreateBookingDTO";

const prisma = new PrismaClient();

export class BookingRepository {
    async create(data: CreateBookingDTO) {
        return prisma.booking.create({
            data: {
                userId: data.userId ?? null,
                guestName: data.guestName ?? null,
                guestEmail: data.guestEmail ?? null,
                serviceId: data.serviceId,
                date: data.date,
                time: data.time,
                status: "pending" // default
            }
        });
    }

    async getByUser(userId: number) {
        return prisma.booking.findMany({
            where: { userId },
            include: { service: true }
        });
    }

    async getAll() {
        return prisma.booking.findMany({
            include: { user: true, service: true }
        });
    }

    async updateStatus(id: number, status: string) {
        return prisma.booking.update({
            where: { id },
            data: { status }
        });
    }

    async cancel(bookingId: number, userId: number) {
        return prisma.booking.updateMany({
            where: { id: bookingId, userId },
            data: { status: "cancelled" }
        });
    }

    async existsConflict(serviceId: number, date: string, time: string): Promise<boolean> {
        const existing = await prisma.booking.findFirst({
            where: { serviceId, date, time }
        });

        return !!existing;
    }

}
