interface Props { mascara: string }
export function Mascara({ mascara }: Props) {
  return <div className="mascara" aria-label={`Palavra: ${mascara}`}>
    {[...mascara].map((letra, i) => <span className={`casa ${letra !== '_' ? 'revelada' : ''}`} key={i}>{letra === '_' ? ' ' : letra}</span>)}
  </div>;
}
