import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Delegated motion covers dynamic dialogs without interfering with physics-based controls.
export function usePortfolioMotion(root: RefObject<HTMLDivElement | null>, reduced: boolean) {
  useEffect(() => {
    if (reduced) return;
    const cleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      gsap.fromTo('.paper-chapter', { '--paper-progress': '0%' }, { '--paper-progress': '100%', ease: 'none', scrollTrigger: { trigger: '.paper-chapter', start: 'top 95%', end: 'top 30%', scrub: .6 } });
      gsap.from('.momo-plate img', { rotate: -9, scale: .86, y: 45, ease: 'none', scrollTrigger: { trigger: '.kitchen-opening', start: 'top 85%', end: 'center 50%', scrub: .7 } });
      gsap.from('.kitchen-recipe, .chutney-note', { y: 24, opacity: 0, stagger: .15, duration: .8, scrollTrigger: { trigger: '.kitchen-recipe', start: 'top 92%', once: true } });
      gsap.from('.name-line', { yPercent: 110, rotate: 4, stagger: .13, duration: 1.35, ease: 'expo.out', clearProps: 'all' });
      gsap.from('.opening-top, .opening-eyebrow, .opening-bottom', { opacity: 0, y: 12, stagger: .12, delay: .4, duration: .9, clearProps: 'all' });
      gsap.to('.opening-image', { yPercent: 12, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.editorial-opening', start: 'top top', end: 'bottom top', scrub: .7 } });
      gsap.to('.name-star', { rotate: 140, ease: 'none', scrollTrigger: { trigger: '.editorial-opening', start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.utils.toArray<HTMLElement>('.cap-tile, .detail, .delhi-sign, .form-field, .experiment-foot').forEach((el, i) => {
        gsap.from(el, { y: 32, opacity: 0, rotate: i % 2 ? 1.5 : -1.5, duration: .85, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('.inline-preview').forEach(el => {
        const panel = el.querySelector('.inline-preview-panel');
        if (!panel) return;
        const enter = () => gsap.fromTo(panel, { y: 14, rotate: -5, scale: .88, opacity: 0 }, { y: 0, rotate: 0, scale: 1, opacity: 1, duration: .45, ease: 'back.out(1.5)', overwrite: true });
        const leave = () => gsap.to(panel, { opacity: 0, y: 10, scale: .95, duration: .2, overwrite: true });
        el.addEventListener('mouseenter', enter); el.addEventListener('focusin', enter); el.addEventListener('mouseleave', leave); el.addEventListener('focusout', leave);
        cleanups.push(() => { el.removeEventListener('mouseenter', enter); el.removeEventListener('focusin', enter); el.removeEventListener('mouseleave', leave); el.removeEventListener('focusout', leave); });
      });
    }, root);
    const selector = '.opening-follow, .detail-chip, .kind, .case-stop, .case-footer button, .wheel-panel-foot button, .plate-btn';
    const control = (event: Event) => event.target instanceof Element ? event.target.closest<HTMLElement>(selector) : null;
    const enter = (event: PointerEvent) => { const el = control(event); if (!el || (event.relatedTarget instanceof Node && el.contains(event.relatedTarget))) return; gsap.to(el, { y: -3, duration: .35, ease: 'back.out(2)', overwrite: true }); const icon = el.querySelector('svg'); if (icon) gsap.to(icon, { rotate: -12, x: 3, duration: .35 }); };
    const leave = (event: PointerEvent) => { const el = control(event); if (!el || (event.relatedTarget instanceof Node && el.contains(event.relatedTarget))) return; gsap.to(el, { y: 0, scale: 1, duration: .55, ease: 'elastic.out(1,.4)', overwrite: true }); const icon = el.querySelector('svg'); if (icon) gsap.to(icon, { rotate: 0, x: 0, duration: .35 }); };
    const press = (event: PointerEvent) => { const el = control(event); if (el) gsap.to(el, { scale: .94, duration: .12, overwrite: true }); };
    const release = (event: PointerEvent) => { const el = control(event); if (el) gsap.to(el, { scale: 1, duration: .5, ease: 'elastic.out(1,.35)', overwrite: true }); };
    document.addEventListener('pointerover', enter); document.addEventListener('pointerout', leave); document.addEventListener('pointerdown', press); document.addEventListener('pointerup', release);
    return () => { ctx.revert(); cleanups.forEach(fn => fn()); document.removeEventListener('pointerover', enter); document.removeEventListener('pointerout', leave); document.removeEventListener('pointerdown', press); document.removeEventListener('pointerup', release); document.querySelectorAll(selector).forEach(el => { gsap.killTweensOf(el); gsap.killTweensOf(el.querySelectorAll('svg')); }); };
  }, [root, reduced]);
}