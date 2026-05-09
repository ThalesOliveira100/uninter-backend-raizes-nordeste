import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { AppError } from "../errors/AppError";

export class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const authService = new AuthService();
            const respostaLogin = await authService.login(req.body);
            
            return res.status(200).json(respostaLogin);

        } catch (error: any) {
            next(error);
        };
    };
};
