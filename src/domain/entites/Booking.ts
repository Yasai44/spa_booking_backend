export interface Booking{
    id?: number;
    userId: number;
    serviceId: number;
    date: string;
    time: string;
    status?: "pending" | "approved" | "declined" | "cancelled";
    createdAt?: Date;
}