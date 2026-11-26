import { describe, expect, it } from 'vitest';
import { aplicarPalpite, calcularPontos, gerarMascara } from '../src/game/regras';
import type { PartidaJogo } from '../src/types';

const base = (): PartidaJogo => ({ palavra: 'PROMISE', letrasTentadas: [], vidasRestantes: 6, status: 'em_andamento', pontos: 0 });

describe('regras do jogo', () => {
  it('oculta letras ainda não tentadas', () => expect(gerarMascara('PROMISE', ['P', 'E'])).toBe('P_____E'));
  it('não desconta vida em acerto e não muta o objeto', () => {
    const partida = base();
    const novo = aplicarPalpite(partida, 'p');
    expect(novo.vidasRestantes).toBe(6);
    expect(novo.letrasTentadas).toEqual(['P']);
    expect(partida.letrasTentadas).toEqual([]);
  });
  it('desconta uma vida em erro', () => expect(aplicarPalpite(base(), 'z').vidasRestantes).toBe(5));
  it('rejeita letra repetida com 409 e não consome vida', () => {
    const partida = aplicarPalpite(base(), 'p');
    expect(() => aplicarPalpite(partida, 'P')).toThrowError(/já tentada/);
    expect(partida.vidasRestantes).toBe(6);
  });
  it('rejeita palpite inválido', () => expect(() => aplicarPalpite(base(), 'ab')).toThrow());
  it('derrota após o sexto erro', () => {
    let jogo = base();
    for (const letra of 'ZXYWQT') jogo = aplicarPalpite(jogo, letra);
    expect(jogo.status).toBe('derrota');
    expect(jogo.pontos).toBe(0);
    expect(jogo.vidasRestantes).toBe(0);
  });
  it('pontua vitória e bloqueia partida finalizada', () => {
    let jogo = base();
    for (const letra of 'PROMISE') jogo = aplicarPalpite(jogo, letra);
    expect(jogo.status).toBe('vitoria');
    expect(jogo.pontos).toBe(95);
    expect(() => aplicarPalpite(jogo, 'Z')).toThrowError(/encerrada/);
  });
  it('calcula pontos pelas letras distintas', () => expect(calcularPontos('BANANA', 4)).toBe(55));
});
