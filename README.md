# Babar Tech Solutions — website

Marketing site for [babartechsolutions.com](https://babartechsolutions.com). Next.js 16 (App Router) exported as a fully static site and hosted on Netlify.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/site/content.ts` | **All copy**: services, team, reviews, FAQ, links. Edit text here. |
| `src/app/*` | Routes: `/`, `/services`, `/team`, `/contact`, `/privacy`, `/cookies`, 404 |
| `src/site/TodoList.tsx` | Hero to-do list the team ticks off, with local/team clocks |
| `src/site/Viz.tsx` | Animated service scenes (pure CSS) |
| `src/site/home/*` | Home scroll scenes: `Dive` (fly through the logo), `HServices` (pinned sideways services), `Process` (stacking cards), hours tool, reviews |
| `src/site/services/*` | Services page: pinned `Chapter`s with scroll-driven `Demos`, and the `Builder` ("build your team" → prefilled contact brief) |
| `src/site/Curtain.tsx` | Orange logo curtain between pages + first-visit intro (CSS-only, `html.intro`) |
| `src/site/gsap.ts` | Lazy GSAP/ScrollTrigger loader, `useGsap` and `useScrollProgress` hooks |
| `src/site/CookieConsent.tsx`, `consent.ts`, `Analytics.tsx` | Consent banner/settings and consent-gated analytics |
| `src/site/WelcomeNote.tsx` | One-time note for first-time visitors |
| `src/app/globals.css` | Design tokens, components and all keyframe animations |
| `public/img` | Optimised WebP images actually used by the site |

## Motion

Reveals and loops are CSS + one `IntersectionObserver` (`src/site/Motion.tsx`); pinned/scrubbed scenes use GSAP
ScrollTrigger, loaded lazily after first paint (`src/site/gsap.ts`), with Lenis smooth scrolling on desktop. Elements with `data-reveal` fade up on entry,
`<Words>` headlines reveal word by word, and anything marked `data-anim` is paused while offscreen. Everything respects
`prefers-reduced-motion`, and content is visible without JavaScript.

## Contact form

Submissions go to **Netlify Forms** (form name `brief`, registered via `public/__forms.html`). Make sure *Form detection*
is enabled in Netlify → Site configuration → Forms, and add an email notification there. If the form backend is
unavailable, the form falls back to opening the visitor's email app with the brief pre-filled.

## Analytics & cookies

No tracking runs by default. To enable Google Analytics 4, set `NEXT_PUBLIC_GA_ID=G-XXXXXXX` in Netlify's environment
variables. It loads only after a visitor opts in to analytics (Consent Mode v2). Visitors can change their choice via
"Cookie settings" in the footer. If you add any new tracking, list it on `/cookies` and gate it on consent the same way.
