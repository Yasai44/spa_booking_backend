import { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";

export class AuthController {
    constructor(
        private registerUser: RegisterUserUseCase,
        private loginUser: LoginUserUseCase
    ) {}

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Name, email, and password are required"
                });
            }

            const user = await this.registerUser.execute(name, email, password);

   
            const { password: _, ...safeUser } = user;

            return res.status(201).json({
                success: true,
                data: safeUser
            });
        } catch (err) {
            next(err);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
            }

            const result = await this.loginUser.execute(email, password);

            return res.json({
                success: true,
                data: result
            });
        } catch (err) {
            next(err);
        }
    };
}
