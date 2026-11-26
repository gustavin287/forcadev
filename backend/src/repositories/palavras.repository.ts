import { db } from '../database/db';

interface PalavraBanco { id: number; texto: string; categoria: string }

export function sortearPalavra(): PalavraBanco | undefined {
  return db.prepare('SELECT id, texto, categoria FROM palavras ORDER BY RANDOM() LIMIT 1')
    .get() as PalavraBanco | undefined;
}
