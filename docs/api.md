# Contrato de API

Base: `http://localhost:3333/api`. Todas as respostas são JSON. Erros: `{ "erro": "mensagem" }`.

## POST /partidas

Entrada: `{ "jogador": "ana" }` (3–20 caracteres, trim). Sucesso: **201**.

```json
{"id":1,"jogador":"ana","categoria":"React","mascara":"_____","letrasTentadas":[],"vidasRestantes":6,"status":"em_andamento","pontos":0,"palavra":null}
```

O tamanho e a categoria variam conforme a palavra sorteada. Erros: **400** apelido inválido; **500** banco sem palavras.

## GET /partidas/:id

Sem corpo. Sucesso: **200**, com o mesmo objeto `EstadoPartida` acima. Erros: **400** id inválido; **404** id inexistente.

## POST /partidas/:id/palpites

Entrada: `{ "letra": "e" }`. Sucesso: **200** com estado atualizado:

```json
{"id":1,"jogador":"ana","categoria":"React","mascara":"_E___","letrasTentadas":["E"],"vidasRestantes":6,"status":"em_andamento","pontos":0,"palavra":null}
```

A máscara acima é ilustrativa. Erros: **400** letra ou id inválido; **404** partida inexistente; **409** letra repetida ou partida encerrada. A palavra só é revelada em `vitoria` ou `derrota`.

## GET /ranking

Sem corpo. Sucesso: **200** com uma lista de até 10 vitórias.

```json
[{"jogador":"ana","pontos":95,"palavra":"PROMISE","finalizadaEm":"2026-11-12T20:00:00.000Z"}]
```

Ordenação: pontos decrescentes, data de conclusão crescente e id crescente como desempate adicional. Se não houver vitórias, retorna `[]`.
