import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { AppError } from "../errors/AppError";

export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const authService = new AuthService();
            const respostaLogin = await authService.login(req.body);
            
            return res.status(200).json(respostaLogin);

        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.errorCode,
                    message: error.message,
                    details: error.details,
                    timestamp: new Date().toISOString(),
                    path: req.originalUrl
                });
            };

            return res.status(500).json({
                error: "ERRO_INTERNO",
                message: "Falha inesperada no servidor durante o login.",
                timestamp: new Date().toISOString(),
                path: req.originalUrl
            });
        }
    }
};
