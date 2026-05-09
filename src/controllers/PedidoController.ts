import { NextFunction, Request, Response } from 'express';
import { PedidoService } from '../services/PedidoService';

export class PedidoController {
    async criar(req: Request, res: Response, next: NextFunction) {
        try {
            const pedidoService = new PedidoService();
            const novoPedido = await pedidoService.criar(req.body);

            return res.status(201).json(novoPedido);

        } catch (error: any) {
            next(error);
        }
    }

    async atualizarStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { novo_status } = req.body;
            const usuario_id = (req as any).usuario.id;
            
            const dados = { pedido_id: Number(id), novo_status, usuario_id };

            const pedidoService = new PedidoService();
            const pedidoAtualizado = await pedidoService.atualizarStatus(dados);

            return res.status(200).json(pedidoAtualizado);

        } catch (error: any) {
            next(error);
        };
    };

    async obterTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const pedidoService = new PedidoService();
            const pedidos = await pedidoService.obterTodos();
            
            res.status(200).json(pedidos);
            
        } catch (error: any) {
            next(error);
        };
    };
};
