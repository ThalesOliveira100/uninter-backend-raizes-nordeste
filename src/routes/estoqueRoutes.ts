import { Router } from 'express';
import { EstoqueController } from '../controllers/EstoqueController';
import { verificarToken } from '../middlewares/authMiddleware';
import { verificarPermissao } from '../middlewares/roleMiddleware';
import { PerfilUsuario } from '../enums/PerfilUsuario';

const estoqueRoutes = Router();
const estoqueController = new EstoqueController();

estoqueRoutes
    .get('/', 
        verificarToken,
        verificarPermissao([PerfilUsuario.GERENTE]),
        estoqueController.listarCardapioDaUnidade.bind(estoqueController));

export { estoqueRoutes };