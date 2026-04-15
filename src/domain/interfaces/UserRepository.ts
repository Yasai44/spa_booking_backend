import { User } from "../entites/User";
import { CreateUserDTO } from "../../application/dto/CreateUserDTO";

export interface UserRepository {
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
