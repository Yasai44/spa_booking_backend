import { prisma } from "../database/prismaClient";
import { UserRepository } from "../../domain/interfaces/UserRepository";
import { CreateUserDTO } from "../../application/dto/CreateUserDTO";
import { User } from "../../domain/entites/User";

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    return prisma.user.create({
      data
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email }
    });
  }
}

