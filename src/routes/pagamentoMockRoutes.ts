import { Router } from "express";
import { PagamentoMockController } from "../controllers/PagamentoMockController";
import { verificarToken } from "../middlewares/authMiddleware";

const pagamentoMockRoutes = Router();
const pagamentoMockController = new PagamentoMockController();

pagamentoMockRoutes
    .post('/', 
        verificarToken,
        pagamentoMockController.pagar.bind(pagamentoMockController)
    );

export { pagamentoMockRoutes };
