import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function errorHandler(
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.errorCode,
            message: err.message,
            details: err.details,
            timestamp: new Date().toISOString(),
            path: req.originalUrl
        });
    }

    console.error(err);
    return res.status(500).json({
        error: "ERRO_INTERNO",
        message: "Falha inesperada no servidor.",
        timestamp: new Date().toISOString(),
        path: req.originalUrl
    });
}