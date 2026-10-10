import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import delhiEditorial from '@/assets/delhi-editorial.jpg';

export function PortfolioIdentity({ onFollow }: { onFollow: () => void }) {
  return <section id="me" className="editorial-opening">
    <img className="opening-image" src={delhiEditorial} width={1600} height={1008} alt="An imagined monochrome study of Connaught Place, New Delhi" fetchPriority="high"/>
    <div className="opening-shade" aria-hidden="true"/>
    <div className="opening-frame">
      <div className="opening-top mono-label"><span>ANIKET / NEW DELHI</span><span>INDEPENDENT MIND · FULL-STACK ENGINEER</span><span>DESIGN × CODE × SYSTEMS</span></div>
      <div className="opening-heading"><span className="opening-eyebrow mono-label">A LITTLE DESIGN. A LOT OF CURIOSITY.</span><h1><span className="name-mask"><span className="name-line cursor-target">ANIKET</span></span><span className="name-mask"><span className="name-line name-outline cursor-target">SHARMA<span className="name-star" aria-hidden="true">✳</span></span></span></h1></div>
      <div className="opening-bottom"><p>I make thoughtful things.<br/><span>On the surface. And under the hood.</span></p><span className="mono-label opening-caption">01 / AN INDEPENDENT PERSPECTIVE<br/>28.61° N · 77.20° E</span><Button variant="ghost" className="opening-follow cursor-target" onClick={onFollow}><span>FOLLOW THE THREAD</span><ArrowDown/></Button></div>
    </div>
    <span className="opening-credit mono-label">DELHI / AN IMAGINED ARCHITECTURAL STUDY <ArrowUpRight size={10}/></span>
  </section>;
}