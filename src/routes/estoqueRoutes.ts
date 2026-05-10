import { Router } from 'express';
import { EstoqueController } from '../controllers/EstoqueController';

const estoqueRoutes = Router();
const estoqueController = new EstoqueController();

estoqueRoutes
    .get('/', estoqueController.listarCardapioDaUnidade.bind(estoqueController));

export { estoqueRoutes };