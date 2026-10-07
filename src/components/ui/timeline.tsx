// Adapted from Aceternity UI's source-distributed Timeline.
// https://ui.aceternity.com/registry/timeline.json
// The original sticky layout and scroll beam are preserved with semantic chalk styling.
import { useScroll, useTransform, motion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface TimelineEntry { title: string; content: ReactNode }
export function Timeline({ data, reduced = false }: { data: TimelineEntry[]; reduced?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const update = () => setHeight(element.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 70%', 'end 50%'] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, .1], [0, 1]);
  return <div className="timeline" ref={containerRef}>
    <div className="timeline-content" ref={ref}>
      {data.map((item, index) => <div className="timeline-row" key={index}>
        <div className="timeline-label"><div className="timeline-dot"/>{item.title}</div>
        <div className="timeline-copy">{item.content}</div>
      </div>)}
      <div className="timeline-track" style={{height}}>
        <motion.div className="timeline-progress" style={{ height: reduced ? height : heightTransform, opacity: reduced ? 1 : opacityTransform }} />
      </div>
    </div>
  </div>;
}
