import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorNaoAutenticado } from '../errors/ErrorNaoAutenticado';
import { ErrorTokenInvalido } from '../errors/ErrorTokenInvalido';

export function verificarToken(req:Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new ErrorNaoAutenticado());
    };

    const [, token] = authHeader.split(' ');

    try {
        const secret = process.env.JWT_SECRET || 'super_secreto_desenvolvimento';
        const decoded = jwt.verify(token, secret);
        
        (req as any).usuario = decoded;
        
        return next(); 

    } catch (error: any) {
        return next(new ErrorTokenInvalido());
    };
};
