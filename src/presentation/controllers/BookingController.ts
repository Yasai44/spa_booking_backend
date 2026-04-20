import { Request, Response, NextFunction } from "express";
import { BookingRepository } from "../../infrastructure/repositories/BookingRepository";
import { CreateBookingUseCase } from "../../application/use-cases/CreateBookingUseCase";
import { GetMyBookingsUseCase } from "../../application/use-cases/GetMyBookingsUseCase";
import { CancelBookingUseCase } from "../../application/use-cases/CancelBookingUseCase";
import { GetAllBookingsUseCase } from "../../application/use-cases/GetAllBookingsUseCase";
import { UpdateBookingsStatusUseCase } from "../../application/use-cases/UpdateBookingsStatusUseCase";
import { validateBooking } from "../validation/bookingValidation";

export class BookingController {
    constructor(private repo: BookingRepository) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            validateBooking(req.body);

            const user = (req as any).user;

            const conflict = await this.repo.existsConflict(
                req.body.serviceId,
                req.body.date,
                req.body.time
            );

            if (conflict) {
                return res.status(400).json({
                    success: false,
                    message: "This time slot is already booked."
                });
            }

            const usecase = new CreateBookingUseCase(this.repo);

            const booking = await usecase.execute({
                userId: user.id,
                ...req.body
            });

            return res.status(201).json({ success: true, data: booking });
        } catch (err) {
            next(err);
        }
    };

    getMine = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user;
            const usecase = new GetMyBookingsUseCase(this.repo);

            const bookings = await usecase.execute(user.id);

            return res.json({ success: true, data: bookings });
        } catch (err) {
            next(err);
        }
    };

    cancel = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user;
            const usecase = new CancelBookingUseCase(this.repo);

            const result = await usecase.execute(
                Number(req.params.id),
                user.id
            );

            if (result.count === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found."
                });
            }

            return res.json({ success: true, data: result });
        } catch (err) {
            next(err);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usecase = new GetAllBookingsUseCase(this.repo);
            const bookings = await usecase.execute();

            return res.json({ success: true, data: bookings });
        } catch (err) {
            next(err);
        }
    };

    updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { status } = req.body;

            if (!["pending", "approved", "declined", "cancelled"].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid booking status"
                });
            }

            const usecase = new UpdateBookingsStatusUseCase(this.repo);

            const booking = await usecase.execute(
                Number(req.params.id),
                status
            );

            return res.json({
                success: true,
                data: {
                    id: booking.id,
                    status: booking.status
                }
            });
        } catch (err) {
            next(err);
        }
    };
}