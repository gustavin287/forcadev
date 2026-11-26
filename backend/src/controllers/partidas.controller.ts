import type { Request, Response } from 'express';
import { idSchema, novaPartidaSchema, palpiteSchema } from '../schemas/partida.schemas';
import { enviarPalpite, iniciarPartida, listarRanking, obterPartida } from '../services/partidas.service';

export function postPartida(req: Request, res: Response): void {
  const { jogador } = novaPartidaSchema.parse(req.body);
  res.status(201).json(iniciarPartida(jogador));
}

export function getPartida(req: Request, res: Response): void {
  const id = idSchema.parse(req.params.id);
  res.json(obterPartida(id));
}

export function postPalpite(req: Request, res: Response): void {
  const id = idSchema.parse(req.params.id);
  const { letra } = palpiteSchema.parse(req.body);
  res.json(enviarPalpite(id, letra));
}

export function getRanking(_req: Request, res: Response): void {
  res.json(listarRanking());
}
