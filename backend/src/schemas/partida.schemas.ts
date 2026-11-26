import { z } from 'zod';

export const novaPartidaSchema = z.object({ jogador: z.string().trim().min(3).max(20) });
export const palpiteSchema = z.object({
  letra: z.string().regex(/^[A-Za-z]$/, 'Envie uma única letra de A a Z').transform(l => l.toUpperCase())
});
export const idSchema = z.coerce.number().int().positive();
