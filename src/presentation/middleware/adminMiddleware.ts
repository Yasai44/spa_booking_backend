import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (user.role.toLowerCase() !== "admin"){
        return res.status(403).json({ error: "Admin access only" });
    }

    next();
};
