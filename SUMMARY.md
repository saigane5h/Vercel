# Tata AIA Life Insurance Academy — Project Summary

A consumer-facing video-first learning hub for life insurance, built as a Next.js prototype. The site explains coverage, claims, planning, riders and regulatory updates through curated video content embedded from the kPoint GCC platform.

---

## 1. What it is

- **Domain:** Life insurance consumer education (BFSI)
- **Audience:** Indian retail customers — first-time buyers, families, existing policyholders, self-employed
- **Goal:** Close the *clarity gap* — most policyholders don't fully understand what they bought. The hub turns dense policy language into short, structured videos
- **Type:** Web prototype (production-ready stack, prototype-grade content)

---

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15.3.9 (App Router, React Server Components) |
| UI runtime | React 19 |
| Styling | Tailwind CSS 3.4 + custom design tokens (`navy`, `red`, `hero-bg`) |
| Icons | lucide-react |
| Video | kPoint GCC embed (`player-silk.js`) for 16:9 long-form, VXPlayer reels for 9:16 shorts |
| Fonts | Playfair Display (headings) + DM Sans (body) |
| Lint | ESLint 9 + `eslint-config-next` |
| Routing | File-system routes via `app/` directory |

---

## 3. Information architecture

```
/                       Home — 10 curated sections, see §4
/video/[id]             Video landing page — player + related shorts + related videos
/courses                Catalogue: video guides by topic + all videos
/courses/[seriesId]     Video guide — playlist of videos in one topic
/policies               Regulatory & policy updates — modal video popup
/promotions             Campaign landing
/admin · /dashboard
/login · /register · /profile · /settings
```

---

## 4. Homepage sections (top to bottom)

| # | Section | Purpose | Interaction |
|---|---|---|---|
| 01 | Hero | Tagline + CTA + featured hero video | Click hero thumbnail → in-place GCC player; CTA → `/courses` |
| 02 | Featured carousel + Short reels | Surface curated videos and bite-size shorts | Card → GCC modal; Reel → VXPlayer popup |
| 03 | Begin here — *The essentials, explained simply* | Curated 4-up grid filtered by tag | Card → `/video/[id]` landing page |
| 04 | Trending this week | Topic chips for high-search queries | Chip → `/courses` |
| 05 | For your situation | Life-stage personas | Card → `/courses` |
| 06 | Go deeper | Topic guides | Card → `/courses/[seriesId]` |
| 07 | Know your numbers | Calculator stubs (cover, premium, gap, term-vs-ULIP) | Static for now |
| 08 | Stay current | IRDAI / govt / budget updates | Card → in-page popup (kPoint embed) |
| 09 | Straight talk | Myths & FAQs | Card → `/video/[id]` landing page |
| 10 | For existing policyholders | Re-engagement | Card → `/courses` |
| 11 | Not sure where to start | Three persona paths + quick-question list | Card → `/courses` |

---

## 5. Key flows

**Watch a single video**
1. User clicks a thumbnail in *Begin here* or *Straight talk*
2. Routed to `/video/[id]`
3. Video plays in left column (kPoint GCC embed, re-mounts via `key` per video)
4. Right column shows a 9:16 reels carousel + a vertical list of more videos
5. Clicking any related item swaps the player with the new `gccId`

**Browse a topic guide**
1. User clicks a *Go deeper* tile
2. Routed to `/courses/[seriesId]`
3. Player plays first video in series; right rail shows the playlist
4. Click any playlist item → player re-mounts with that video

**Catch up on regulatory news**
1. User clicks a *Stay current* row
2. In-page modal opens with the kPoint embed for that update
3. Esc / click-outside / X closes the modal

---

## 6. Data layer (`lib/data.js`)

| Export | Shape | Used in |
|---|---|---|
| `featuredVideos` | `{ id, gccId, title, seriesId, duration, thumbnail, tag, tagColor }` | Begin here, Straight talk, /courses, /video/[id], /courses/[id] |
| `videoSeries` | `{ id, title, subtitle, thumbnail, videos, tag, tagColor }` | /courses, Go deeper |
| `policyVideos` | `{ id, gccId, title, date, duration, tag, tagColor, summary, thumbnail }` | Stay current, /policies |
| `shortReels` | `{ id, title, duration }` | Hero reels strip, /video/[id] related shorts |
| `categories` | `string[]` | /courses filter chips |

`gccId` is rotated across a small pool of kPoint identifiers — repetition is intentional for the prototype.

---

## 7. Reusable components

| Component | Where defined | Role |
|---|---|---|
| `GCCPlayer` / `GCCVideoPlayer` | `app/video/[id]/page.jsx`, `app/page.jsx`, `app/courses/[id]/page.jsx` | kPoint embed; `key={gccId}` forces remount per video |
| `GCCModal` | `app/page.jsx` | Multi-video modal with prev/next arrows + dot indicators |
| `PolicyVideoModal` | `app/page.jsx` | Single-video popup for *Stay current* |
| `GridCard` · `ReelCard` · `StripCard` · `GCCCard` | `app/page.jsx` | Thumbnail-style cards for different aspect ratios |
| `GuideTile` | `app/page.jsx` | Topic-guide tile; links to `/courses/[seriesId]` |
| `PolicyRow` | `app/page.jsx` | Stay-current row; triggers popup via `onOpen` callback |
| `HeroVideo` | `app/page.jsx` | Click-to-play thumbnail → in-place GCC embed |
| `ShortVideosSection` | `app/page.jsx` | VXPlayer reels popup wiring |
| `Navbar` · `Footer` | `components/` | App shell |

---

## 8. Conventions & patterns

- **Client components** marked `'use client'` because the kPoint embeds require `useEffect` to inject the player script
- **`data-init-dynamic` div + `player-silk.js`** is the official kPoint embed pattern — never replaced with raw iframes
- **`.video-wrapper`** in `globals.css` uses the padding-bottom 56.25% trick; do *not* nest inside Tailwind's `aspect-video` (the absolute iframe collapses to 0px)
- **Per-video remount** uses `key={gccId}` so React tears down and remounts the embed when the user clicks a new video
- **Image fallbacks** — thumbnails first try `gthumb(gccId)` from kPoint, then fall back to Unsplash via `onError`
- **No backend yet** — all data is static in `lib/data.js`

---

## 9. Build & run

```bash
npm install
npm run dev     # development server, hot reload
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

Node ≥ 20 is required (`package.json#engines`).

---

## 10. Known gaps / next steps

- All data is static — no CMS, no auth, no analytics
- Calculator tiles in *Know your numbers* are not yet functional
- `embedCode` fields in `lib/data.js` are stubs — the live wiring is via `gccId`
- Some routes (`/admin`, `/dashboard`, `/login`, etc.) are placeholders
- `playwright` is in devDependencies but no e2e tests are written yet
- `package-lock.json` is currently untracked
