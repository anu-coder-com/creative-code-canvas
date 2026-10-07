import { createFileRoute } from '@tanstack/react-router';
import { Portfolio } from '@/components/portfolio';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Aniket Sharma — Creative Full-stack Engineer / New Delhi' },
    { name: 'description', content: 'Explore Aniket Sharma’s personal portfolio: design, full-stack engineering, concept studies, and creative experiments from New Delhi.' },
    { property: 'og:title', content: 'Aniket Sharma — Design × Code × Systems' },
    { property: 'og:description', content: 'A curious mind from New Delhi. Aniket Sharma connects design, code, and systems to make ideas real.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});
