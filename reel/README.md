# Babar Tech — social reel

34-second 9:16 reel (1080×1920, 30 fps) for Instagram Reels and LinkedIn, built with [Remotion](https://remotion.dev)
from the website's own design system, fonts, logo and team photos.

```bash
cd reel
npm install
python3 scripts/music.py     # regenerate the original soundtrack -> public/music.wav (needs numpy + scipy)
npm run studio               # live preview / scrub the timeline
npm run render               # -> out/babar-tech-reel.mp4
```

In sandboxed environments without Remotion's own browser, point it at a Chrome headless shell:
`REMOTION_CHROME=/path/to/headless_shell npm run render`.

**Edit** — every scene cut sits on a bar line of the 120 BPM track (1 bar = 60 frames), defined in `src/Reel.tsx`:
hook → brand reveal (drop) → to-do list → services → time zones (breakdown) → proof (second drop) → CTA.
Copy, stats and review quotes match `src/site/content.ts` on the website.

**Music** — `scripts/music.py` synthesises an original instrumental from scratch (no samples), so it is free to use
anywhere. To use a licensed track instead, drop it in `public/` and change the `src` of `<Html5Audio>` in `src/Reel.tsx`.

**Licence note** — Remotion is free for individuals and companies of up to 3 people; larger companies need a
[Remotion company licence](https://www.remotion.pro/license) to render with it.
