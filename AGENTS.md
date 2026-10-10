<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep the photographic, framed identity opening in its own presentational component; the portfolio owns navigation and GSAP so the name stays visible through storytelling.
- Keep the portfolio as one explicitly scroll-driven narrative at `/`; section anchors belong to the continuous GSAP storytelling experience.
- Vendor attributed React Bits components in `src/components/react-bits` and customize semantic styling while preserving their interaction logic.
- Adapt Motion-dependent React Bits micro interactions through the GSAP motion-value bridge and TextCursor through GSAP; keep the original geometry, pointer rules, and accessible actions without expanding Motion beyond Timeline.
- Compose the experiment collection with the vendored MagicBento content slots, keeping each experiment independently interactive and reduced-motion safe.
- Use GSAP ScrollTrigger and Lenis for storytelling; Motion is limited to the original Aceternity Timeline implementation.
- Centralize reference-led pointer and section motion in a cleanup-safe portfolio motion hook; exclude physics-based controls from delegated transforms to preserve their original interactions.
- Keep illustrative project content labeled as concept work and contact as a local message composer until the owner supplies verified projects and a destination.
