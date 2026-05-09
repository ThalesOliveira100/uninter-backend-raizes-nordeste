import { NextFunction, Request, Response } from 'express';
import { PagamentoMockService } from '../services/PagamentoMockService';

export class PagamentoMockController {
    async pagar(req: Request, res: Response, next: NextFunction) {
        try {
            const pagamentoService = new PagamentoMockService();
            const resultado = await pagamentoService.processarPagamento(req.body);

            return res.status(200).json(resultado);
            
        } catch (error: any) {
            next(error);
        };
    };
};
