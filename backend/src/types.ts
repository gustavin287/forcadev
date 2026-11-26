export type StatusPartida = 'em_andamento' | 'vitoria' | 'derrota';

export interface EstadoPartida {
  id: number;
  jogador: string;
  categoria: string;
  mascara: string;
  letrasTentadas: string[];
  vidasRestantes: number;
  status: StatusPartida;
  pontos: number;
  palavra: string | null;
}

export interface ItemRanking {
  jogador: string;
  pontos: number;
  palavra: string;
  finalizadaEm: string;
}

export interface PartidaJogo {
  palavra: string;
  letrasTentadas: string[];
  vidasRestantes: number;
  status: StatusPartida;
  pontos: number;
}

export interface LinhaPartida {
  id: number;
  jogador: string;
  palavra_id: number;
  texto: string;
  categoria: string;
  letras_tentadas: string;
  erros: number;
  status: StatusPartida;
  pontos: number;
  finalizada_em: string | null;
}
