import { UserRepository } from "../../domain/interfaces/UserRepository";
import { User } from "../../domain/entites/User";
import bcrypt from "bcryptjs";

export class RegisterUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(name: string, email: string, password: string): Promise<User>{
        const existing = await this.userRepository.findByEmail(email);
        if (existing) throw new Error("Email already registered");

        const hashed = await bcrypt.hash(password, 10);

        // Let Prisma generate the ID
        return this.userRepository.create({
            name,
            email,
            password: hashed,
            role: "user"
        });
    }
}
