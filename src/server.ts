import express from 'express';
import { PedidoController } from './controllers/PedidoController';

const app = express();

app.use(express.json());

app.get('/api/ping', (req, res) => {
    res.json({ message: 'API Raízes do Nordeste rodando com sucesso!' });
});

const pedidoController = new PedidoController();
app.post('/api/pedidos', pedidoController.criar.bind(pedidoController));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
