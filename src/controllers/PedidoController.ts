import { NextFunction, Request, Response } from 'express';
import { PedidoService } from '../services/PedidoService';

export class PedidoController {
    async criar(req: Request, res: Response, next: NextFunction) {
        try {
            const pedidoService = new PedidoService();
            const dadosNovoPedido = { 
                ...req.body, 
                usuario_logado: req.usuario.id,
                usuario_perfil: req.usuario.perfil 
            }
            const novoPedido = await pedidoService.criar(dadosNovoPedido);

            return res.status(201).json(novoPedido);

        } catch (error: any) {
            next(error);
        }
    }

    async atualizarStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { novo_status } = req.body;
            const usuario_id = req.usuario.id;
            const usuario_perfil = req.usuario.perfil;
            
            const dados = { pedido_id: Number(id), novo_status, usuario_id, usuario_perfil };

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

    async obterUm(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const dadosConsulta = {
                id,
                usuario_logado: req.usuario.id,
                usuario_perfil: req.usuario.perfil
            };

            const pedidoService = new PedidoService();
            const pedidoRetornado = await pedidoService.obterUm(dadosConsulta);

            return res.status(200).json(pedidoRetornado);
        } catch (error: any) {
            next(error);
        };
    };
};
