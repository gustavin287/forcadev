import Database from 'better-sqlite3';

export const db = new Database(process.env.DB_PATH ?? 'forca.db');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS palavras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL UNIQUE,
    categoria TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS partidas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jogador TEXT NOT NULL,
    palavra_id INTEGER NOT NULL REFERENCES palavras(id),
    letras_tentadas TEXT NOT NULL DEFAULT '',
    erros INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'em_andamento'
      CHECK(status IN ('em_andamento', 'vitoria', 'derrota')),
    pontos INTEGER NOT NULL DEFAULT 0,
    criada_em TEXT NOT NULL DEFAULT (datetime('now')),
    finalizada_em TEXT
  );
`);
