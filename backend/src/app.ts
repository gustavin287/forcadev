import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { ZodError } from 'zod';
import { rotas } from './routes';
import { ErroApp } from './errors';

export const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', rotas);
app.use((_req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof ZodError) {
    res.status(400).json({ erro: 'Dados inválidos' });
    return;
  }
  if (err instanceof ErroApp) {
    res.status(err.status).json({ erro: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ erro: 'Erro interno' });
});
