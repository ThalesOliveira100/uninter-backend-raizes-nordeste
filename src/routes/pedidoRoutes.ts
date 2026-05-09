import { Router } from 'express';
import { PedidoController } from '../controllers/PedidoController';

const pedidoRoutes = Router();
const pedidoController = new PedidoController();

pedidoRoutes
    .post('/', pedidoController.criar.bind(pedidoController))
    .get('/', pedidoController.obterTodos.bind(pedidoController))
    .patch('/:id/status', pedidoController.atualizarStatus.bind(pedidoController));

export { pedidoRoutes };
