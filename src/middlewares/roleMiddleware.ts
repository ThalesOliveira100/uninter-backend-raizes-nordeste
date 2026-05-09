import { NextFunction, Request, Response } from "express";
import { ErrorAcessoNegado } from "../errors/ErrorAcessoNegado";

export function verificarPermissao(perfisPermitidos: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const usuario = (req as any).usuario;

        if (!usuario || !perfisPermitidos.includes(usuario.perfil)) {
            return next(new ErrorAcessoNegado());
        };

        return next();
    };
};
