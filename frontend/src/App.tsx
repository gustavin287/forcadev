import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Braces, Code2, Keyboard, RotateCcw, ShieldCheck, Sparkles, Trophy, Zap } from 'lucide-react';
import { api } from './api/cliente';
import { Forca } from './components/Forca';
import { Mascara } from './components/Mascara';
import { Ranking } from './components/Ranking';
import { Teclado } from './components/Teclado';
import { Vidas } from './components/Vidas';
import type { EstadoPartida, ItemRanking } from './types';

export default function App() {
  const [jogador, setJogador] = useState('');
  const [partida, setPartida] = useState<EstadoPartida | null>(null);
  const [ranking, setRanking] = useState<ItemRanking[]>([]);
  const [carregandoRanking, setCarregandoRanking] = useState(true);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarRanking = useCallback(async () => {
    setCarregandoRanking(true);
    try { setRanking(await api.ranking()); }
    catch (e) { setErro((e as Error).message); }
    finally { setCarregandoRanking(false); }
  }, []);
  useEffect(() => { void atualizarRanking(); }, [atualizarRanking]);

  const iniciar = async () => {
    if (jogador.trim().length < 3 || jogador.trim().length > 20 || ocupado) return;
    setOcupado(true); setErro(null);
    try { setPartida(await api.novaPartida(jogador.trim())); }
    catch (e) { setErro((e as Error).message); }
    finally { setOcupado(false); }
  };

  const palpitar = useCallback(async (letra: string) => {
    if (!partida || partida.status !== 'em_andamento' || ocupado || partida.letrasTentadas.includes(letra)) return;
    setOcupado(true); setErro(null);
    try {
      const novo = await api.palpitar(partida.id, letra);
      setPartida(novo);
      if (novo.status !== 'em_andamento') void atualizarRanking();
    } catch (e) { setErro((e as Error).message); }
    finally { setOcupado(false); }
  }, [partida, ocupado, atualizarRanking]);

  useEffect(() => {
    if (!partida || partida.status !== 'em_andamento') return;
    const ouvirTecla = (ev: KeyboardEvent) => {
      if (ev.ctrlKey || ev.metaKey || ev.altKey || ev.repeat) return;
      if (ev.target instanceof HTMLInputElement || ev.target instanceof HTMLTextAreaElement) return;
      if (/^[a-z]$/i.test(ev.key)) { ev.preventDefault(); void palpitar(ev.key.toUpperCase()); }
    };
    window.addEventListener('keydown', ouvirTecla);
    return () => window.removeEventListener('keydown', ouvirTecla);
  }, [partida, palpitar]);

  const voltar = () => { setPartida(null); setErro(null); void atualizarRanking(); };
  const encerrada = partida?.status !== 'em_andamento';
  return <div className="app-shell">
    <header className="topbar container"><div className="brand"><span className="brand-icon"><Braces size={22} strokeWidth={2.8}/></span><span>FORCA<span className="brand-highlight">DEV</span><span className="brand-dot">.</span></span></div><span className="topbar-right"><span className="live-dot"/> DESAFIO DE PROGRAMAÇÃO</span></header>
    <main className="container">
      {!partida ? <>
        <div className="hero"><div className="eyebrow"><Sparkles size={14}/> TESTE SEUS CONHECIMENTOS</div><h1>Jogo da forca</h1><p>Descubra palavras relacionadas à programação.</p></div>
        <div className="home-grid"><section className="start-card card"><div className="card-title"><span className="section-icon"><Code2 size={21}/></span><div><h2>Nova partida</h2><p>Digite seu apelido para jogar.</p></div></div><label htmlFor="jogador">SEU APELIDO</label><input id="jogador" value={jogador} onChange={e => setJogador(e.target.value)} maxLength={20} placeholder="Seu apelido" onKeyDown={e => { if (e.key === 'Enter') void iniciar(); }}/><div className="input-help">Entre 3 e 20 caracteres</div><button className="primary-button" disabled={ocupado || jogador.trim().length < 3 || jogador.trim().length > 20} onClick={() => void iniciar()}>{ocupado ? 'Iniciando...' : 'Jogar'} <ArrowRight size={19}/></button><div className="divider-line"/><div className="game-features"><span><ShieldCheck size={17}/> 6 vidas</span><span><Keyboard size={17}/> 26 letras</span><span><Zap size={17}/> Pontos por vitória</span></div></section><Ranking itens={ranking} carregando={carregandoRanking}/></div>
        <div className="hint-bar"><span className="hint-icon"><Zap size={19}/></span><div><strong>Dica de dev</strong><span>Os termos são de JavaScript, TypeScript e React. A palavra muda a cada rodada.</span></div></div>
      </> : <>
        <div className="game-header"><div><div className="eyebrow"><span className="live-dot"/> PARTIDA #{String(partida.id).padStart(4, '0')}</div><h1>{partida.status === 'em_andamento' ? 'Descubra a palavra' : partida.status === 'vitoria' ? 'Vitória!' : 'Fim de jogo'}</h1><p>Jogador: <strong>{partida.jogador}</strong></p></div><button className="secondary-button" onClick={voltar}><RotateCcw size={17}/> Novo jogo</button></div>
        <div className="game-grid"><section className="card play-card"><div className="game-meta"><span className="category"><Code2 size={15}/> {partida.categoria}</span><span className="remaining">{partida.mascara.length} LETRAS</span></div><div className="drawing-wrap"><Forca erros={6 - partida.vidasRestantes}/></div><div className="word-label">PALAVRA SECRETA</div><Mascara mascara={partida.mascara}/><div className="lives-row"><span>SUAS VIDAS</span><Vidas restantes={partida.vidasRestantes}/></div></section>
        <section className="card interaction-card">{!encerrada ? <><div className="card-title"><span className="section-icon"><Keyboard size={21}/></span><div><h2>Escolha uma letra</h2><p>Clique ou use o teclado físico</p></div></div><Teclado tentadas={partida.letrasTentadas} mascara={partida.mascara} desabilitado={ocupado} onLetra={letra => void palpitar(letra)}/><div className="attempts"><strong>LETRAS TENTADAS</strong><span>{partida.letrasTentadas.length ? partida.letrasTentadas.join('  ·  ') : 'Nenhuma ainda'}</span></div><p className="status-note">{ocupado ? 'Verificando palpite...' : 'Acertos aparecem em verde. Erros, em vermelho.'}</p></> : <div className="result"><div className={`result-icon ${partida.status}`}><Trophy size={36}/></div><h2>{partida.status === 'vitoria' ? 'Vitória!' : 'Derrota'}</h2><p>{partida.status === 'vitoria' ? 'Você revelou todas as letras!' : 'Você ficou sem vidas.'}</p><span className="result-label">A PALAVRA ERA</span><div className="result-word">{partida.palavra}</div><div className="result-points"><strong>{partida.pontos}</strong><span>PONTOS</span></div><button className="primary-button" onClick={() => void iniciar()} disabled={ocupado}><RotateCcw size={18}/> {ocupado ? 'Iniciando...' : 'Jogar de novo'}</button><button className="link-button" onClick={voltar}>Voltar ao início</button></div>}</section></div>
      </>}
      {erro && <div className="error-toast" role="alert">{erro}<button onClick={() => setErro(null)} aria-label="Fechar erro">×</button></div>}
    </main><footer className="footer container"><span>© 2026 FORCA<span>DEV.</span></span><span>Feito para quem pensa em código.</span></footer>
  </div>;
}
