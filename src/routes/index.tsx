import { createFileRoute } from '@tanstack/react-router';
import { Portfolio } from '@/components/portfolio';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Ideas Made Real — Creative Product Engineer / New Delhi' },
    { name: 'description', content: 'A working mind, not a resume. Explore design, full-stack engineering, creative experiments, and the systems that turn ideas into real products.' },
    { property: 'og:title', content: 'Ideas Made Real — Design × Code × Systems' },
    { property: 'og:description', content: 'The interactive notebook of a creative full-stack product engineer from New Delhi. From first scribble to final deploy.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});
