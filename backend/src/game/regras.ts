import { ErroApp } from '../errors';
import type { PartidaJogo } from '../types';

export const VIDAS_INICIAIS = 6;

/** Mostra as letras já tentadas. */
export function gerarMascara(palavra: string, tentadas: string[]): string {
  return [...palavra].map(letra => tentadas.includes(letra) ? letra : '_').join('');
}

/** Calcula os pontos da vitória (RN06). */
export function calcularPontos(palavra: string, vidasRestantes: number): number {
  return vidasRestantes * 10 + new Set(palavra).size * 5;
}

/** Verifica o palpite e retorna uma nova partida. */
export function aplicarPalpite(partida: PartidaJogo, entrada: string): PartidaJogo {
  if (!/^[A-Za-z]$/.test(entrada)) throw new ErroApp('Envie uma única letra de A a Z', 400);
  const letra = entrada.toUpperCase();
  if (partida.status !== 'em_andamento') throw new ErroApp('Partida encerrada', 409);
  if (partida.letrasTentadas.includes(letra)) throw new ErroApp('Letra já tentada', 409);

  const letrasTentadas = [...partida.letrasTentadas, letra];
  const vidasRestantes = partida.vidasRestantes - (partida.palavra.includes(letra) ? 0 : 1);
  const venceu = !gerarMascara(partida.palavra, letrasTentadas).includes('_');
  const status = venceu ? 'vitoria' : vidasRestantes === 0 ? 'derrota' : 'em_andamento';
  return {
    ...partida,
    letrasTentadas,
    vidasRestantes,
    status,
    pontos: venceu ? calcularPontos(partida.palavra, vidasRestantes) : 0,
  };
}
