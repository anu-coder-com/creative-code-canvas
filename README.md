# Creative Code Canvas

Create a premium, highly interactive personal portfolio for a creative full-stack product engineer.

This should NOT look like a normal developer portfolio. The website itself should demonstrate my ability to design, build, animate, connect APIs, handle backend systems, and ship complete products.

The feeling should be:

Designer + Engineer + Builder + Problem Solver

The visitor should feel like they are exploring my story rather than reading my resume.

Visual Direction

Use a dark charcoal / chalk / editorial visual style.

Do NOT use pure black everywhere. Use warm charcoal, graphite, off-white/chalk tones, subtle grain/noise and restrained accent colors.

Think:

chalkboard + designer sketchbook + modern digital interface + Delhi personality

Avoid generic neon cyberpunk, excessive gradients, excessive glassmorphism, and generic SaaS cards.

Use large typography, asymmetric layouts, whitespace, subtle textures and lots of small visual details.

Animation & Interaction — VERY IMPORTANT

Animation is one of the main purposes of this portfolio.

Use:

GSAP

GSAP ScrollTrigger

Lenis

Do NOT use Motion/Framer Motion as the primary animation library.

Use GSAP for scroll storytelling, text reveals, parallax, pinned sections, horizontal scrolling, page transitions and visual transformations.

Micro-interactions are especially important.

Explore the React Bits micro-interaction collection:

https://reactbits.dev/c/micro

Also explore the complete React Bits library:

https://reactbits.dev/

Use suitable React Bits components for:

buttons

hover effects

cursor interactions

toggles

tooltips

loading states

cards

small UI interactions

text effects

background effects

playful details

Do not recreate these components from scratch if a suitable React Bits component already exists.

Use the actual libraries/components and customize them to match the site's visual system.

Do not use every component. Select the best ones and integrate them naturally.

The site should have many small delightful interactions, not just a few large animations.

Navigation

Do NOT create a traditional navbar/header.

Use the React Bits Option Wheel as the main navigation:

https://reactbits.dev/components/option-wheel

Navigation could contain:

HOME / STORY / WORK / CRAFT / SYSTEMS / EXPERIMENTS / CONTACT

Make it feel like an interactive object rather than a normal menu.

Hero — Make It A Story

The hero should be highly visual and feel like the beginning of a story.

Use the React Bits Target Cursor:

https://reactbits.dev/animations/target-cursor

Use it around important interactive hero text.

Start with small details appearing:

NEW DELHI / INDIA

DESIGN × CODE × SYSTEMS

Then progressively reveal large statements such as:

I DESIGN THINGS.

I BUILD THINGS.

I CONNECT THINGS.

I SHIP THINGS.

Eventually:

I MAKE IDEAS REAL.

Use GSAP to make the hero evolve as the user scrolls.

Add subtle visual elements such as sketches, UI fragments, technical annotations, grids, code snippets and hand-drawn/chalk-like marks.

Delhi Personality

I am from Delhi, so incorporate subtle Delhi references throughout the experience.

Do this tastefully — not like a tourism website.

Delhi Metro

Create a scroll-driven Metro-map-inspired visual system connecting sections:

IDEA → DESIGN → FRONTEND → BACKEND → API → DATABASE → DEPLOY

As the user scrolls, the line progresses through the stations.

Use GSAP.

Do not copy official Delhi Metro branding; make it an original interpretation.

Connaught Place

Use subtle circular geometry inspired by CP, especially around the Option Wheel/navigation.

Delhi Food

Add small personality moments around:

Chai, Momos, Chole Bhature, Chaat, Butter Chicken, Rajma Chawal

For example:

Fuel: Chai + Code

Keep these references subtle and fun.

Story / Timeline

After the hero, create a personal journey section using the Aceternity Timeline:

https://ui.aceternity.com/components/timeline

Use the actual component and customize it to fit the chalk/editorial design.

Show my journey through:

learning → experimentation → projects → frontend → backend → product building → what I'm building now

Make it feel like a story, not a CV.

Main Sections

Create a strong narrative:

01 — THE STORY

Who I am and how I got here.

02 — THE CRAFT

Show how design and engineering connect.

03 — THE WORK

Interactive project/case-study showcase.

04 — UNDER THE HOOD

Show backend, APIs, databases, architecture and integrations through animated diagrams.

05 — EXPERIMENTS

Creative coding, UI experiments, animations and things I build just to see if I can.

06 — CONTACT

End with:

WHAT ARE WE BUILDING?

Make the contact form itself interactive.

Projects

Do NOT use a boring 3-column project grid.

Use large cinematic project presentations.

For each project show:

Problem → Design → Frontend → Backend → Integrations → Result

The project presentation should demonstrate both my UI/UX skills and engineering ability.

Use GSAP transitions and React Bits micro-interactions.

Technical Stack

Use:

React / Next.js
GSAP + ScrollTrigger
Lenis
React Bits
Aceternity UI
Tailwind CSS

Keep the implementation clean and component-based.

Use responsive animation with GSAP and provide sensible mobile alternatives.

Support prefers-reduced-motion.

Optimize performance because this will be animation-heavy.

Important

The website should feel like:

a visual representation of how my brain works.

Not a resume.

Not a SaaS landing page.

Not a template.

The final impression should be:

“He can design it, build it, understand what's happening behind it, and ship it.”

Use existing React Bits and Aceternity components wherever possible instead of rebuilding everything manually.

Most importantly, focus heavily on micro-interactions and interaction quality. The small details should make the portfolio feel alive.

References:

React Bits: https://reactbits.dev/

React Bits Micro: https://reactbits.dev/c/micro

React Bits Option Wheel: https://reactbits.dev/components/option-wheel

React Bits Target Cursor: https://reactbits.dev/animations/target-cursor

Aceternity Timeline: https://ui.aceternity.com/components/timeline

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dd2729eb-7bdf-5e98-bd6c-3d83c0496b0c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
