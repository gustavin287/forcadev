# Planejamento — Aula 1

## Modelo de dados

- `palavras`: `id INTEGER PRIMARY KEY`, `texto TEXT UNIQUE NOT NULL`, `categoria TEXT NOT NULL`.
- `partidas`: `id INTEGER PRIMARY KEY`, `jogador TEXT`, `palavra_id INTEGER` (FK), `letras_tentadas TEXT`, `erros INTEGER`, `status TEXT`, `pontos INTEGER`, `criada_em TEXT`, `finalizada_em TEXT`.

## API

| Método | Rota | Função |
| --- | --- | --- |
| POST | `/api/partidas` | Iniciar partida |
| GET | `/api/partidas/:id` | Consultar partida |
| POST | `/api/partidas/:id/palpites` | Enviar uma letra |
| GET | `/api/ranking` | Listar 10 melhores vitórias |

## Tipos

- `StatusPartida`: união de `em_andamento`, `vitoria`, `derrota`.
- `EstadoPartida`: id, jogador, categoria, mascara, letrasTentadas, vidasRestantes, status, pontos, palavra.
- `ItemRanking`: jogador, pontos, palavra, finalizadaEm.

## Ordem de implementação

1. Modelagem SQLite, seed com 26 palavras.
2. Funções puras de regras e testes.
3. Rotas, camadas, Zod e erros centralizados.
4. React com estado da API e teclado.
5. Telas de resultado, ranking, documentação e testes finais.
