import { Request, Response } from "express";
import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository";
import { CreateServiceUseCase } from "../../application/use-cases/CreateServiceUseCase";
import { GetAllServiceUseCase } from "../../application/use-cases/GetAllServiceUseCase";
import { GetServiceByIdUseCase } from "../../application/use-cases/GetServiceByIdUseCase";
import { UpdateServiceUseCase } from "../../application/use-cases/UpdateServiceUseCase";
import { DeleteServiceUseCase } from "../../application/use-cases/DeleteServiceUseCase";
import { validateService } from "../validation/serviceValidation";

export class ServiceController {
    constructor(private repo: ServiceRepository) {}

    create = async (req: Request, res: Response) => {
        validateService(req.body);

        const usecase = new CreateServiceUseCase(this.repo);
        const service = await usecase.execute(req.body);

        return res.status(201).json({ success: true, data: service });
    };

    getAll = async (req: Request, res: Response) => {
        const usecase = new GetAllServiceUseCase(this.repo);
        const services = await usecase.execute();

        return res.json({ success: true, data: services });
    };

    getById = async (req: Request, res: Response) => {
        const usecase = new GetServiceByIdUseCase(this.repo);
        const service = await usecase.execute(Number(req.params.id));

        return res.json({ success: true, data: service });
    };

    update = async (req: Request, res: Response) => {
        validateService(req.body);

        const usecase = new UpdateServiceUseCase(this.repo);
        const service = await usecase.execute(
            Number(req.params.id),
            req.body
        );

        return res.json({ success: true, data: service });
    };

    delete = async (req: Request, res: Response) => {
        const usecase = new DeleteServiceUseCase(this.repo);
        const service = await usecase.execute(Number(req.params.id));

        return res.json({ success: true, data: service });
    };
}
