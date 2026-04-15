import { prisma } from "../database/prismaClient";
import { CreateServiceDTO } from "../../application/dto/CreateServiceDTO";
import { UpdateServiceDTO } from "../../application/dto/UpdateServiceDTO";

export class ServiceRepository {
    async create(data: CreateServiceDTO) {
        return prisma.service.create({
            data
        });
    }

    async getAll() {
        return prisma.service.findMany();
    }

    async getById(id: number) {
        return prisma.service.findUnique({
            where: { id }
        });
    }

    async update(id: number, data: UpdateServiceDTO) {
        return prisma.service.update({
            where: { id },
            data
        });
    }

    async delete(id: number) {
        return prisma.service.delete({
            where: { id }
        });
    }
}
