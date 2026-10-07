import { useEffect, useRef, useState, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowDown, ArrowUpRight, ArrowRight, X, Compass, Coffee, Code2, Layers, Database, Cloud, Braces, Circle, Play, RotateCcw, Check, Download, Sparkles, Server, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OptionWheel from '@/components/react-bits/OptionWheel';
import TargetCursor from '@/components/react-bits/TargetCursor';
import Magnet from '@/components/react-bits/Magnet';
import SpecularButton from '@/components/react-bits/SpecularButton';
import BorderGlow from '@/components/react-bits/BorderGlow';
import SlingButton from '@/components/react-bits/SlingButton';
import FlowingMenu from '@/components/react-bits/FlowingMenu';
import { PortfolioExperiments } from '@/components/portfolio-experiments';
import { Timeline } from '@/components/ui/timeline';
import chalkSystems from '@/assets/chalk-systems.jpg';

gsap.registerPlugin(ScrollTrigger);
const sections = ['HOME', 'STORY', 'CRAFT', 'WORK', 'SYSTEMS', 'EXPERIMENTS', 'CONTACT'];
const ids = ['home', 'story', 'craft', 'work', 'systems', 'experiments', 'contact'];
const stations = ['IDEA', 'DESIGN', 'FRONTEND', 'BACKEND', 'API', 'DATABASE', 'DEPLOY'];
const projectSteps = ['Problem', 'Design', 'Frontend', 'Backend', 'Integrations', 'Result'];
const projects = [
  { name: 'Orbit', type: 'PRODUCTIVITY / FULL-STACK', className: 'orbit', tagline: 'Less busywork.\nMore headspace.', intro: 'An operating system for the beautifully messy way creative teams work. From a scattered idea to the next thing shipped.', icon: Layers, brand: 'orbit', screenTitle: 'A little more clarity.', screenSubtitle: 'Your ideas, projects, and people. In one orbit.', metrics: ['12', '08', '94%'], metricLabels: ['IN MOTION', 'SHIPPED', 'ON TRACK'], steps: [
    'Creative work is scattered across notes, task lists, and conversations. Orbit is a concept exploring how a team can keep context without creating another administrative chore.',
    'A quiet visual language, progressive disclosure, and a single daily overview bring clarity. The interface is designed around decisions, not dashboards.',
    'The concept interface uses React, reusable primitives, keyboard-friendly controls, and optimistic interaction patterns. The live preview here illustrates the product direction.',
    'Proposed architecture: authenticated workspaces, role-scoped project access, transactional updates, and background job queues. This is an architecture concept, not a connected service.',
    'Planned integrations: calendar sync, Slack notifications, and webhook-driven updates. Idempotency, retries, and explicit failure states are part of the design.',
    'A concept for a calmer team workflow. No production metrics are claimed; the screen data is illustrative. The next validation step would be testing with real creative teams.'
  ]},
  { name: 'Local Table', type: 'COMMERCE / PRODUCT DESIGN', className: 'local', tagline: 'Good food.\nCloser to home.', intro: 'A neighborhood-first food discovery concept. Because the best recommendations still come from someone who knows the gali.', icon: Circle, brand: 'local table', screenTitle: 'What’s cooking nearby?', screenSubtitle: 'Small kitchens. Big personality. Made in Delhi.', metrics: ['24', '06', '18'], metricLabels: ['KITCHENS', 'NEIGHBORHOODS', 'DAILY SPECIALS'], steps: [
    'Small neighborhood kitchens are hard to discover beyond word of mouth. Local Table is a concept for making discovery feel personal, not like an endless delivery catalogue.',
    'Warm editorial menus, locality-first browsing, and clear dietary information give every kitchen its own personality. The design starts with food and the people behind it.',
    'A React storefront concept with accessible filtering, cart state, responsive menu layouts, and clear empty states. The presentation is illustrative, not an ordering service.',
    'Proposed system: kitchen inventory, order lifecycle state machines, server-validated pricing, and transaction-safe checkout. Orders would never rely on client-side totals.',
    'Planned connections include payments, delivery status callbacks, and kitchen notifications. Signed callbacks and event deduplication would protect the order lifecycle.',
    'A neighborhood commerce concept, ready for a real discovery and validation phase. Kitchen counts and screen statistics are demo data rather than production results.'
  ]}
];

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

function Kicker({number, children}: {number: string; children: string}) {
  return <div className="section-kicker"><span className="text-primary">{number}</span><span>{children}</span></div>;
}

export function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  const [wheelOpen, setWheelOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [project, setProject] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [requestState, setRequestState] = useState<'idle' | 'running' | 'done'>('idle');
  const [requestStation, setRequestStation] = useState(-1);
  const [messageReady, setMessageReady] = useState(false);
  const requestTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const modalContent = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const navigate = (index: number) => {
    const id = ids[index];
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    setSelected(index); setWheelOpen(false);
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: 0, duration: 1.3 });
    else target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      ids.forEach((id, i) => {
        ScrollTrigger.create({ trigger: `#${id}`, start: 'top 45%', end: 'bottom 45%', onEnter: () => setActiveSection(i), onEnterBack: () => setActiveSection(i) });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: false });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.from('.hero-top, .hero-location', { opacity: 0, y: 8, duration: .7, stagger: .15, clearProps: 'all' });
      gsap.from('.hero-line', { y: 40, opacity: 0, duration: 1, stagger: .12, ease: 'power3.out', clearProps: 'all' });
      gsap.from('.hero-visual', { opacity: 0, duration: 1.8, delay: .5, clearProps: 'all' });
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 25%', scrub: .7 } });
        tl.to('.hero-line', { y: -60, opacity: 0, stagger: .09, duration: 1 }, .1)
          .to('.hero-visual', { x: 70, y: -25, opacity: .3, duration: 1 }, .1)
          .set('.hero-final', { visibility: 'visible' }, .8)
          .fromTo('.hero-final', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, .8)
          .to('.hero-note', { x: -40, y: 20, duration: 1 }, .5);
        gsap.to('.craft-notebook', { scrollTrigger: { trigger: '.craft-notebook', start: 'top 30%', endTrigger: '.craft', end: 'bottom 65%', pin: true, pinSpacing: false } });
      });
      mm.add('(max-width: 767px)', () => {
        gsap.to('.hero-visual', { y: -25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>('.section-heading, .craft-notebook, .stage-story, .system-console').forEach(el => {
        gsap.from(el, { y: 28, opacity: 0, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, clearProps: 'all' });
      });
      gsap.utils.toArray<HTMLElement>('.product-window').forEach(el => gsap.fromTo(el, {y: 25}, {y: -15, ease: 'none', scrollTrigger: {trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1}}));
      gsap.to('.metro', { '--metro-progress': '100%', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: .4 } });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => { ctx.revert(); mm.revert(); gsap.ticker.remove(tick); lenis.destroy(); lenisRef.current = null; window.removeEventListener('load', refresh); };
  }, [reduced]);

  useEffect(() => {
    if (wheelOpen || project !== null) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [wheelOpen, project]);
  useEffect(() => () => requestTimers.current.forEach(clearTimeout), []);
  useEffect(() => {
    if (reduced || !modalContent.current) return;
    const ctx = gsap.context(() => { gsap.fromTo(modalContent.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .35 }); });
    return () => ctx.revert();
  }, [step, project, reduced]);

  const runRequest = () => {
    requestTimers.current.forEach(clearTimeout);
    setRequestState('running'); setRequestStation(0);
    for (let i = 1; i < 6; i++) requestTimers.current.push(setTimeout(() => setRequestStation(i), i * 380));
    requestTimers.current.push(setTimeout(() => setRequestState('done'), 2400));
  };
  const composeMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `LET'S MAKE IDEAS REAL\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}\n`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = 'lets-build.txt'; a.click(); URL.revokeObjectURL(url); setMessageReady(true);
  };
  const openProject = (i: number) => { setStep(0); setProject(i); };
  const currentProject = project === null ? undefined : projects[project];
  const timelineData = [
    { title: 'The first “what if?”', content: <><h3>Curiosity came before the code.</h3><p>I started by taking things apart. A website, an interaction, a tiny detail that felt different. I wanted to understand why it worked — then see if I could build my own.</p><div className="timeline-tags mono-label"><span>LEARNING</span><span>BREAKING THINGS</span><span>TRYING AGAIN</span></div></> },
    { title: 'From pixels to logic', content: <><h3>The screen was only the beginning.</h3><p>Design led me to frontend. Frontend led me to the systems behind it. APIs, databases, authentication — suddenly I wasn’t just making things look right. I was making them work.</p><div className="timeline-tags mono-label"><span>DESIGN → FRONTEND → BACKEND</span></div></> },
    { title: 'The whole picture', content: <><h3>Not just a feature. A product.</h3><p>The interesting part lives between disciplines. How a decision in the interface changes the data model. How a small interaction changes a big experience. That’s where I like to build.</p><div className="timeline-tags mono-label"><span>PRODUCT THINKING</span><span>CONNECTING THE DOTS</span></div></> },
    { title: 'Now, and next', content: <><h3>Still asking “what if?”</h3><p>Exploring thoughtful products, creative interfaces, and useful systems. Building things that make someone’s day a little easier — and occasionally building something just to see if I can.</p><div className="hand-note text-signal mt-5">Same curiosity. A bigger toolbox. ↗</div></> }
  ];

  return <div ref={root} className="portfolio">
    <div className="grain" aria-hidden="true" />
    {!reduced && <TargetCursor targetSelector=".cursor-target" hideDefaultCursor={false} spinDuration={5} parallaxOn={false} cursorColor="var(--foreground)" cursorColorOnTarget="var(--primary)" />}
    <main>
      <section id="home" className="hero page-margin">
        <div className="hero-top">
          <div className="personal-mark"><span className="mark-symbol">[·]</span><span className="mono-label">CREATIVE ENGINEER<br/><span className="text-muted-foreground">AN INDEPENDENT MIND.</span></span></div>
          <div className="availability mono-label"><i className="status-dot"/>OPEN TO GOOD CONVERSATIONS</div>
        </div>
        <div className="hero-main">
          <div className="hero-location"><span className="mono-label">NEW DELHI / INDIA ↗</span><span className="mono-label">DESIGN × CODE × SYSTEMS</span></div>
          <h1 className="hero-headline"><span className="hero-line cursor-target">I DESIGN THINGS<span className="period">.</span></span><span className="hero-line cursor-target outline-word">I BUILD THINGS.</span><span className="hero-line cursor-target">I CONNECT THINGS<span className="period">.</span></span><span className="hero-line cursor-target last-line">I SHIP THINGS.</span></h1>
          <div className="hero-final" aria-hidden="true">I MAKE<br/>IDEAS <em>REAL.</em></div>
          <div className="hero-visual" aria-hidden="true"><div className="hand-note sketch-note">a little design.<br/>a lot of possibility.</div><img src={chalkSystems} width={1024} height={1024} alt=""/><div className="hero-code">const idea = imagine();<br/>const product = <span>build(idea);</span><br/>ship(product); // repeat.</div></div>
          <div className="hero-note hand-note">↳ from the first scribble to the final deploy.</div>
        </div>
        <div className="hero-bottom"><div><p className="hero-description">A creative full-stack product engineer.<br/>Turning messy ideas into thoughtful, working things.</p><Magnet disabled={reduced} padding={25} magnetStrength={5}><Button variant="ghost" className="hero-scroll cursor-target p-0 h-auto" onClick={() => navigate(1)}><span className="scroll-ring"><ArrowDown size={15}/></span><span className="mono-label">SCROLL TO FOLLOW THE THREAD</span></Button></Magnet></div><div className="hero-edition mono-label">NOT A RESUME.<br/>A WORKING MIND.<br/><span className="text-primary">EST. IN CURIOSITY — ALWAYS IN PROGRESS</span></div></div>
        <div className="metro" aria-label="From idea to deployment">{stations.map((s,i) => <span key={s} className={`metro-station ${i <= activeSection ? 'is-passed' : ''}`}>{s}</span>)}</div>
      </section>

      <section id="story" className="section story page-margin">
        <Kicker number="01">THE STORY</Kicker>
        <div className="section-heading"><h2 className="display-title">A CURIOUS MIND.<br/><span className="text-muted-foreground">A FEW HAPPY DETOURS.</span></h2><p className="section-intro">Not a straight line. More like the Delhi Metro — a few interchanges, a lot of connections, and always moving forward.</p></div>
        <Timeline data={timelineData} reduced={reduced}/>
      </section>

      <section id="craft" className="section craft page-margin">
        <Kicker number="02">THE CRAFT</Kicker>
        <div className="section-heading"><h2 className="display-title">GOOD DESIGN.<br/>REAL ENGINEERING.</h2><p className="section-intro">I don’t see two different disciplines.<br/>I see two halves of the same idea.</p></div>
        <div className="craft-layout"><div className="craft-notebook"><div className="craft-side"><h3>FEEL.</h3><p>HIERARCHY<br/>INTERACTION<br/>THE HUMAN BIT</p></div><span className="craft-intersection">×</span><div className="craft-side"><h3>FUNCTION.</h3><p>LOGIC<br/>ARCHITECTURE<br/>THE WORKING BIT</p></div><div className="craft-sketch hand-note">the sweet spot ↗</div></div><div className="craft-flow"><FlowingMenu items={[{link:'#work',text:'Interfaces with intention',image:chalkSystems},{link:'#experiments',text:'Interactions with personality',image:chalkSystems},{link:'#systems',text:'Systems with a backbone',image:chalkSystems},{link:'#contact',text:'Ideas into real things',image:chalkSystems}]} onSelect={index => navigate([3,5,4,6][index] ?? 2)} textColor="var(--ink)" bgColor="transparent" marqueeBgColor="var(--ink)" marqueeTextColor="var(--chalk)" borderColor="var(--border)" reduced={reduced}/></div></div>
      </section>

      <section id="work" className="section work page-margin">
        <Kicker number="03">THE WORK</Kicker><div className="section-heading work-heading"><h2 className="display-title">IDEAS, WITH<br/><span className="text-primary">THEIR SLEEVES UP.</span></h2><p className="section-intro">A look at the entire picture.<br/>The problem. The decisions. The thing it becomes.<br/><span className="mono-label">SELECTED CONCEPT STUDIES / 01—02</span></p></div>
        {projects.map((p,i) => <article className="project" key={p.name}><div className="project-top"><div><span className="mono-label text-muted-foreground">0{i+1} / CONCEPT STUDY</span><h3 className="project-title">{p.name}<span className="text-primary"> ↗</span></h3></div><div className="project-meta mono-label"><span>{p.type}</span><span>DESIGN + ENGINEERING</span></div></div><div className={`project-stage ${p.className}`}><BorderGlow className="product-window" backgroundColor="var(--ink)" glowColor="var(--sage)" colors={["var(--sage)","var(--signal)","var(--chalk)"]} borderRadius={4} glowRadius={18} glowIntensity={.5} fillOpacity={.05}><div className="window-bar"><i/><i/><i/><span>{p.brand.replace(' ','')}.concept / overview</span></div><div className="product-body"><div className="product-brand"><p.icon/>{p.brand}</div><div className="product-greeting">{p.screenTitle}</div><div className="product-subline">{p.screenSubtitle}</div><div className="product-stats">{p.metrics.map((m,j) => <div key={m} className="product-stat"><strong>{m}</strong><span>{p.metricLabels[j]}</span></div>)}</div><div className="product-chart" aria-hidden="true">{Array.from({length:16},(_,j) => <i key={j}/>)}</div></div></BorderGlow><div className="stage-story"><div className="mono-label">FROM A WHAT-IF TO A WORKING IDEA</div><h3>{p.tagline.split('\n').map((line,j) => <span className="block" key={j}>{line}</span>)}</h3><p>{p.intro}</p><Magnet disabled={reduced} padding={20} magnetStrength={5}><SpecularButton size="sm" radius={2} className="cursor-target mono-label" textColor="var(--chalk)" lineColor="var(--chalk)" baseColor="var(--border)" tint="var(--chalk)" tintOpacity={.02} followMouse={!reduced} onClick={() => openProject(i)}>EXPLORE THE CONCEPT <ArrowUpRight/></SpecularButton></Magnet></div></div><div className="project-steps">{projectSteps.map((s,j) => <span className="inline-flex gap-3 items-center" key={s}>{s.toUpperCase()}{j < 5 && <ArrowRight/>}</span>)}</div></article>)}
      </section>

      <section id="systems" className="section systems page-margin"><Kicker number="04">UNDER THE HOOD</Kicker><div className="section-heading"><h2 className="display-title">THE BEAUTY IN<br/><span className="text-muted-foreground">WHAT YOU DON’T SEE.</span></h2><p className="section-intro">A lovely interface means nothing if the system behind it falls apart. I like to know where every request goes.</p></div><div className="system-diagram">{[{icon:Code2,label:'INTERFACE',sub:'React / UI'},{icon:Braces,label:'API LAYER',sub:'Validate / route'},{icon:Server,label:'SERVER',sub:'Logic / auth'},{icon:Database,label:'DATABASE',sub:'Persist / query'},{icon:Cloud,label:'INTEGRATIONS',sub:'Connect / sync'},{icon:Check,label:'RESPONSE',sub:'Return / render'}].map((n,i) => <div className="contents" key={n.label}><div className={`system-node ${requestStation === i ? 'text-primary' : ''}`}><n.icon/><span>{n.label}</span><span className="text-muted-foreground text-[9px]">{n.sub}</span></div>{i < 5 && <div className="system-connector" aria-hidden="true"/>}</div>)}</div><div className="system-console"><div><div className="console-message" aria-live="polite">{requestState === 'idle' ? '> ready when you are_' : requestState === 'running' ? `> ${['validating input…','routing request…','checking permissions…','reading data…','syncing services…','returning response…'][requestStation] ?? 'processing…'}` : '> 200 OK · full journey complete ✓'}</div><Button variant="ghost" size="sm" className="mt-3 px-0 cursor-target mono-label" onClick={runRequest} disabled={requestState === 'running'}>{requestState === 'done' ? <RotateCcw/> : <Play/>}{requestState === 'running' ? 'REQUEST IN FLIGHT' : requestState === 'done' ? 'RUN IT AGAIN' : 'FOLLOW A REQUEST'}</Button></div><p className="console-desc">Validate the input. Respect the permissions. Keep the data safe. Handle the failures.<br/><span className="mono-label">INTERACTIVE ARCHITECTURE SIMULATION</span></p></div></section>

      <section id="experiments" className="section experiments page-margin"><Kicker number="05">EXPERIMENTS</Kicker><div className="section-heading"><h2 className="display-title">NO BRIEF.<br/>JUST <span className="text-signal">“WHAT IF?”</span></h2><p className="section-intro">Small explorations. Happy accidents.<br/>Things I make just to see if I can.</p></div><PortfolioExperiments reduced={reduced}/><div className="hand-note text-signal mt-9 text-right">best served with momos & a questionable sleep schedule.</div></section>

      <section id="contact" className="section contact page-margin"><Kicker number="06">THE NEXT CHAPTER</Kicker><div className="contact-header"><h2 className="contact-title">WHAT ARE<br/>WE <span>BUILDING?</span></h2><span className="contact-note hand-note">A good idea usually<br/>starts with a conversation. ↙</span></div><form className="contact-form" ref={formRef} onSubmit={composeMessage} onChange={() => setMessageReady(false)}><div className="form-field"><label htmlFor="name">01 / YOUR NAME</label><input id="name" name="name" placeholder="Who’s on the other side?" autoComplete="name" required maxLength={100}/></div><div className="form-field"><label htmlFor="email">02 / YOUR EMAIL</label><input id="email" name="email" type="email" placeholder="Somewhere I can say hello." autoComplete="email" required maxLength={254}/></div><div className="form-field full"><label htmlFor="message">03 / THE IDEA</label><textarea id="message" name="message" placeholder="The messy version is welcome." rows={2} required maxLength={5000}/></div><div className="form-actions"><div className="sling-composer"><SlingButton ariaLabel="Save your hello" onSend={() => formRef.current?.requestSubmit()} size={54} armAt={35} maxPull={85} flight={70} particles={8} className="cursor-target" padColor="var(--primary)" iconColor="var(--ink)" accentColor="var(--signal)" wellColor="var(--secondary)" bandColor="var(--border)">{messageReady ? <Check/> : <Download/>}</SlingButton><span className="mono-label">{messageReady ? 'MESSAGE SAVED' : 'SAVE YOUR HELLO'}</span></div><span className="form-notice" role="status">{messageReady ? 'Your message draft has downloaded. Nothing has been sent.' : 'Saves a message draft. Direct delivery is not connected yet.'}</span></div></form></section>
    </main>
    <footer className="footer page-margin"><div className="mono-label">MADE WITH INTENTION.<br/>BUILT IN NEW DELHI, INDIA.</div><div className="footer-fuel mono-label"><Coffee/><span>FUEL: CHAI + CODE</span></div><span className="mono-label">ALWAYS A WORK IN PROGRESS. ↗</span></footer>
    <span className="wheel-caption mono-label">{String(activeSection+1).padStart(2,'0')} / EXPLORE</span>
    <Dialog.Root open={wheelOpen} onOpenChange={setWheelOpen}><Dialog.Trigger asChild><Button variant="chalk" className="wheel-trigger cursor-target" aria-label="Open navigation wheel" title="Explore the notebook"><Compass/></Button></Dialog.Trigger><Dialog.Portal><Dialog.Content className="wheel-panel" data-lenis-prevent><Dialog.Title className="mono-label text-muted-foreground">EVERYTHING IS CONNECTED.</Dialog.Title><Dialog.Description className="sr-only">Select a chapter with the wheel, then choose Go to chapter.</Dialog.Description><div className="wheel-object"><OptionWheel items={sections} defaultSelected={selected} fontSize={2.3} spacing={1.4} inset={40} tilt={13} curve={1.5} blur={0} fade={.21} minOpacity={.12} onChange={i => setSelected(i)} textColor="var(--muted-foreground)" activeColor="var(--foreground)"/></div><div className="wheel-panel-foot"><Button variant="ghost" size="sm" onClick={() => setWheelOpen(false)} aria-label="Close navigation"><X/></Button><Button variant="ghost" size="sm" className="mono-label cursor-target" onClick={() => navigate(selected)}>GO TO {sections[selected]} <ArrowRight/></Button></div></Dialog.Content></Dialog.Portal></Dialog.Root>
    <Dialog.Root open={project !== null} onOpenChange={open => { if (!open) setProject(null); }}><Dialog.Portal><Dialog.Overlay className="case-overlay"/><Dialog.Content className="case-modal fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[111] max-w-[calc(100vw-24px)]" data-lenis-prevent>{currentProject && <><div className="case-header"><div><span className="mono-label text-primary">CONCEPT STUDY / THE WHOLE PICTURE</span><Dialog.Title>{currentProject.name}</Dialog.Title><Dialog.Description className="mono-label text-muted-foreground">{currentProject.type} · ILLUSTRATIVE CONCEPT</Dialog.Description></div><Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close concept study"><X/></Button></Dialog.Close></div><div className="case-tabs" role="tablist" aria-label="Concept study stages">{projectSteps.map((s,i) => <Button key={s} variant={step === i ? 'signal' : 'ghost'} size="sm" className="mono-label" role="tab" aria-selected={step === i} aria-controls="case-panel" id={`case-tab-${i}`} onClick={() => setStep(i)}>{s}</Button>)}</div><div className="case-content" ref={modalContent} id="case-panel" role="tabpanel" aria-labelledby={`case-tab-${step}`}><h3>{projectSteps[step]}<span className="text-primary">.</span></h3><p>{currentProject.steps[step]}</p></div><div className="case-footer"><span className="mono-label text-muted-foreground">0{step+1} / 06</span><Button variant="chalk" size="sm" onClick={() => setStep((step+1)%6)}>{step === 5 ? 'BACK TO THE BEGINNING' : 'NEXT CHAPTER'}<ArrowRight/></Button></div></>}</Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>;
}
