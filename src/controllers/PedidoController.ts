import { Request, Response } from 'express';
import { PedidoService } from '../services/PedidoService';
import { AppError } from '../errors/AppError';

export class PedidoController {
    async criar(req: Request, res: Response) {
        try {
            const pedidoService = new PedidoService();
            const novoPedido = await pedidoService.executar(req.body);

            return res.status(201).json(novoPedido);

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

            console.error(error);
            return res.status(500).json({
                error: "ERRO_INTERNO",
                message: "Falha ao criar o pedido no banco de dados.",
                timestamp: new Date().toISOString(),
                path: req.originalUrl
            });
        }
    }
}