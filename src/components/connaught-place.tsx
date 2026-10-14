import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ConnaughtPlace() {
  const [outer, setOuter] = useState(false);
  return <figure className={`cp-study ${outer ? 'is-outer' : 'is-inner'}`}>
    <figcaption className="cp-study-top"><span className="mono-label">DELHI FIELD NOTES / 01</span><ArrowUpRight aria-hidden="true"/></figcaption>
    <div className="cp-drawing">
      <svg viewBox="0 0 440 340" role="img" aria-label="An abstract architectural study of Connaught Place, with radial streets and two rings of colonnaded blocks">
        <g className="cp-streets">{Array.from({ length: 8 }, (_, i) => <path key={i} d="M220 170 L220 12" transform={`rotate(${i * 45} 220 170)`}/>)}</g>
        <g className="cp-blocks cp-outer-blocks">{Array.from({ length: 12 }, (_, i) => <path key={i} d="M207 33 A138 138 0 0 1 263 39 L255 65 A111 111 0 0 0 209 60 Z" transform={`rotate(${i * 30} 220 170)`}/>)}</g>
        <g className="cp-blocks cp-inner-blocks">{Array.from({ length: 8 }, (_, i) => <path key={i} d="M210 79 A92 92 0 0 1 265 90 L254 109 A70 70 0 0 0 212 101 Z" transform={`rotate(${i * 45} 220 170)`}/>)}</g>
        <g className="cp-colonnades">{Array.from({ length: 48 }, (_, i) => <path key={i} d="M220 44 V53" transform={`rotate(${i * 7.5} 220 170)`}/>)}</g>
        <path className="cp-route" d={outer ? 'M220 32 A138 138 0 1 1 82 170' : 'M220 78 A92 92 0 1 1 128 170'}/>
        <circle className="cp-destination" cx={outer ? 82 : 128} cy="170" r="5"/>
        <text x="220" y="164" textAnchor="middle" className="cp-map-title">CP</text>
        <text x="220" y="188" textAnchor="middle" className="cp-map-small">28.6315° N</text>
        <path className="cp-leader" d="M315 104 H398 M138 242 H42"/>
        <text x="398" y="95" textAnchor="end" className="cp-map-small">RADIAL ROADS ↗</text>
        <text x="42" y="259" className="cp-map-small">ALWAYS A DETOUR</text>
      </svg>
    </div>
    <h3>CONNAUGHT<br/>PLACE.</h3>
    <div className="cp-study-bottom"><div className="cp-layer-controls" role="group" aria-label="Connaught Place circles"><Button variant="ghost" aria-pressed={!outer} onClick={() => setOuter(false)}>INNER CIRCLE</Button><Button variant="ghost" aria-pressed={outer} onClick={() => setOuter(true)}>OUTER CIRCLE</Button></div><span className="hand-note">Different routes. Same centre.</span></div>
  </figure>;
}