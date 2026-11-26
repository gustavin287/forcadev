import { db } from '../database/db';
import type { ItemRanking, LinhaPartida, PartidaJogo } from '../types';

export function criarPartida(jogador: string, palavraId: number): number {
  const resultado = db.prepare('INSERT INTO partidas (jogador, palavra_id) VALUES (?, ?)').run(jogador, palavraId);
  return Number(resultado.lastInsertRowid);
}

export function buscarPartida(id: number): LinhaPartida | undefined {
  return db.prepare(`
    SELECT p.*, w.texto, w.categoria FROM partidas p
    JOIN palavras w ON w.id = p.palavra_id WHERE p.id = ?
  `).get(id) as LinhaPartida | undefined;
}

export function salvarPalpite(id: number, jogo: PartidaJogo): void {
  db.prepare(`UPDATE partidas SET letras_tentadas = ?, erros = ?, status = ?, pontos = ?,
      finalizada_em = CASE WHEN ? = 'em_andamento' THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%fZ','now') END
      WHERE id = ?`)
    .run(jogo.letrasTentadas.join(''), 6 - jogo.vidasRestantes,
      jogo.status, jogo.pontos, jogo.status, id);
}

export function listarRanking(): ItemRanking[] {
  const linhas = db.prepare(`
    SELECT p.jogador, p.pontos, w.texto AS palavra, p.finalizada_em AS finalizadaEm
    FROM partidas p JOIN palavras w ON p.palavra_id = w.id
    WHERE p.status = 'vitoria'
    ORDER BY p.pontos DESC, p.finalizada_em ASC, p.id ASC LIMIT 10
  `).all() as ItemRanking[];
  return linhas;
}
