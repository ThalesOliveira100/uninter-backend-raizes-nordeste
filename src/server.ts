import express from 'express';
import { routes } from './routes/index';
import "dotenv/config";

const app = express();

app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
