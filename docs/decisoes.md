# Decisões técnicas

## Decisão 1 — Não enviar a palavra durante o jogo

- **Contexto:** o React precisa mostrar o progresso sem revelar a palavra no navegador.
- **Decisão:** enviar máscara e `palavra: null` enquanto a partida estiver ativa.
- **Alternativa descartada:** enviar a palavra e escondê-la com CSS.
- **Consequência:** palpites exigem chamadas à API, mas a palavra não fica exposta.

## Decisão 2 — Regras em funções puras

- **Contexto:** regras de vida, repetição e vitória precisam ser testadas sem HTTP.
- **Decisão:** criar `gerarMascara`, `calcularPontos` e `aplicarPalpite` em `src/game/regras.ts`.
- **Alternativa descartada:** implementar regras diretamente na rota HTTP.
- **Consequência:** as regras podem ser testadas separadamente.

## Decisão 3 — SQLite com parâmetros e transação

- **Contexto:** partidas precisam persistir entre reinicializações do servidor.
- **Decisão:** usar `better-sqlite3`, parâmetros `?` e transação ao registrar palpites.
- **Alternativa descartada:** armazenar partidas apenas em arrays da memória.
- **Consequência:** as partidas e o ranking ficam salvos no banco local.

## Decisão 4 — Proxy do Vite

- **Contexto:** React e API usam portas diferentes no desenvolvimento.
- **Decisão:** chamar caminhos `/api` e repassar ao Express pelo proxy do Vite.
- **Alternativa descartada:** colocar URL absoluta do servidor no cliente.
- **Consequência:** código do cliente mais simples no desenvolvimento.
