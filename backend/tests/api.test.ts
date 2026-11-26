import { beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { db } from '../src/database/db';

beforeAll(() => {
  db.prepare('INSERT OR IGNORE INTO palavras (texto, categoria) VALUES (?, ?)').run('TESTE', 'TypeScript');
});

describe('contrato da API', () => {
  it('rejeita apelido curto com 400', async () => {
    const r = await request(app).post('/api/partidas').send({ jogador: 'a' });
    expect(r.status).toBe(400);
    expect(r.body).toHaveProperty('erro');
  });
  it('cria uma partida sem vazar a palavra', async () => {
    const r = await request(app).post('/api/partidas').send({ jogador: 'ana' });
    expect(r.status).toBe(201);
    expect(r.body.palavra).toBeNull();
    expect(r.body.vidasRestantes).toBe(6);
  });
  it('recupera uma partida e rejeita letras repetidas', async () => {
    const novo = await request(app).post('/api/partidas').send({ jogador: 'joao' });
    const id = novo.body.id as number;
    expect((await request(app).get(`/api/partidas/${id}`)).status).toBe(200);
    expect((await request(app).post(`/api/partidas/${id}/palpites`).send({ letra: 'e' })).status).toBe(200);
    const repetida = await request(app).post(`/api/partidas/${id}/palpites`).send({ letra: 'E' });
    expect(repetida.status).toBe(409);
  });
  it('rejeita palpite inválido com 400', async () => {
    const novo = await request(app).post('/api/partidas').send({ jogador: 'maria' });
    expect((await request(app).post(`/api/partidas/${novo.body.id}/palpites`).send({ letra: '12' })).status).toBe(400);
  });
  it('devolve 404 para partida inexistente', async () => {
    expect((await request(app).get('/api/partidas/999999')).status).toBe(404);
  });
  it('ranking é uma lista', async () => {
    const r = await request(app).get('/api/ranking');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });
});
