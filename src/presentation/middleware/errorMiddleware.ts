import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error("ERROR:", err);

    const status = err.status || 500;
    const message = err.message || "Internal server error";

    return res.status(status).json({
        success: false,
        message,
        // Only show stack trace in development
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
}
