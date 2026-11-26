interface Props {
  tentadas: string[];
  mascara: string;
  desabilitado: boolean;
  onLetra: (letra: string) => void;
}
const LINHAS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
export function Teclado({ tentadas, mascara, desabilitado, onLetra }: Props) {
  return <div className="teclado" aria-label="Teclado de palpites">
    {LINHAS.map(linha => <div className="teclado-linha" key={linha}>
      {[...linha].map(letra => {
        const tentada = tentadas.includes(letra);
        const acertou = tentada && mascara.includes(letra);
        return <button key={letra} type="button" className={`tecla ${tentada ? acertou ? 'certa' : 'errada' : ''}`}
          disabled={desabilitado || tentada} onClick={() => onLetra(letra)} aria-label={`Letra ${letra}`}>{letra}</button>;
      })}
    </div>)}
  </div>;
}
