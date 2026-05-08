import { Router } from "express";
import { pedidoRoutes } from "./pedidoRoutes";
// import { authRoutes } from './authRoutes';
// import { produtoRoutes } from './produtoRoutes';

const routes = Router();

// Rota de teste de conexão da API
routes.get('/ping', (req, res) => {
    res.json({ message: 'API Raízes do Nordeste rodando com sucesso!' });
});

routes.use('/pedidos', pedidoRoutes);
// routes.use('/auth', authRoutes);
// routes.use('/produtos', produtoRoutes);

export { routes };