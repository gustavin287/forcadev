import { Trophy } from 'lucide-react';
import type { ItemRanking } from '../types';
interface Props { itens: ItemRanking[]; carregando: boolean }
export function Ranking({ itens, carregando }: Props) {
  return <section className="ranking card">
    <div className="card-title"><span className="section-icon gold"><Trophy size={19}/></span><div><h2>Ranking</h2><p>As 10 melhores partidas</p></div></div>
    {carregando ? <p className="vazio">Carregando ranking...</p> : itens.length === 0 ?
      <div className="ranking-empty"><Trophy size={35}/><p>Nenhuma vitória registrada.</p></div> :
      <div className="table-wrap"><table><thead><tr><th>#</th><th>JOGADOR</th><th>PONTOS</th></tr></thead><tbody>
        {itens.map((item, indice) => <tr key={`${item.jogador}-${item.finalizadaEm}-${indice}`}><td><span className={`rank-num rank-${indice + 1}`}>{String(indice + 1).padStart(2, '0')}</span></td><td><strong>{item.jogador}</strong><small>{item.palavra}</small></td><td><span className="score">{item.pontos}</span></td></tr>)}
      </tbody></table></div>}
  </section>;
}
