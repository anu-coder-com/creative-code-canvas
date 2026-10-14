import { useEffect, useRef, useState, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, X, Compass, Check, Download, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import OptionWheel from '@/components/react-bits/OptionWheel';
import TargetCursor from '@/components/react-bits/TargetCursor';
import { PortfolioIdentity } from './portfolio-identity';
import { usePortfolioMotion } from './portfolio-motion';
import Magnet from '@/components/react-bits/Magnet';
import SpecularButton from '@/components/react-bits/SpecularButton';
import BorderGlow from '@/components/react-bits/BorderGlow';
import SlingButton from '@/components/react-bits/SlingButton';
import FlowingMenu from '@/components/react-bits/FlowingMenu';
import MagicBento from '@/components/react-bits/MagicBento';
import Cubes from '@/components/react-bits/Cubes';
import FolderFloat from '@/components/react-bits/FolderFloat';
import { PortfolioExperiments } from '@/components/portfolio-experiments';
import { Timeline } from '@/components/ui/timeline';
import chalkSystems from '@/assets/chalk-systems.jpg';
import { navItems, navIds, heroWords, metroStations, capabilities, caseStages, projects, hoodNodes, projectTypes } from '@/components/portfolio-content';

gsap.registerPlugin(ScrollTrigger);

function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

const Flow = ({ steps, live = false }: { steps: string[]; live?: boolean }) => <div className={`flow ${live ? 'is-live' : ''}`}>{steps.map((s, i) => <span className="contents" key={s}><span className="flow-node">{s}</span>{i < steps.length - 1 && <span className="flow-wire" style={{ animationDelay: `${i * .35}s` }} aria-hidden="true"/>}</span>)}</div>;

export function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  usePortfolioMotion(root, reduced);
  const [wheelOpen, setWheelOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(0);
  const [project, setProject] = useState<number | null>(null);
  const [stage, setStage] = useState(0);
  const [hood, setHood] = useState(-1);
  const [chai, setChai] = useState(true);
  const [loading, setLoading] = useState(false);
  const [kind, setKind] = useState('PRODUCT');
  const [ready, setReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const navigate = (i: number) => {
    const el = document.getElementById(navIds[i] ?? '');
    if (!el) return;
    setSelected(i); setWheelOpen(false);
    if (lenisRef.current) lenisRef.current.scrollTo(el, { duration: 1.4 }); else el.scrollIntoView();
  };

  useEffect(() => {
    const ctx = gsap.context(() => navIds.forEach((id, i) => ScrollTrigger.create({ trigger: `#${id}`, start: 'top 50%', end: 'bottom 50%', onToggle: s => s.isActive && setActive(i) })), root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.practice-word').forEach((el, i) => {
        gsap.from(el, { y: i % 2 ? 12 : -12, opacity: .15, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 45%', scrub: .6 } });
      });
      // Metro map draws itself.
      gsap.utils.toArray<SVGPathElement>('.metro-map .line').forEach(p => {
        const len = p.getTotalLength(); gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.metro-map', start: 'top 75%', end: 'bottom 40%', scrub: .6 } });
      });
      gsap.from('.metro-map .stop', { scale: 0, transformOrigin: 'center', stagger: .1, scrollTrigger: { trigger: '.metro-map', start: 'top 70%', end: 'bottom 45%', scrub: .6 } });
      // Split headings.
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => gsap.from(el.querySelectorAll('.char-line'), { yPercent: 110, stagger: .08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }));
      gsap.utils.toArray<HTMLElement>('.momo-line').forEach((el, i) => gsap.from(el, { x: i % 2 ? 60 : -60, opacity: 0, scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 60%', scrub: .5 } }));
      mm.add('(min-width: 900px)', () => {
        gsap.to('.hood-title-a', { xPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hood', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        gsap.to('.hood-title-b', { xPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hood', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        gsap.to('.delhi-strip', { x: () => { const strip = root.current?.querySelector<HTMLElement>('.delhi-strip'); return strip ? -Math.max(0, strip.scrollWidth - window.innerWidth) : 0; }, ease: 'none', scrollTrigger: { trigger: '.delhi', start: 'top top', end: '+=1800', scrub: .6, pin: true, invalidateOnRefresh: true } });
      });
      gsap.from('.hood', { clipPath: 'inset(8% 6% 8% 6%)', scrollTrigger: { trigger: '.hood', start: 'top bottom', end: 'top 30%', scrub: .6 } });
      gsap.from('.finale-line', { yPercent: 100, opacity: 0, stagger: .15, scrollTrigger: { trigger: '.finale', start: 'top 75%', end: 'center 60%', scrub: .6 } });
      gsap.to('.rail-fill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: .3 } });
    }, root);
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => { ctx.revert(); mm.revert(); gsap.ticker.remove(tick); lenis.destroy(); lenisRef.current = null; };
  }, [reduced]);

  useEffect(() => { if (wheelOpen || project !== null) lenisRef.current?.stop(); else lenisRef.current?.start(); }, [wheelOpen, project]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const traceRequest = () => {
    timers.current.forEach(clearTimeout); timers.current = [];
    hoodNodes.forEach((_, i) => timers.current.push(setTimeout(() => setHood(i), i * 330)));
    timers.current.push(setTimeout(() => setHood(99), hoodNodes.length * 330));
  };
  const fakeLoad = () => { setLoading(true); timers.current.push(setTimeout(() => setLoading(false), 1600)); };
  const compose = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const blob = new Blob([`SO... WHAT ARE WE BUILDING?\n\nType: ${kind}\nFrom: ${d.get('name')}\nEmail: ${d.get('email')}\n\n${d.get('message')}\n`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'lets-build-it.txt'; a.click(); URL.revokeObjectURL(url); setReady(true);
  };
  const p = project === null ? undefined : projects[project];

  const timelineData = [
    { title: 'Curiosity', content: <><span className="station-tag">LINE 1 · BOARDING</span><h3>It started with “how does this work?”</h3><p>Taking websites apart. Viewing source. Breaking things on purpose.</p></> },
    { title: 'Code → Design', content: <><span className="station-tag interchange">INTERCHANGE</span><h3>Wrong station. Better route.</h3><p>Code alone felt incomplete, so I switched lines and learned why things feel good.</p></> },
    { title: 'Frontend → Backend', content: <><span className="station-tag">LINE 2 · UNDERGROUND</span><h3>Then I went underground.</h3><p>APIs, databases, auth, webhooks. The part nobody sees but everybody feels.</p></> },
    { title: 'Products', content: <><span className="station-tag interchange">INTERCHANGE</span><h3>Features became products.</h3><p>Design, frontend, backend and integrations — one journey, end to end.</p></> },
    { title: 'Next stop', content: <><span className="station-tag">PLATFORM CHANGE</span><h3>Whatever comes next.</h3><p className="hand-note text-signal">mind the gap ↘</p></> },
  ];

  const bentoCards = capabilities.map((c, i) => ({ content: <div className="cap-tile cursor-target"><span className="cap-num">{String(i + 1).padStart(2, '0')}</span><h3>{c.label}</h3><div className="cap-demo"><Flow steps={c.flow} live/></div><span className="cap-note hand-note">{c.note}</span></div> }));

  return <TooltipProvider delayDuration={120}><div ref={root} className="portfolio">
    <div className="grain" aria-hidden="true"/>
    {!reduced && <TargetCursor targetSelector=".cursor-target" hideDefaultCursor={false} spinDuration={5} parallaxOn={false} cursorColor="var(--foreground)" cursorColorOnTarget="var(--signal)"/>}
    <nav className="rail" aria-label="Story progress"><span className="rail-fill" aria-hidden="true"/>{navItems.map((n, i) => <Button variant="ghost" key={n} className={`rail-stop cursor-target ${i <= active ? 'is-passed' : ''} ${i === active ? 'is-here' : ''}`} onClick={() => navigate(i)} aria-label={`Go to ${n}`}><span>{n}</span></Button>)}</nav>

    <main>
      <PortfolioIdentity onFollow={() => navigate(1)}/>
      <div className="practice-strip page-margin" aria-label="My practice">{heroWords.map((word, i) => <span className="practice-word" key={word}><span className="mono-label">0{i + 1}</span>{word}</span>)}</div>

      {/* 02 — STORY */}
      <section id="story" className="section page-margin">
        <span className="mono-label kicker">02 / THE ROUTE</span>
        <h2 className="display reveal"><span className="mask"><span className="char-line">MY BRAIN IS NOT</span></span><span className="mask"><span className="char-line">A STRAIGHT LINE.</span></span></h2>
        <p className="hand-note text-signal sub">Neither was the journey.</p>
        <p className="lede personal-intro">A creative full-stack engineer, connecting <span className="inline-preview"><Button variant="link" className="inline-word cursor-target" onClick={() => navigate(3)}>design</Button><span className="inline-preview-panel"><span className="preview-art preview-design" aria-hidden="true">Aa<span>↗</span></span><strong>Design with a point of view.</strong><small>Shape, hierarchy, and the little details.</small></span></span>, <span className="inline-preview"><Button variant="link" className="inline-word cursor-target" onClick={() => navigate(3)}>code</Button><span className="inline-preview-panel"><span className="preview-art preview-code" aria-hidden="true">{'{ idea: true }'}</span><strong>From thought to interaction.</strong><small>Frontend, backend, everything between.</small></span></span>, and <span className="inline-preview"><Button variant="link" className="inline-word cursor-target" onClick={() => document.getElementById('systems')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })}>systems</Button><span className="inline-preview-panel"><span className="preview-art preview-systems" aria-hidden="true">○ — □ — ○</span><strong>The invisible connections.</strong><small>APIs, data, and reliable workflows.</small></span></span>. A curious mind, with a Delhi address.</p>
        <svg className="metro-map" viewBox="0 0 1000 260" role="img" aria-label="A metro map of my journey from curiosity to whatever comes next">
          <path className="line main" d="M20 180 H260 L320 120 H600 L660 180 H980"/>
          <path className="line branch" d="M320 120 L380 50 H520"/>
          <path className="line branch b2" d="M600 120 L640 230 H760"/>
          {metroStations.map((s, i) => { const x = 20 + i * 137; const y = i < 2 ? 180 : i < 5 ? 120 : 180; const fx = Math.min(x, 980); return <g key={s} className="stop"><circle cx={fx} cy={y} r={i === 2 || i === 4 ? 9 : 6}/><text x={fx} y={y + (i % 2 ? -22 : 32)} textAnchor="middle">{s}</text></g>; })}
          <text x="450" y="38" className="branch-note">wrong station (useful)</text><text x="700" y="250" className="branch-note">got lost, found a shortcut</text>
        </svg>
        <Timeline data={timelineData} reduced={reduced}/>
      </section>

      {/* 03 — CRAFT / THINGS I BUILD */}
      <section id="craft" className="section page-margin">
        <span className="mono-label kicker">03 / THINGS I BUILD</span>
        <h2 className="display reveal"><span className="mask"><span className="char-line">SOME THINGS I BUILD</span></span><span className="mask"><span className="char-line">ARE SERIOUS.</span></span></h2>
        <h2 className="display reveal ghost"><span className="mask"><span className="char-line">SOME ARE NOT.</span></span></h2>
        <p className="lede">From a first sketch to the last webhook. Different disciplines, one connected practice.</p>
        <div className="cap-bento"><MagicBento cards={bentoCards} textAutoHide={false} disableAnimations={reduced} enableSpotlight={!reduced} enableStars={false} enableTilt={false} enableMagnetism={!reduced} clickEffect={!reduced} glowColor="var(--signal)" spotlightRadius={260}/></div>
      </section>

      {/* 04 — WORK / MOMOS */}
      <section id="work" className="section momos">
        <div className="page-margin">
          <span className="mono-label kicker">04 / THE KITCHEN</span>
          <h2 className="display reveal"><span className="mask"><span className="char-line">PROJECTS ARE</span></span><span className="mask"><span className="char-line">LIKE MOMOS.</span></span></h2>
          <div className="momo-lines">{['Sometimes they’re hot.', 'Sometimes they’re a little messy.', 'Sometimes you burn your tongue.', 'Sometimes you wonder why you ordered 30.', 'But when they’re good, you immediately want another plate.'].map(l => <p className="momo-line" key={l}>{l}</p>)}</div>
        </div>
        <div className="project-menu"><FlowingMenu items={projects.map((x, i) => ({ link: `#${x.id}`, text: `0${i + 1} — ${x.name} · ${x.kind}`, image: chalkSystems }))} onSelect={i => { setStage(0); setProject(i); }} textColor="var(--chalk)" bgColor="transparent" marqueeBgColor="var(--signal)" marqueeTextColor="var(--ink)" borderColor="var(--border)" reduced={reduced}/></div>
        <div className="page-margin plate-row">
          {projects.map((x, i) => <BorderGlow key={x.id} className="plate" backgroundColor="var(--background)" glowColor="var(--signal)" colors={['var(--foreground)', 'var(--muted)', 'var(--chalk)']} borderRadius={6} glowRadius={20} glowIntensity={.6} fillOpacity={.04}><Button variant="ghost" className="plate-btn cursor-target" onClick={() => { setStage(0); setProject(i); }}><span className="mono-label">0{i + 1} / {x.kind}</span><strong>{x.name}</strong><span className="hand-note text-signal">{x.status}</span></Button></BorderGlow>)}
        </div>
        <div className="page-margin leftovers"><FolderFloat trigger="hover" label="Leftovers" sublabel="small artifacts" items={['Chai timer', 'Metro rhythm', 'Cursor toys']} width={170} height={112} radius={6} spread={110} lift={44} physics={!reduced} folderColor="var(--surface)" frontColor="var(--signal)" paperColor="var(--chalk)" itemColor="var(--chalk)" itemTextColor="var(--ink)" labelColor="var(--ink)"/><span className="hand-note">needs more chutney →</span></div>
      </section>

      {/* 05 — UNDER THE HOOD */}
      <section id="systems" className="hood">
        <div className="page-margin">
          <p className="hood-title-a display">THE PRETTY PART IS</p><p className="hood-title-b display ghost">ONLY HALF THE STORY.</p>
          <h2 className="display hood-h">UNDER THE HOOD.</h2>
          <div className="hood-grid">
            <div className={`hood-cubes ${reduced ? 'is-static' : ''}`}><Cubes gridSize={7} maxAngle={40} radius={3} autoAnimate={!reduced} rippleOnClick={!reduced} borderStyle="1px solid var(--muted-foreground)" faceColor="var(--background)" rippleColor="var(--signal)" cellGap={5}/></div>
            <div className="hood-system">
              <div className="hood-nodes">{hoodNodes.map((n, i) => <span key={n} className={`hood-node ${hood >= i ? 'is-hit' : ''}`}>{n}</span>)}</div>
              <div className="hood-console mono-label" aria-live="polite">{hood < 0 ? '> request simulation · ready_' : hood === 99 ? '> 200 OK · deployed · nobody noticed (good)' : `> ${hoodNodes[hood]?.toLowerCase()} … ok`}</div>
              <Magnet disabled={reduced} padding={30} magnetStrength={5}><Button variant="chalk" className="cursor-target mono-label" onClick={traceRequest}>{hood === 99 ? <RotateCcw/> : <Play/>}{hood === 99 ? 'SEND ANOTHER' : 'TRACE A REQUEST'}</Button></Magnet>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — EXPERIMENTS */}
      <section id="experiments" className="section page-margin">
        <span className="mono-label kicker">06 / THE PLAYGROUND</span>
        <h2 className="display reveal"><span className="mask"><span className="char-line">I SOMETIMES BUILD THINGS</span></span><span className="mask"><span className="char-line">JUST TO SEE IF THEY BREAK.</span></span></h2>
        <PortfolioExperiments reduced={reduced}/>
      </section>

      {/* 07 — DELHI */}
      <section className="delhi">
        <div className="delhi-strip">
          <div className="delhi-intro"><span className="mono-label kicker">07 / ORIGIN</span><h2 className="display">MADE IN<br/>DELHI.</h2><p className="lede">A city where everyone has a shortcut, every road has three alternate routes, and somehow there’s always traffic.</p></div>
          {[['CURRENT LOCATION', 'NEW DELHI'], ['CURRENT FUEL', chai ? 'CHAI' : 'COLD COFFEE (RARE)'], ['CURRENT PROBLEM', 'WHY IS THIS API DOING THAT?'], ['LUNCH', 'CHOLE BHATURE'], ['WEATHER', 'DELHI WINTER · FOG MODE'], ['COMMUTE', 'METRO > AUTO > WALK']].map(([k, v]) => <div className="delhi-sign cursor-target" key={k}><span className="mono-label">{k}</span><strong>{v}</strong></div>)}
          <div className="cp-ring" aria-hidden="true"><span>CONNAUGHT PLACE · INNER CIRCLE · OUTER CIRCLE ·</span></div>
        </div>
      </section>

      {/* 08 — DETAILS */}
      <section className="section page-margin details">
        <span className="mono-label kicker">08 / THE SMALL STUFF</span>
        <h2 className="display reveal"><span className="mask"><span className="char-line">THE LITTLE THINGS</span></span><span className="mask"><span className="char-line">MATTER.</span></span></h2>
        <div className="detail-grid">
          <div className="detail"><span className="mono-label">TOGGLE</span><label className="detail-row"><Switch checked={chai} onCheckedChange={setChai} aria-label="Chai mode"/>{chai ? 'chai mode: on' : 'chai mode: off (why?)'}</label></div>
          <div className="detail"><span className="mono-label">TOOLTIP</span><Tooltip><TooltipTrigger asChild><Button variant="ghost" className="detail-chip cursor-target">a small surprise</Button></TooltipTrigger><TooltipContent>told you it was small.</TooltipContent></Tooltip></div>
          <div className="detail"><span className="mono-label">LOADING</span><Button variant="ghost" className="detail-chip cursor-target" onClick={fakeLoad} aria-busy={loading}>{loading ? <span className="dots" aria-label="Loading"><i/><i/><i/></span> : 'a moment, please'}</Button></div>
          <div className="detail"><span className="mono-label">MAGNET</span><Magnet disabled={reduced} padding={50} magnetStrength={3}><span className="detail-chip">come closer</span></Magnet></div>
          <div className="detail"><span className="mono-label">SPECULAR</span><SpecularButton size="sm" radius={4} className="cursor-target mono-label" textColor="var(--chalk)" lineColor="var(--chalk)" baseColor="var(--border)" tint="var(--signal)" tintOpacity={.06} followMouse={!reduced}>catch the light</SpecularButton></div>
          <div className="detail"><span className="mono-label">HOVER</span><span className="detail-underline cursor-target">a line that knows you’re here</span></div>
        </div>
      </section>

      {/* 09 — CONTACT */}
      <section id="contact" className="section page-margin contact">
        <h2 className="display reveal"><span className="mask"><span className="char-line ghost">SO...</span></span><span className="mask"><span className="char-line">WHAT ARE WE BUILDING?</span></span></h2>
        <div className="kind-row" role="radiogroup" aria-label="What kind of thing">{projectTypes.map(t => <Button variant="ghost" key={t} role="radio" aria-checked={kind === t} className={`kind cursor-target ${kind === t ? 'is-on' : ''}`} onClick={() => { setKind(t); setReady(false); }}>{t}</Button>)}</div>
        <form ref={formRef} className="contact-form" onSubmit={compose} onChange={() => setReady(false)}>
          <div className="form-field"><label htmlFor="name">YOUR NAME</label><input id="name" name="name" required maxLength={100} placeholder="who’s ordering?" autoComplete="name"/></div>
          <div className="form-field"><label htmlFor="email">YOUR EMAIL</label><input id="email" name="email" type="email" required maxLength={254} placeholder="where do I send the momos?" autoComplete="email"/></div>
          <div className="form-field full"><label htmlFor="message">THE {kind}</label><textarea id="message" name="message" rows={2} required maxLength={5000} placeholder="the messy version is welcome."/></div>
          <div className="form-actions">
            <div className="sling-composer"><SlingButton ariaLabel="Fling your idea" onSend={() => formRef.current?.requestSubmit()} size={54} armAt={35} maxPull={85} flight={70} particles={8} className="cursor-target" padColor="var(--signal)" iconColor="var(--ink)" accentColor="var(--signal)" wellColor="var(--secondary)" bandColor="var(--border)">{ready ? <Check/> : <Download/>}</SlingButton><span className="mono-label">PULL & FLING</span></div>
            <SpecularButton size="md" radius={4} className="cursor-target" textColor="var(--ink)" lineColor="var(--ink)" baseColor="var(--signal)" tint="var(--chalk)" tintOpacity={.2} followMouse={!reduced} type="submit">LET’S BUILD IT <ArrowRight/></SpecularButton>
          </div>
          <span className="form-notice" role="status">{ready ? 'Your draft downloaded. Nothing was sent yet.' : 'Saves a message draft — direct delivery isn’t connected yet.'}</span>
        </form>
      </section>

      {/* FINALE */}
      <section className="finale page-margin" aria-label="Closing">
        <p className="finale-line">DESIGN IT.</p><p className="finale-line">BUILD IT.</p><p className="finale-line text-signal">SHIP IT.</p>
        <span className="mono-label finale-route">NEW DELHI → EVERYWHERE</span>
      </section>
    </main>
    <footer className="footer page-margin"><span className="mono-label">ANIKET SHARMA · © 2026</span><span className="mono-label">FUEL: CHAI + CODE</span><span className="mono-label">MIND THE GAP ↗</span></footer>

    <Dialog.Root open={wheelOpen} onOpenChange={setWheelOpen}><Dialog.Trigger asChild><Button variant="chalk" className="wheel-trigger cursor-target" aria-label="Open navigation wheel"><Compass/></Button></Dialog.Trigger><Dialog.Portal><Dialog.Content className="wheel-panel" data-lenis-prevent><Dialog.Title className="mono-label text-muted-foreground">CHOOSE A STATION</Dialog.Title><Dialog.Description className="sr-only">Spin the wheel then go.</Dialog.Description><div className="wheel-object"><OptionWheel items={navItems} defaultSelected={selected} fontSize={2.3} spacing={1.4} inset={40} tilt={13} curve={1.5} blur={0} fade={.21} minOpacity={.12} onChange={i => setSelected(i)}/></div><div className="wheel-panel-foot"><Button variant="ghost" size="sm" onClick={() => setWheelOpen(false)} aria-label="Close"><X/></Button><Button variant="ghost" size="sm" className="mono-label cursor-target" onClick={() => navigate(selected)}>GO TO {navItems[selected]} <ArrowRight/></Button></div></Dialog.Content></Dialog.Portal></Dialog.Root>

    <Dialog.Root open={project !== null} onOpenChange={o => { if (!o) setProject(null); }}><Dialog.Portal><Dialog.Overlay className="case-overlay"/><Dialog.Content className="case-modal fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[111] max-w-[calc(100vw-24px)]" data-lenis-prevent>{p && <>
      <div className="case-header"><div><span className="mono-label text-signal">{p.status}</span><Dialog.Title>{p.name}</Dialog.Title><Dialog.Description className="mono-label text-muted-foreground">{p.kind}</Dialog.Description></div><Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close case study"><X/></Button></Dialog.Close></div>
      <Flow steps={p.flow} live={!reduced}/>
      <div className="case-tabs" role="tablist">{caseStages.map((s, i) => <Button variant="ghost" key={s} role="tab" aria-selected={stage === i} className={`case-stop ${stage >= i ? 'is-passed' : ''}`} onClick={() => setStage(i)}><i/><span>{s}</span></Button>)}</div>
      <div className={`case-content ${reduced ? 'is-static' : ''}`} key={stage}><h3>{caseStages[stage]}</h3><p>{p.stages[stage]}</p></div>
      <div className="case-footer"><span className="mono-label text-muted-foreground">STATION {stage + 1} / 7</span><Button variant="chalk" size="sm" onClick={() => setStage((stage + 1) % 7)}>{stage === 6 ? 'BACK TO START' : 'NEXT STATION'}<ArrowRight/></Button></div>
    </>}</Dialog.Content></Dialog.Portal></Dialog.Root>
  </div></TooltipProvider>;
}
