interface Props { erros: number }
export function Forca({ erros }: Props) {
  return <svg className="forca-svg" viewBox="0 0 220 220" role="img" aria-label={`Desenho da forca: ${erros} erros`}>
    <defs><linearGradient id="wood" x1="0" x2="1"><stop stopColor="#8e9cb7"/><stop offset="1" stopColor="#667493"/></linearGradient></defs>
    <path d="M25 201H135 M52 201V20H135V49" fill="none" stroke="url(#wood)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M135 49V65" fill="none" stroke="#8795af" strokeWidth="4" strokeLinecap="round" />
    {erros >= 1 && <circle cx="135" cy="82" r="17" className="bone" />}
    {erros >= 2 && <path d="M135 100V145" className="bone" />}
    {erros >= 3 && <path d="M135 112L108 134" className="bone" />}
    {erros >= 4 && <path d="M135 112L162 134" className="bone" />}
    {erros >= 5 && <path d="M135 145L112 178" className="bone" />}
    {erros >= 6 && <path d="M135 145L158 178" className="bone" />}
  </svg>;
}
