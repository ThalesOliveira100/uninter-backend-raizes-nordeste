import express from 'express';
import { PedidoController } from './controllers/PedidoController';

const app = express();

app.use(express.json());

app.get('/api/ping', (req, res) => {
    res.json({ message: 'API Raízes do Nordeste rodando com sucesso!' });
});

const pedidoController = new PedidoController();
app.post('/api/pedidos', pedidoController.criar.bind(pedidoController));
app.patch('/api/pedidos/:id/status', pedidoController.atualizarStatus.bind(pedidoController));


const PORT = 3000; // Usar o dotenv depois.
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
