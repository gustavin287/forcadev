import { db } from './db';

const palavras: [string, string][] = [
  ['PROMISE', 'JavaScript'], ['CALLBACK', 'JavaScript'], ['CLOSURE', 'JavaScript'],
  ['ARRAY', 'JavaScript'], ['OBJECT', 'JavaScript'], ['FUNCTION', 'JavaScript'],
  ['ASYNC', 'JavaScript'], ['AWAIT', 'JavaScript'], ['CONSOLE', 'JavaScript'],
  ['INTERFACE', 'TypeScript'], ['GENERICS', 'TypeScript'], ['ENUM', 'TypeScript'],
  ['TYPE', 'TypeScript'], ['UNKNOWN', 'TypeScript'], ['NARROWING', 'TypeScript'],
  ['TUPLE', 'TypeScript'], ['READONLY', 'TypeScript'],
  ['COMPONENTE', 'React'], ['ESTADO', 'React'], ['PROPS', 'React'],
  ['HOOK', 'React'], ['EFFECT', 'React'], ['CONTEXT', 'React'], ['RENDER', 'React'],
  ['FRAGMENT', 'React'], ['REDUCER', 'React']
];

const inserir = db.prepare('INSERT OR IGNORE INTO palavras (texto, categoria) VALUES (?, ?)');
db.transaction((lista: [string, string][]) => {
  for (const [texto, categoria] of lista) inserir.run(texto, categoria);
})(palavras);
console.log(`Seed concluído: ${palavras.length} palavras no catálogo.`);
db.close();
