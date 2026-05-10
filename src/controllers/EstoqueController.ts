import { NextFunction, Request, Response } from 'express';
import { EstoqueService } from '../services/EstoqueService';

export class EstoqueController {
    async listarCardapioDaUnidade(req: Request, res: Response, next: NextFunction) {
        try {
            const estoqueService = new EstoqueService();
            const { unidade_id } = req.query;

            const resultado = await estoqueService.listarCardapioDaUnidade(Number(unidade_id));

            return res.status(200).json(resultado);
            
        } catch (error: any) {
            next(error);
        };
    };
};
