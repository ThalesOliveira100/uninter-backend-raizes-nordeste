import { Router } from 'express';
import { PedidoController } from '../controllers/PedidoController';
import { verificarToken } from '../middlewares/authMiddleware';
import { verificarPermissao } from '../middlewares/roleMiddleware';
import { PerfilUsuario } from '../enums/PerfilUsuario';

const pedidoRoutes = Router();
const pedidoController = new PedidoController();

pedidoRoutes
    .post('/', 
        verificarToken, 
        pedidoController.criar.bind(pedidoController)
    )
    .get('/', 
        verificarToken, 
        verificarPermissao([PerfilUsuario.GERENTE]), 
        pedidoController.obterTodos.bind(pedidoController))
    .get('/:id',
        verificarToken,
        pedidoController.obterUm.bind(pedidoController))
    .patch('/:id/status', 
        verificarToken, 
        verificarPermissao([PerfilUsuario.COZINHA, PerfilUsuario.GERENTE, PerfilUsuario.ATENDENTE]), 
        pedidoController.atualizarStatus.bind(pedidoController)
    );

export { pedidoRoutes };
