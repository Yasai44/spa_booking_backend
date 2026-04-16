import { User } from "../../domain/entities/User"; // or whatever your User type is

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        role?: string;
        email?: string;
      };
    }
  }
}
