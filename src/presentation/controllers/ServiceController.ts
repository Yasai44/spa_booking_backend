import { Request, Response, NextFunction } from "express";
import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository";
import { CreateServiceUseCase } from "../../application/use-cases/CreateServiceUseCase";
import { GetAllServiceUseCase } from "../../application/use-cases/GetAllServiceUseCase";
import { GetServiceByIdUseCase } from "../../application/use-cases/GetServiceByIdUseCase";
import { UpdateServiceUseCase } from "../../application/use-cases/UpdateServiceUseCase";
import { DeleteServiceUseCase } from "../../application/use-cases/DeleteServiceUseCase";
import { validateService } from "../validation/serviceValidation";

export class ServiceController {
    constructor(private repo: ServiceRepository) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            validateService(req.body);

            const usecase = new CreateServiceUseCase(this.repo);
            const service = await usecase.execute(req.body);

            return res.status(201).json({ success: true, data: service });
        } catch (err) {
            next(err);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usecase = new GetAllServiceUseCase(this.repo);
            const services = await usecase.execute();

            return res.json({ success: true, data: services });
        } catch (err) {
            next(err);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usecase = new GetServiceByIdUseCase(this.repo);
            const service = await usecase.execute(Number(req.params.id));

            return res.json({ success: true, data: service });
        } catch (err) {
            next(err);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            validateService(req.body);

            const usecase = new UpdateServiceUseCase(this.repo);
            const service = await usecase.execute(
                Number(req.params.id),
                req.body
            );

            return res.json({ success: true, data: service });
        } catch (err) {
            next(err);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usecase = new DeleteServiceUseCase(this.repo);
            const service = await usecase.execute(Number(req.params.id));

            return res.json({ success: true, data: service });
        } catch (err) {
            next(err);
        }
    };
}
