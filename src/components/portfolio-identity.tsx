import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PortfolioIdentity({ onFollow }: { onFollow: () => void }) {
  return <section id="home" className="identity-shell">
    <div className="identity-frame">
      <div className="identity-grid" aria-hidden="true" />
      <div className="identity-inset" aria-hidden="true" />
      <div className="identity-top">
        <div className="personal-mark"><span className="mark-symbol">[•]</span><div className="mono-label">CREATIVE ENGINEER<br/><span className="text-muted-foreground">AN INDEPENDENT MIND</span></div></div>
        <div className="availability mono-label"><i className="status-dot"/>DESIGN × CODE × SYSTEMS</div>
      </div>
      <div className="identity-main">
        <div className="identity-aside mono-label" aria-hidden="true"><span>IDEA — STRATEGY</span><span>DESIGN — BUILD</span><span>DEPLOY — SCALE</span></div>
        <h1 className="identity-name"><span className="identity-name-line cursor-target">ANIKET</span><span className="identity-name-line cursor-target">SHARMA</span></h1>
        <div className="identity-intro"><div className="identity-rule"/><p>Turning messy ideas into thoughtful, working things.<br className="identity-break"/> A creative full-stack engineer, connecting design, code, and systems.</p></div>
      </div>
      <div className="identity-footer">
        <div className="identity-spec"><span>EST. IN</span><strong>CURIOSITY</strong></div>
        <div className="identity-spec"><span>LOCATED AT</span><strong>NEW DELHI, IN</strong></div>
        <div className="identity-spec identity-statement"><span>THE PRACTICE</span><div className="identity-verbs"><strong>I DESIGN THINGS.</strong><strong>I BUILD THINGS.</strong><strong>I CONNECT THINGS.</strong><strong>I SHIP THINGS.</strong><strong>I MAKE IDEAS REAL.</strong></div></div>
        <Button variant="signal" className="identity-follow cursor-target" onClick={onFollow}><span>FOLLOW THE THREAD</span><ArrowDown size={16}/></Button>
      </div>
      <span className="identity-corner corner-top" aria-hidden="true"/><span className="identity-corner corner-bottom" aria-hidden="true"/>
    </div>
  </section>;
}