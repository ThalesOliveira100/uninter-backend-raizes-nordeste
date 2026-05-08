import { Request, Response } from 'express';
import { PedidoService } from '../services/PedidoService';
import { AppError } from '../errors/AppError';

export class PedidoController {
    async criar(req: Request, res: Response) {
        try {
            const pedidoService = new PedidoService();
            const novoPedido = await pedidoService.criar(req.body);

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

            return res.status(500).json({
                error: "ERRO_INTERNO",
                message: "Falha ao criar o pedido no banco de dados.",
                timestamp: new Date().toISOString(),
                path: req.originalUrl
            });
        }
    }

    async atualizarStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { novo_status, usuario_id } = req.body;
            const dados = { pedido_id: Number(id), novo_status, usuario_id };

            const pedidoService = new PedidoService();
            const pedidoAtualizado = await pedidoService.atualizarStatus(dados);

            return res.status(200).json(pedidoAtualizado);

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
                message: "Falha ao atualizar o status do pedido no banco de dados.",
                details: error.message,
                timestamp: new Date().toISOString(),
                path: req.originalUrl
            });
        };
    };
};
