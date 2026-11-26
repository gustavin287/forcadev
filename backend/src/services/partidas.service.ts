import { ErroApp } from '../errors';
import { aplicarPalpite, gerarMascara, VIDAS_INICIAIS } from '../game/regras';
import { sortearPalavra } from '../repositories/palavras.repository';
import { buscarPartida, criarPartida, listarRanking, salvarPalpite } from '../repositories/partidas.repository';
import { db } from '../database/db';
import type { EstadoPartida, LinhaPartida, PartidaJogo } from '../types';

function estado(linha: LinhaPartida): EstadoPartida {
  const letrasTentadas = [...linha.letras_tentadas];
  return {
    id: linha.id,
    jogador: linha.jogador,
    categoria: linha.categoria,
    mascara: gerarMascara(linha.texto, letrasTentadas),
    letrasTentadas,
    vidasRestantes: VIDAS_INICIAIS - linha.erros,
    status: linha.status,
    pontos: linha.pontos,
    palavra: linha.status === 'em_andamento' ? null : linha.texto,
  };
}

export function obterPartida(id: number): EstadoPartida {
  const linha = buscarPartida(id);
  if (!linha) throw new ErroApp('Partida não encontrada', 404);
  return estado(linha);
}

export function iniciarPartida(jogador: string): EstadoPartida {
  const palavra = sortearPalavra();
  if (!palavra) throw new ErroApp('Nenhuma palavra cadastrada. Execute npm run seed.', 500);
  const id = criarPartida(jogador, palavra.id);
  return obterPartida(id);
}

export function enviarPalpite(id: number, letra: string): EstadoPartida {
  // A transação protege o estado da partida em caso de requisições concorrentes.
  return db.transaction(() => {
    const linha = buscarPartida(id);
    if (!linha) throw new ErroApp('Partida não encontrada', 404);
    const atual: PartidaJogo = {
      palavra: linha.texto,
      letrasTentadas: [...linha.letras_tentadas],
      vidasRestantes: VIDAS_INICIAIS - linha.erros,
      status: linha.status,
      pontos: linha.pontos,
    };
    const novo = aplicarPalpite(atual, letra);
    salvarPalpite(id, novo);
    return obterPartida(id);
  })();
}

export { listarRanking };
