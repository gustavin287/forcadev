# Forca Dev

Jogo da forca com termos de programação. O servidor sorteia uma palavra do SQLite e recebe palpites; a interface React mostra apenas o progresso até a partida terminar.

## Tecnologias

**Back-end:** Node.js, Express 5, TypeScript, SQLite (`better-sqlite3`), Zod, Vitest e Supertest.
**Front-end:** React 19, Vite, TypeScript e Lucide React.

## Pré-requisitos

- Node.js **22 LTS** e npm (ou versão compatível com `better-sqlite3`).
- Dois terminais: um para back e outro para front.

## Rodar o back-end

```bash
cd backend
npm install
npm run seed
npm run dev
```

A API fica em http://localhost:3333. O seed cadastra as palavras no banco `forca.db`.

## Rodar o front-end

Em outro terminal, a partir da pasta do projeto:

```bash
cd frontend
npm install
npm run dev
```

Abra **http://localhost:5173** no navegador. Se o servidor estiver desligado, a interface exibe uma mensagem de erro.

## Testes e compilação

```bash
cd backend
npm test
npm run build
```

```bash
cd frontend
npm run build
```

Os testes usam `DB_PATH=:memory:` e não tocam no banco principal. Há testes das regras e do contrato HTTP.

## Como jogar

1. Digite um apelido de 3 a 20 caracteres.
2. Tente descobrir o termo com o teclado na tela ou o físico.
3. A cada erro perde uma vida, com 6 erros a partida acaba.
4. Ao vencer, ganhe `vidas restantes × 10 + letras diferentes × 5` pontos.
5. Veja seu resultado e tente chegar ao top 10.

## Estrutura

- `backend/src/game`: regras puras e tipadas.
- `backend/src/routes → controllers → services → repositories`: fluxo da API.
- `backend/src/database`: banco e seed.
- `backend/tests`: testes automatizados.
- `frontend/src/components`: componentes tipados (Máscara, Teclado, Vidas, Ranking, Forca).
- `docs`: planejamento, API, decisões e diário.

## Evidência visual

Falta adicionar uma captura de tela do jogo em execução.

## Entrega e tags

Execute no momento apropriado a cada aula, após revisar seus commits:

```bash
git add .
git commit -m "feat: checkpoint da aula"
git tag checkpoint-1
```

Use `checkpoint-2` na Aula 2 e `checkpoint-3` na Aula 3, conforme a evolução **real** do trabalho. Configure o remoto do repositório antes do `git push origin main --tags`.

**Uso de IA:** a implementação inicial, as alterações no design e a revisão do projeto tiveram auxílio de IA. O enunciado não permite código gerado por IA.
