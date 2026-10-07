import { useState } from 'react';
import { Coffee, Sparkles, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagicBento from './react-bits/MagicBento';
import DodgeField from './react-bits/DodgeField';
import FolderFloat from './react-bits/FolderFloat';
import Cubes from './react-bits/Cubes';
import TextCursor from './react-bits/TextCursor';
import Magnet from './react-bits/Magnet';
import ScrambledText from './react-bits/ScrambledText';

export function PortfolioExperiments({ reduced }: { reduced: boolean }) {
  const [brewing, setBrewing] = useState(false);
  const [note, setNote] = useState('A pocket full of what-ifs.');
  const frame = (title: string, category: string, content: React.ReactNode) => <><div className="experiment-play">{content}</div><div className="experiment-foot"><h3>{title}</h3><span>{category}</span></div></>;
  const cards = [
    { content: frame('Chai & attraction', '01 / MICRO', <><Magnet disabled={reduced} padding={45} magnetStrength={4}><div className={`chai-object ${brewing ? 'is-brewing' : ''}`} aria-hidden="true"><span className="chai-steam">≈ ≈</span></div></Magnet><Button variant="ghost" size="sm" className="experiment-control mono-label cursor-target" onClick={() => setBrewing(!brewing)}><Coffee/>{brewing ? 'ONE MORE CHAI?' : 'BREW A LITTLE JOY'}</Button></>) },
    { content: frame('Controlled chaos', '02 / TYPE', <>{reduced ? <div className="scramble-word">WHAT IF?</div> : <ScrambledText className="scramble-word" radius={120} scrambleChars="<>/{}" duration={.8}>WHAT IF?</ScrambledText>}<span className="experiment-control mono-label text-muted-foreground">CURIOUS BY CHARACTER.</span></>) },
    { content: frame('The idea drawer', '03 / NOTEBOOK', <><FolderFloat trigger="click" label="Unfinished thoughts" sublabel="3 what-ifs" items={['Chai timer', 'Metro rhythms', 'Tiny useful tools']} width={175} height={115} radius={4} spread={115} lift={45} physics={!reduced} onSelect={value => setNote(value)} folderColor="var(--accent)" frontColor="var(--sage)" paperColor="var(--chalk)" itemColor="var(--chalk)" itemTextColor="var(--ink)" labelColor="var(--ink)"/><span className="experiment-control mono-label text-muted-foreground" role="status">{note}</span></>) },
    { content: frame('A moving target', '04 / PLAY', <DodgeField disabled={reduced} reach={65} radius={95} fieldHeight={240} patience={3} inkColor="var(--signal)" contrastColor="var(--ink)">{state => <Button variant={state.caught ? 'signal' : 'chalk'} className="dodge-field__pill cursor-target mono-label" aria-label="Catch the idea"><Sparkles/>{state.caught ? 'GOT THE IDEA!' : state.gave ? 'OKAY, LET’S BUILD.' : ['CATCH THE IDEA', 'NOT QUITE', 'ONE MORE TRY'][Math.min(state.dodges, 2)]}</Button>}</DodgeField>) },
    { content: frame('Order meets dimension', '05 / GEOMETRY', <div className={`cube-play ${reduced ? 'is-static' : ''}`}><Cubes gridSize={6} maxAngle={35} radius={2.5} autoAnimate={false} rippleOnClick={!reduced} borderStyle="1px solid var(--muted-foreground)" faceColor="var(--background)" rippleColor="var(--sage)" cellGap={4}/></div>) },
    { content: frame('Leave a little possibility', '06 / TRAIL', reduced ? <span className="trail-word">what if?</span> : <TextCursor text="what if?" spacing={65} maxPoints={6} exitDuration={.6} followMouseDirection={false}><div className="trail-stage"><span className="trail-word">possibility <ArrowUpRight/></span><span className="mono-label text-muted-foreground">A THOUGHT IN MOTION.</span></div></TextCursor>) },
  ];
  return <div className="portfolio-bento"><MagicBento cards={cards} textAutoHide={false} disableAnimations={reduced} enableSpotlight={false} enableStars={true} particleCount={5} enableTilt={false} enableMagnetism={false} clickEffect={true} glowColor="var(--sage)"/></div>;
}