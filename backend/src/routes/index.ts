import { Router } from 'express';
import { postPartida, getPartida, postPalpite, getRanking } from '../controllers/partidas.controller';

export const rotas = Router();
rotas.post('/partidas', postPartida);
rotas.get('/partidas/:id', getPartida);
rotas.post('/partidas/:id/palpites', postPalpite);
rotas.get('/ranking', getRanking);
