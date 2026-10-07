// Adapted from DavidHDev/react-bits (MIT): https://github.com/DavidHDev/react-bits
'use client';

import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import './TextCursor.css';

interface TextCursorProps {
  text: string;
  children?: ReactNode;
  spacing?: number;
  followMouseDirection?: boolean;
  randomFloat?: boolean;
  exitDuration?: number;
  removalInterval?: number;
  maxPoints?: number;
}

interface TrailItem {
  id: number;
  x: number;
  y: number;
  angle: number;
  randomX?: number;
  randomY?: number;
  randomRotate?: number;
}

const TextCursor: React.FC<TextCursorProps> = ({
  children,
  text = '⚛️',
  spacing = 100,
  followMouseDirection = true,
  randomFloat = true,
  exitDuration = 0.5,
  removalInterval = 30,
  maxPoints = 5
}) => {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveTimeRef = useRef<number>(Date.now());
  const idCounter = useRef<number>(0);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setTrail(prev => {
      const newTrail = [...prev];

      const createRandomData = () =>
        randomFloat
          ? {
              randomX: Math.random() * 10 - 5,
              randomY: Math.random() * 10 - 5,
              randomRotate: Math.random() * 10 - 5
            }
          : {};

      if (newTrail.length === 0) {
        newTrail.push({
          id: idCounter.current++,
          x: mouseX,
          y: mouseY,
          angle: 0,
          ...createRandomData()
        });
      } else {
        const last = newTrail[newTrail.length - 1];
        if (!last) return newTrail;
        const dx = mouseX - last.x;
        const dy = mouseY - last.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance >= spacing) {
          let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

          const computedAngle = followMouseDirection ? rawAngle : 0;
          const steps = Math.floor(distance / spacing);

          for (let i = 1; i <= steps; i++) {
            const t = (spacing * i) / distance;
            const newX = last.x + dx * t;
            const newY = last.y + dy * t;

            newTrail.push({
              id: idCounter.current++,
              x: newX,
              y: newY,
              angle: computedAngle,
              ...createRandomData()
            });
          }
        }
      }

      if (newTrail.length > maxPoints) {
        return newTrail.slice(newTrail.length - maxPoints);
      }
      return newTrail;
    });

    lastMoveTimeRef.current = Date.now();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [spacing, followMouseDirection, randomFloat, maxPoints]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 100) {
        setTrail(prev => (prev.length > 0 ? prev.slice(1) : prev));
      }
    }, removalInterval);
    return () => clearInterval(interval);
  }, [removalInterval]);

  return (
    <div ref={containerRef} className="text-cursor-container">
      {children}
      <div className="text-cursor-inner" aria-hidden="true">
        {trail.map(item => <TrailGlyph key={item.id} item={item} text={text} exitDuration={exitDuration} randomFloat={randomFloat} />)}
      </div>
    </div>
  );
};

function TrailGlyph({ item, text, exitDuration, randomFloat }: { item: TrailItem; text: string; exitDuration: number; randomFloat: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(el, { rotation: item.angle });
      gsap.fromTo(el, { opacity: 1, scale: 1 }, { opacity: 0, scale: .5, duration: exitDuration + .2, delay: .1 });
      if (randomFloat) gsap.to(el, { x: item.randomX ?? 0, y: item.randomY ?? 0, rotation: item.angle + (item.randomRotate ?? 0), duration: .6, ease: 'sine.inOut' });
    });
    return () => ctx.revert();
  }, [item, randomFloat, exitDuration]);
  return <div ref={ref} className="text-cursor-item" style={{ left: item.x, top: item.y }}>{text}</div>;
}
export default TextCursor;

