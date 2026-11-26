import type { EstadoPartida, ItemRanking } from '../types';

async function requisitar<T>(url: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } });
  } catch {
    throw new Error('Servidor fora do ar. Verifique se o back-end está ligado.');
  }
  let corpo: unknown;
  try { corpo = await res.json(); } catch { throw new Error('Resposta inválida do servidor.'); }
  if (!res.ok) {
    if (typeof corpo === 'object' && corpo !== null && 'erro' in corpo && typeof corpo.erro === 'string') throw new Error(corpo.erro);
    throw new Error('Erro inesperado na API.');
  }
  return corpo as T;
}

export const api = {
  novaPartida: (jogador: string) => requisitar<EstadoPartida>('/api/partidas', { method: 'POST', body: JSON.stringify({ jogador }) }),
  buscarPartida: (id: number) => requisitar<EstadoPartida>(`/api/partidas/${id}`),
  palpitar: (id: number, letra: string) => requisitar<EstadoPartida>(`/api/partidas/${id}/palpites`, { method: 'POST', body: JSON.stringify({ letra }) }),
  ranking: () => requisitar<ItemRanking[]>('/api/ranking')
};
