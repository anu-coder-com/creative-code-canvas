// GSAP bridge for the original React Bits micro-component motion-value contract.
import React, { forwardRef, useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';

export type AnimationPlaybackControls = { stop: () => void };
type Value<T> = { get: () => T; set: (value: T) => void; jump: (value: T) => void; subscribe: (listener: () => void) => () => void };
function value<T>(initial: T): Value<T> {
  let current = initial;
  const listeners = new Set<() => void>();
  const set = (next: T) => { current = next; listeners.forEach(listener => listener()); };
  return { get: () => current, set, jump: set, subscribe: listener => { listeners.add(listener); return () => { listeners.delete(listener); }; } };
}
export function useMotionValue(initial: number) { const [current] = useState(() => value(initial)); return current; }
export function useMotionValueEvent(current: Value<number>, _event: string, listener: () => void) {
  const latest = useRef(listener); latest.current = listener;
  useEffect(() => current.subscribe(() => latest.current()), [current]);
}
export function useMotionTemplate(parts: TemplateStringsArray, ...values: Value<number>[]) {
  const [template] = useState(() => value(''));
  useEffect(() => {
    const update = () => template.set(parts.reduce((text, part, index) => text + part + (values[index]?.get() ?? ''), ''));
    update(); const unsubscribes = values.map(current => current.subscribe(update));
    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [template, ...values]);
  return template;
}
export function animate(current: Value<number>, target: number, options: { duration?: number; bounce?: number; velocity?: number; type?: string } = {}): AnimationPlaybackControls {
  const proxy = { current: current.get() };
  const tween = gsap.to(proxy, { current: target, duration: options.duration ?? .4, ease: options.bounce ? `elastic.out(1, ${Math.max(.35, 1 - options.bounce)})` : 'power3.out', onUpdate: () => current.set(proxy.current) });
  return { stop: () => tween.kill() };
}
export function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => { const query = matchMedia('(prefers-reduced-motion: reduce)'); const sync = () => setReduced(query.matches); sync(); query.addEventListener('change', sync); return () => query.removeEventListener('change', sync); }, []);
  return reduced;
}
type MotionProps = Omit<React.HTMLAttributes<HTMLElement>, 'style'> & { style?: Omit<CSSProperties, 'transform'> & { transform?: Value<string> | string } };
function makeMotion(tag: 'span' | 'div') {
  return forwardRef<HTMLElement, MotionProps>(({ style, ...props }, forwardedRef) => {
    const local = useRef<HTMLElement | null>(null);
    const transform = style?.transform;
    useEffect(() => {
      if (!transform || typeof transform === 'string') return;
      const paint = () => { if (local.current) local.current.style.transform = transform.get(); };
      paint(); return transform.subscribe(paint);
    }, [transform]);
    return React.createElement(tag, { ...props, style: { ...style, transform: typeof transform === 'string' ? transform : undefined }, ref: (node: HTMLElement | null) => { local.current = node; if (typeof forwardedRef === 'function') forwardedRef(node); else if (forwardedRef) forwardedRef.current = node; } });
  });
}
export const motion = { span: makeMotion('span'), div: makeMotion('div') };