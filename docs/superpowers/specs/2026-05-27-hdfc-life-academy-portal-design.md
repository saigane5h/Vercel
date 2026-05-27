# HDFC Life Academy + Policy Portal (Project 2) — Design

**Date:** 2026-05-27
**Status:** Approved (design); pending spec review

## Summary

Clone the existing `TATA-AIA-Academy` Next.js prototype into a new project
`HDFC-Life-Academy`, rebrand it to HDFC Life, and extend it with a **logged-in
policy portal** modelled on the HDFC Life "My Policies" dashboard. The academy
(video-first learning hub) remains anonymous-accessible; the portal is gated
behind a mock login. Video is woven into the portal in three places, all
reusing the academy's existing kPoint SDK wiring. The academy and portal are
cross-linked.

## Goals

- A faithful HDFC Life rebrand of the academy with zero new video infrastructure.
- A logged-in dashboard that "videofies" the policyholder experience.
- Reuse the existing GCC long-form and VXPlayer reels SDK patterns verbatim.
- Bidirectional links between the academy (public) and the portal (gated).

## Non-goals (YAGNI)

- No real backend, OTP, or captcha verification — login is mock only.
- No new kPoint video IDs — reuse the existing `gccId` / reel pool.
- No functional calculators.
- No inner pages for My Account / Receipts / Service Requests — these stay in
  the portal nav as non-functional placeholder stubs.

## Architecture & routing

New folder: `C:/Users/KTPL-0178/HDFC-Life-Academy` (full copy of the TATA repo,
then rebranded).

| Route | Surface | Access |
|---|---|---|
| `/` | Academy home (rebranded) | Anonymous |
| `/video/[id]`, `/courses`, `/courses/[id]`, `/policies` | Academy (existing) | Anonymous |
| `/login` | Visual replica of HDFC login page | Anonymous |
| `/portal` | Logged-in "My Policies" dashboard | Gated → redirect to `/login` |

## Rebrand (tokens, not rewrites)

- `tailwind.config.js` + `app/globals.css`: `red` → `#ED1C24`, `red.dark` →
  `#C8102E`, `red.light` → `#FF3B45`. Keep the `navy` scale for the portal
  header (`#0E1A3C` deep navy to match the screenshot).
- `components/Navbar.jsx` / `components/Footer.jsx`: "HDFC Life" wordmark with a
  red square "H" logo mark; academy sub-label "Academy".
- Fonts unchanged (DM Sans body / Playfair Display headings) — no new dependency.
- Scrollbar / card / btn-red / section-title accents inherit the new red token.

## Auth (mock, real enough to gate)

Replace the stub `lib/auth.jsx` with a real client-side context:

- `AuthProvider` holds `{ user, login(creds), logout() }`, persists a flag in
  `localStorage`.
- A successful `login()` (any non-empty mobile + DOB + captcha match client-side)
  sets the hardcoded **demo user** (Vishal Eknath Bhilare + the two policies from
  the screenshot) and redirects to `/portal`.
- `components/ProtectedRoute.jsx` becomes a real `<RequireAuth>` guard wrapping
  `/portal`; unauthenticated → `redirect('/login')`.

## Cross-linking

- Academy `Navbar` gains a **"My Policies / Login"** entry → `/portal` when
  logged in, else `/login`.
- Portal header nav (My Policies · My Account · Receipts · Service Requests)
  gains an **"Academy"** link → `/`, plus an inline "Learn more on the Academy"
  hyperlink near the policy cards.
- Login page Useful Links includes an **Academy** link → `/`.

## The three portal video touchpoints (reuse existing SDK)

All three reuse components/wiring already present in `app/page.jsx`.

1. **Search → results overlay → player.**
   The top search bar ("Search policies, FAQs, claims…" + red "Video answers"
   button) filters a combined list of `featuredVideos` + `policyVideos` by title
   into a results overlay **list**. Clicking a result opens `GCCModal` on that
   video. Esc / X / click-outside closes back to the dashboard. `GCCModal`
   already implements overlay + close + prev/next.

2. **Policy-card play icon → player.**
   Each policy card (Click 2 Protect 3D Plus, Sanchay Par Advantage) renders the
   red ▶ button. Click opens `GCCModal` (or `PolicyVideoModal`) seeded with a
   **specific** explainer video mapped to that product via the policy data.

3. **Shorts strip → VXPlayer popup.**
   The "Personalised for you" reels row reuses `ShortVideosSection`'s VXPlayer
   wiring verbatim (`window.VXPlayer(el, {type:'reels', mode:'popup'})` +
   `.jumpTo(id)`), HDFC-styled tiles. Same SDK code as the academy shorts.

## Data layer additions (`lib/data.js`)

- `demoUser`: `{ name, lastLogin, totalSumAssured }`.
- `policies`: array of `{ id, planName, policyNo, status, sumAssured, premium,
  premiumCadence, endDate?, premiumDue?, nudge?, gccId }` — `gccId` from the
  existing pool (touchpoint #2 mapping).
- `personalisedShorts`: array of reel `{ id, title, duration }` from the existing
  reel pool (touchpoint #3).
- Existing academy exports (`featuredVideos`, `videoSeries`, `policyVideos`,
  `shortReels`, `categories`) reused unchanged.

## Portal layout (`app/portal/page.jsx`)

- Deep-navy sticky header: "HDFC Life" + nav (My Policies active · My Account ·
  Receipts · Service Requests · Academy).
- Search row: input + red "Video answers" pill (touchpoint #1).
- Greeting block: "Good morning, {name}" + last login + active policy count.
- Cards row: Total Sum Assured summary card (+ explore chips: Health/ULIP/Child
  Plans linking to `/courses`) and the two policy cards with red ▶ (touchpoint #2).
- "Personalised for you" shorts strip (touchpoint #3) + "See all" → `/`.
- Floating "Video answers via KPOINT" chat bubble (visual only).

## Testing / verification

Prototype-grade. Verify via dev server (`npm run dev`) in the browser:
- `/` renders rebranded academy; existing video/courses/policies flows still work.
- `/portal` redirects to `/login` when logged out; login redirects to `/portal`.
- Each of the three touchpoints opens a player overlay and closes cleanly.
- No console errors from the kPoint embeds.

## Known gaps / next steps

- Mock auth only; no persistence beyond `localStorage`.
- Placeholder header tabs are non-functional.
- Video-to-product mapping is illustrative (reused pool IDs).
