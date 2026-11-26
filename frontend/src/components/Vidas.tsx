import { Heart } from 'lucide-react';
interface Props { restantes: number }
export function Vidas({ restantes }: Props) {
  return <div className="vidas" aria-label={`${restantes} de 6 vidas restantes`}>
    {Array.from({ length: 6 }, (_, i) => <Heart key={i} size={22} fill={i < restantes ? 'currentColor' : 'none'} className={i < restantes ? 'heart-live' : 'heart-dead'} />)}
    <span>{restantes}/6</span>
  </div>;
}
