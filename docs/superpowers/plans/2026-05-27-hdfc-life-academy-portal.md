# HDFC Life Academy + Policy Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clone the TATA-AIA-Academy Next.js prototype into `HDFC-Life-Academy`, rebrand it to HDFC Life, and add a mock-auth-gated `/portal` "My Policies" dashboard with three kPoint video touchpoints, cross-linked with the public academy.

**Architecture:** Next.js 15 App Router. Academy at `/` (public, reused unchanged except branding). Login replica at `/login`. Gated dashboard at `/portal`. A real client-side `AuthProvider` (localStorage) gates the portal. All three portal video touchpoints reuse the academy's existing `GCCModal` (long-form overlay) and `ShortVideosSection`/`VXPlayer` (reels popup) wiring.

**Tech Stack:** Next.js 15.3.9, React 19, Tailwind CSS 3.4, lucide-react, kPoint GCC (`videofront-vega.js`) + VXPlayer (`player-vx.js`) embeds.

**Source repo:** `C:/Users/KTPL-0178/TATA-AIA-Academy`
**Target repo:** `C:/Users/KTPL-0178/HDFC-Life-Academy` (already has `docs/` + git initialized)

**Verification note:** There is no unit-test harness (playwright is in devDeps but unused). Each task is verified by running `npm run dev` and observing the browser, plus checking the console for embed errors. "Verify" steps describe exactly what to look for.

---

## Task 1: Clone the source project into the target folder

**Files:**
- Copy all of `C:/Users/KTPL-0178/TATA-AIA-Academy` into `C:/Users/KTPL-0178/HDFC-Life-Academy` **except** `.git`, `node_modules`, `.next` (preserve the target's existing `.git` and `docs/`).

- [ ] **Step 1: Copy source files (excluding git/build/deps)**

```bash
cd "C:/Users/KTPL-0178/TATA-AIA-Academy"
for item in SUMMARY.md app components lib jsconfig.json next.config.js package.json package-lock.json postcss.config.js tailwind.config.js .claude; do
  cp -r "$item" "C:/Users/KTPL-0178/HDFC-Life-Academy/" 2>/dev/null
done
echo "copied"
ls "C:/Users/KTPL-0178/HDFC-Life-Academy"
```

Expected: target now lists `app components docs lib package.json tailwind.config.js ...`

- [ ] **Step 2: Add a .gitignore (if not present)**

Create: `C:/Users/KTPL-0178/HDFC-Life-Academy/.gitignore`

```
node_modules
.next
.DS_Store
*.log
```

- [ ] **Step 3: Install dependencies**

```bash
cd "C:/Users/KTPL-0178/HDFC-Life-Academy" && npm install
```

Expected: completes with no fatal errors; `node_modules` created.

- [ ] **Step 4: Verify the unmodified clone runs**

```bash
cd "C:/Users/KTPL-0178/HDFC-Life-Academy" && npm run dev
```

Open `http://localhost:3000` — the TATA academy home should render. Stop the server.

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/KTPL-0178/HDFC-Life-Academy"
git add -A
git commit -m "chore: clone TATA-AIA-Academy as HDFC-Life-Academy base"
```

---

## Task 2: Rebrand color tokens (Tailwind + globals)

**Files:**
- Modify: `tailwind.config.js:11`
- Modify: `app/globals.css:6-8` and accent usages

- [ ] **Step 1: Update Tailwind red token**

In `tailwind.config.js`, replace the `red` color line:

```js
red: { DEFAULT: '#ED1C24', dark: '#C8102E', light: '#FF3B45' },
```

- [ ] **Step 2: Update CSS variables and accents in `app/globals.css`**

Replace the `--red*` variables at the top:

```css
  --red: #ED1C24;
  --red-dark: #C8102E;
  --red-light: #FF3B45;
```

Then replace every other hardcoded `#E31837` with `#ED1C24` and every `#B5122B` with `#C8102E` in this file (scrollbar thumb, shimmer-red, card hover, section-title, tab-active, btn-red, btn-red:hover, the rgba shadows `rgba(227,24,55,...)` → `rgba(237,28,36,...)`).

- [ ] **Step 3: Verify in browser**

`npm run dev`, open `/`. Confirm red accents (logo square, buttons, section underlines, hover borders) now render as the brighter HDFC red. No layout change.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js app/globals.css
git commit -m "style: rebrand color tokens to HDFC Life red"
```

---

## Task 3: Rebrand the Navbar and Footer wordmark + academy link

**Files:**
- Modify: `components/Navbar.jsx:22-33,53` and `navLinks`
- Modify: `components/Footer.jsx` (wordmark text)

- [ ] **Step 1: Update the Navbar logo + wordmark**

In `components/Navbar.jsx`, replace the logo `<Link>` block (lines ~22-33) so the mark shows a bold "H" and the wordmark reads "HDFC Life" / "Academy":

```jsx
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-md bg-red flex items-center justify-center">
              <span className="text-white font-extrabold text-base leading-none">H</span>
            </div>
            <div className="leading-tight hidden sm:block">
              <span className="block font-bold text-navy text-xs tracking-tight">HDFC Life</span>
              <span className="block font-bold text-red text-xs tracking-tight -mt-0.5">Academy</span>
            </div>
            <div className="leading-tight sm:hidden">
              <span className="block font-bold text-red text-sm tracking-tight">HDFC Academy</span>
            </div>
          </Link>
```

- [ ] **Step 2: Add the "My Policies" cross-link to navLinks**

In `components/Navbar.jsx`, replace the `navLinks` array (lines ~7-12) and the trailing "Ask an expert" link so the portal is reachable. Replace `navLinks`:

```js
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Guides' },
  { href: '/policies', label: 'Updates' },
]
```

Then replace the desktop "Ask an expert" `<Link>` (line ~53) with a portal link:

```jsx
            <Link href="/portal" className="ml-1 text-sm font-semibold text-red hover:text-red-dark transition-colors px-3 py-2">My Policies</Link>
```

And the mobile "Ask an expert" `<Link>` (line ~75) with:

```jsx
          <Link href="/portal" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-red">My Policies</Link>
```

- [ ] **Step 3: Update Footer wordmark**

Open `components/Footer.jsx`, find any "Tata AIA" / "AIA Academy" text and replace with "HDFC Life Academy". (Read the file first; replace brand strings only — leave layout/links intact.)

- [ ] **Step 4: Verify in browser**

`npm run dev`, open `/`. Navbar shows red "H" mark + "HDFC Life / Academy", a red "My Policies" link, and footer reads "HDFC Life Academy". Clicking "My Policies" navigates to `/portal` (will redirect to `/login` after Task 5 — for now it may 404/redirect to `/`; that's fine pre-auth).

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.jsx components/Footer.jsx
git commit -m "style: HDFC Life wordmark + My Policies cross-link in nav/footer"
```

---

## Task 4: Real mock auth context + RequireAuth guard

**Files:**
- Modify: `lib/auth.jsx` (replace stub)
- Modify: `components/ProtectedRoute.jsx` (replace stub with real guard)
- Modify: `components/Providers.jsx` (wrap with AuthProvider — read first to confirm it isn't already)
- Add demo data in `lib/data.js` (Task 6 fills policies; here we add only `demoUser`)

- [ ] **Step 1: Read the current providers + protected route**

```bash
cd "C:/Users/KTPL-0178/HDFC-Life-Academy"
cat components/Providers.jsx components/ProtectedRoute.jsx
```

Note whether `Providers` already renders `AuthProvider`.

- [ ] **Step 2: Implement the real AuthProvider**

Replace `lib/auth.jsx` entirely:

```jsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const DEMO_USER = {
  name: 'Vishal Eknath Bhilare',
  lastLogin: '28/04/2026',
}

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('hdfc_auth') === '1') setUser(DEMO_USER)
    } catch {}
    setReady(true)
  }, [])

  const login = () => {
    try { localStorage.setItem('hdfc_auth', '1') } catch {}
    setUser(DEMO_USER)
  }
  const logout = () => {
    try { localStorage.removeItem('hdfc_auth') } catch {}
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

- [ ] **Step 3: Ensure Providers wraps children in AuthProvider**

If Step 1 showed `Providers` does NOT already use `AuthProvider`, edit `components/Providers.jsx` to wrap its children:

```jsx
'use client'
import { AuthProvider } from '@/lib/auth'

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}
```

(If `Providers` already renders other context, nest `AuthProvider` inside it rather than replacing.)

- [ ] **Step 4: Implement RequireAuth guard**

Replace `components/ProtectedRoute.jsx` entirely:

```jsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

export default function RequireAuth({ children }) {
  const { user, ready } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (ready && !user) router.replace('/login')
  }, [ready, user, router])

  if (!ready || !user) return null
  return children
}
```

- [ ] **Step 5: Verify it compiles**

`npm run dev`, open `/` — academy still renders, no console errors. (Guard not yet wired to a page; that happens in Task 7.)

- [ ] **Step 6: Commit**

```bash
git add lib/auth.jsx components/ProtectedRoute.jsx components/Providers.jsx
git commit -m "feat: real client-side mock auth context + RequireAuth guard"
```

---

## Task 5: HDFC login page (visual replica, mock auth)

**Files:**
- Replace: `app/login/page.jsx` (currently a redirect stub)

- [ ] **Step 1: Implement the login replica**

Replace `app/login/page.jsx` entirely:

```jsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Calendar, RefreshCw } from 'lucide-react'

const TABS = ['Mobile No', 'Email ID', 'Policy No', 'Client ID']
const LANGS = ['English', 'हिन्दी', 'বাংলা', 'తెలుగు', 'தமிழ்', 'मराठी', 'ગુજરાતી', 'ਪੰਜਾਬੀ', 'മലയാളം', 'ಕನ್ನಡ']
const USEFUL_LINKS = [
  'DT Payout', 'Branch Locator', 'Become an advisor',
  'Pay Premium', 'Policy Servicing', 'Service Query - Chat',
  'Application Tracker', 'Buy Term Insurance Plan Online', 'Unit Prices',
  'Make a Claim', 'Escalations', 'Submit Life Certificate Online',
  'Maturity Payout',
]

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [tab, setTab] = useState('Mobile No')
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')
  const [captcha, setCaptcha] = useState('')

  const handleProceed = (e) => {
    e.preventDefault()
    login()
    router.push('/portal')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top logo bar */}
      <div className="border-b border-gray-200 px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="w-9 h-9 rounded bg-red flex items-center justify-center text-white font-extrabold">H</span>
          <span className="font-bold text-navy text-lg">HDFC Life</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* LEFT — login card */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex rounded-full bg-gray-100 p-1 mb-5">
            <button className="flex-1 py-2 rounded-full bg-red text-white text-sm font-semibold">Individual Login</button>
            <button className="flex-1 py-2 rounded-full text-gray-600 text-sm font-semibold">Special Life Login</button>
          </div>

          <div className="flex border-b border-gray-200 mb-5">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 pb-2 text-sm font-medium ${tab === t ? 'text-red border-b-2 border-red' : 'text-gray-500'}`}>
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={handleProceed} className="space-y-5">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Mobile No <span className="text-red">*</span></label>
              <div className="flex gap-2">
                <span className="text-gray-600 text-sm pt-2">+91</span>
                <input value={mobile} onChange={e => setMobile(e.target.value)} required
                  placeholder="Enter your Mobile No."
                  className="flex-1 border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-red" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Date of Birth <span className="text-red">*</span></label>
              <div className="flex items-center border-b border-gray-300">
                <input value={dob} onChange={e => setDob(e.target.value)} required
                  placeholder="Please enter DOB of Policy Owner"
                  className="flex-1 py-2 text-sm focus:outline-none" />
                <Calendar size={16} className="text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Captcha <span className="text-red">*</span></label>
              <div className="flex items-center gap-3">
                <input value={captcha} onChange={e => setCaptcha(e.target.value)} required
                  placeholder="Please enter captcha"
                  className="flex-1 border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-red" />
                <span className="bg-gray-200 px-3 py-1 rounded font-mono font-bold tracking-widest text-gray-700 select-none">465988</span>
                <RefreshCw size={16} className="text-gray-400 cursor-pointer" />
              </div>
            </div>

            <button type="submit" className="w-full btn-red py-3">Proceed</button>
          </form>
        </div>

        {/* RIGHT — WhatsApp + useful links */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-navy mb-1">Now chat with our official WhatsApp bot Etty in your preferred language!</h2>
          <p className="text-sm text-red font-semibold mt-3 mb-2">Languages available are</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
            {LANGS.map(l => <span key={l}>✓ {l}</span>)}
          </div>
          <p className="text-sm text-gray-600">Simply text <b>"Hi"</b> to <span className="text-red font-semibold">+91 82918 90569</span> on WhatsApp.</p>

          <div className="border border-gray-200 rounded-lg p-4 mt-6">
            <p className="font-bold text-navy mb-3">USEFUL LINKS</p>
            <div className="grid sm:grid-cols-3 gap-y-2 text-sm">
              {USEFUL_LINKS.map(l => (
                <span key={l} className="text-red flex items-center gap-1">› {l}</span>
              ))}
              <Link href="/" className="text-red font-semibold flex items-center gap-1">› Academy</Link>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Questions about your policy? <a href="mailto:service@hdfclife.com" className="text-red underline">service@hdfclife.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

`npm run dev`, open `/login`. Confirm: Individual/Special toggle, four input tabs, +91 mobile / DOB / captcha fields, the WhatsApp panel with language ticks, Useful Links grid including an **Academy** link. Filling any values and clicking **Proceed** navigates to `/portal`.

- [ ] **Step 3: Commit**

```bash
git add app/login/page.jsx
git commit -m "feat: HDFC Life login page replica with mock auth"
```

---

## Task 6: Portal data (demo policies + personalised shorts)

**Files:**
- Modify: `lib/data.js` (append exports at end)

- [ ] **Step 1: Append portal data to `lib/data.js`**

Add at the end of `lib/data.js` (uses existing `GCC_POOL` IDs already defined at top of file, and reel IDs from `shortReels`):

```js
// ── Logged-in portal: demo policyholder + policies ───────────
export const portalPolicies = [
  {
    id: 'pol-c2p',
    policyNo: '2247 4904',
    planName: 'HDFC Life Click 2 Protect 3D Plus',
    status: 'In Force · Active',
    sumAssured: '₹1,00,00,000',
    premium: '₹7,227',
    premiumCadence: 'half yr',
    endDate: 'Ends: 31 Mar 2064',
    gccId: 'gcc-3048f3df-f2d0-419c-a8c1-c84a660f8897', // Term plan explainer
  },
  {
    id: 'pol-sanchay',
    policyNo: '2515 1310',
    planName: 'HDFC Life Sanchay Par Advantage',
    status: 'In Force',
    sumAssured: '₹7,32,000',
    premium: '₹5,250',
    premiumCadence: 'month',
    premiumDue: 'Premium due',
    nudge: 'Avail pre-approved loan of ₹95,000',
    gccId: 'gcc-a97a3c26-7011-4312-85a3-f0724dad58e5', // Savings plan explainer
  },
]

export const portalUser = {
  totalSumAssured: '₹1,07,32,000',
  activeCount: 2,
  savings: 1,
  term: 1,
}

// Personalised shorts strip — reuses the reel pool
export const personalisedShorts = [
  { id: 'gcc-b95dd34d-81ca-424a-b9a4-05fe1df79a3c', title: 'Why your term cover needs review', duration: '0:58' },
  { id: 'gcc-cf479c95-9a01-4a71-8f2e-69a5da14833d', title: 'Sanchay maturity benefits',         duration: '1:12' },
  { id: 'gcc-b7ac4612-c863-4fe4-a12d-d6e034d1857a', title: 'Add critical illness rider now',     duration: '0:45' },
  { id: 'gcc-6991f4ee-e383-4826-b6d8-92b3afbb20d9', title: 'NPS for retirement — ₹20/day',       duration: '1:30' },
  { id: 'gcc-7ed6a23c-5420-4cbf-861c-93f61c018aef', title: 'Tax savings with ULIP',              duration: '0:52' },
]
```

- [ ] **Step 2: Verify it imports**

`npm run dev` — no compile error. (Consumed by Task 7.)

- [ ] **Step 3: Commit**

```bash
git add lib/data.js
git commit -m "feat: add portal demo policies + personalised shorts data"
```

---

## Task 7: Portal dashboard page with three video touchpoints

**Files:**
- Create: `app/portal/page.jsx`

This page reuses the SDK patterns from `app/page.jsx`. We copy the proven `GCCVideoPlayer`, `GCCModal`, and VXPlayer-reels wiring into self-contained helpers inside this file (the academy page keeps its own copies — no shared refactor, per spec).

- [ ] **Step 1: Create the portal page**

Create `app/portal/page.jsx`:

```jsx
'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useAuth } from '@/lib/auth'
import RequireAuth from '@/components/ProtectedRoute'
import { portalPolicies, portalUser, personalisedShorts, featuredVideos, policyVideos } from '@/lib/data'
import { Search, Play, X, ChevronLeft, ChevronRight, MessageSquareText } from 'lucide-react'

const REELS_HOST = 'ktpl.kpoint.com'
const vthumb = (id) => `https://${REELS_HOST}/media/data.ap-southeast-1.kpoint/ktpl.kpoint.in/ktpl.kpoint.com/kapsule/${id}/v4/i/vthumb.jpg`

// ── GCC long-form embed (re-mounts via key) ──────────────────
function GCCVideoPlayer({ videoId }) {
  useEffect(() => {
    const s = document.createElement('script')
    s.src = 'https://ktpl.kpoint.com/assets/orca/media/embed/videofront-vega.js'
    s.async = true
    document.body.appendChild(s)
    return () => s.remove()
  }, [])
  return (
    <div className="video-wrapper" style={{ width: '100%' }}>
      <div data-init-dynamic data-video-host="ktpl.kpoint.com" data-kvideo-id={videoId}
        data-state="PUBLISHED" data-samesite="true" style={{ width: '100%' }} />
    </div>
  )
}

// ── Overlay modal (single video, Esc / X / click-outside) ────
function VideoOverlay({ videoId, title, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8" style={{ background: 'rgba(0,0,0,0.88)' }} onClick={onClose}>
      <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
          <GCCVideoPlayer key={videoId} videoId={videoId} />
          <button onClick={onClose} className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white" aria-label="Close"><X size={16} /></button>
        </div>
        {title && <p className="text-white/75 text-sm font-medium mt-3 px-1 truncate">{title}</p>}
      </div>
    </div>
  )
}

// ── Touchpoint 1: search → results overlay list → player ─────
function SearchVideoBar({ onPlay }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const pool = [...featuredVideos, ...policyVideos]
  const results = q.trim()
    ? pool.filter(v => v.title.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8)
    : []

  return (
    <div className="relative">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={e => { setQ(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            placeholder="Search policies, FAQs, claims…"
            className="w-full bg-white/5 border border-white/15 rounded-full pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-red"
          />
        </div>
        <button onClick={() => setOpen(true)} className="bg-red text-white rounded-full px-6 font-semibold text-sm flex items-center gap-2">
          <Play size={14} /> Video answers
        </button>
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {results.map(v => (
            <button key={v.id} onClick={() => { onPlay(v.gccId, v.title); setOpen(false); setQ('') }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-0">
              <span className="w-8 h-8 rounded-full bg-red/10 flex items-center justify-center flex-shrink-0"><Play size={12} className="text-red ml-0.5" /></span>
              <span className="text-sm text-navy font-medium">{v.title}</span>
            </button>
          ))}
        </div>
      )}
      {open && q.trim() && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 px-4 py-3 text-sm text-gray-500">No video answers found.</div>
      )}
    </div>
  )
}

// ── Touchpoint 3: personalised shorts (VXPlayer popup) ───────
function ShortsStrip() {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  useEffect(() => {
    function init() {
      if (!containerRef.current || playerRef.current) return
      playerRef.current = window.VXPlayer(containerRef.current, {
        hostname: REELS_HOST, type: 'reels',
        videoIds: personalisedShorts.map(r => r.id), mode: 'popup',
      })
    }
    if (window.VXPlayer) init()
    else { document.addEventListener('vxplayerready', init); return () => document.removeEventListener('vxplayerready', init) }
  }, [])
  const open = (id) => playerRef.current?.jumpTo(id)
  return (
    <div>
      <Script src="https://assets.kpoint.com/orca/media/embed/player-vx.js" strategy="afterInteractive" />
      <div ref={containerRef} />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-red text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><Play size={10} /> Shorts</span>
          <h3 className="text-white font-bold">Personalised for you</h3>
        </div>
        <Link href="/" className="text-white/50 text-sm hover:text-white">See all →</Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {personalisedShorts.map((reel) => (
          <div key={reel.id} onClick={() => open(reel.id)} className="group cursor-pointer flex-shrink-0" style={{ width: '120px' }}>
            <div className="relative rounded-xl overflow-hidden" style={{ width: '120px', height: '200px', background: '#0d1b35' }}>
              <img src={vthumb(reel.id)} alt={reel.title} style={{ width: '120px', height: '200px', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none' }} />
              <span className="absolute top-2 right-2 bg-black/70 rounded px-1.5 py-0.5 text-[10px] text-white">{reel.duration}</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-10 h-10 rounded-full bg-white/25 border-2 border-white/50 flex items-center justify-center group-hover:bg-red group-hover:border-red transition-all"><Play size={14} className="text-white ml-0.5" /></span>
              </div>
              <p className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-semibold leading-tight">{reel.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Touchpoint 2: policy card with red play button ───────────
function PolicyCard({ policy, onPlay }) {
  return (
    <div className="relative bg-white/5 border border-white/10 rounded-xl p-5">
      <span className="inline-block bg-white/10 text-white/70 text-xs rounded px-2 py-0.5 mb-3">{policy.policyNo} · {policy.status}</span>
      <h3 className="text-white font-bold">{policy.planName}</h3>
      <p className="text-white text-2xl font-bold mt-1">{policy.sumAssured}</p>
      <div className="flex items-center justify-between mt-3 text-sm text-white/60">
        <span>{policy.endDate || policy.premiumDue}</span>
        <span>{policy.premium} / {policy.premiumCadence}</span>
      </div>
      {policy.nudge && <div className="mt-3 bg-amber-100 text-amber-900 text-sm rounded px-3 py-2">{policy.nudge}</div>}
      <button onClick={() => onPlay(policy.gccId, policy.planName)}
        className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-red flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Play explainer">
        <Play size={18} className="text-white ml-0.5" />
      </button>
    </div>
  )
}

function PortalDashboard() {
  const { user, logout } = useAuth()
  const [overlay, setOverlay] = useState(null) // { videoId, title }
  const play = (videoId, title) => setOverlay({ videoId, title })

  return (
    <div className="min-h-screen" style={{ background: '#0b1020' }}>
      {/* Deep-navy header */}
      <header className="bg-navy-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded bg-red flex items-center justify-center text-white font-extrabold">H</span>
          <span className="text-white font-bold text-lg">HDFC Life</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <span className="text-white font-semibold border-b-2 border-white pb-1">My Policies</span>
          <span className="text-white/60">My Account</span>
          <span className="text-white/60">Receipts</span>
          <span className="text-white/60">Service Requests</span>
          <Link href="/" className="text-red font-semibold">Academy</Link>
          <button onClick={logout} className="text-white/60 hover:text-white">Logout</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <SearchVideoBar onPlay={play} />

        <div>
          <h1 className="text-white text-2xl font-bold">Good morning, {user?.name}</h1>
          <p className="text-white/50 text-sm mt-1">Last Login: {user?.lastLogin} · {portalUser.activeCount} active policies</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Summary card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-white/50 text-sm">Total Sum Assured</p>
            <p className="text-white text-3xl font-bold mt-1">{portalUser.totalSumAssured}</p>
            <p className="text-white/40 text-xs mt-3">All policies ({portalUser.activeCount})</p>
            <p className="text-white/60 text-sm mt-1">Savings · {portalUser.savings} | Term · {portalUser.term}</p>
            <p className="text-white/40 text-xs mt-4 mb-2">Explore more</p>
            <div className="flex flex-wrap gap-2">
              {['Health Plans', 'ULIP Plans', 'Child Plans'].map(c => (
                <Link key={c} href="/courses" className="text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 hover:border-red hover:text-red">{c}</Link>
              ))}
            </div>
            <Link href="/" className="text-red text-sm font-semibold mt-4 inline-block">Learn more on the Academy →</Link>
          </div>

          {portalPolicies.map(p => <PolicyCard key={p.id} policy={p} onPlay={play} />)}
        </div>

        <ShortsStrip />
      </main>

      {/* Floating chat bubble (visual only) */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3">
        <span className="bg-navy-800 text-white text-sm rounded-full px-4 py-2 shadow-lg">Video answers via KPOINT</span>
        <button className="w-12 h-12 rounded-full bg-red flex items-center justify-center shadow-xl"><MessageSquareText size={20} className="text-white" /></button>
      </div>

      {overlay && <VideoOverlay videoId={overlay.videoId} title={overlay.title} onClose={() => setOverlay(null)} />}
    </div>
  )
}

export default function Page() {
  return (
    <RequireAuth>
      <PortalDashboard />
    </RequireAuth>
  )
}
```

- [ ] **Step 2: Verify the auth gate**

`npm run dev`. In a fresh/incognito tab open `/portal` directly → should redirect to `/login`. Log in via Proceed → lands on `/portal` showing the dark dashboard with greeting "Good morning, Vishal Eknath Bhilare", the summary card, both policy cards, and the shorts strip.

- [ ] **Step 3: Verify touchpoint 1 (search)**

In the portal search bar type "claim" (or "term") → a results dropdown appears. Click a result → a video overlay opens and plays. Press Esc / click outside / X → returns to the dashboard. Check console: no embed errors.

- [ ] **Step 4: Verify touchpoint 2 (policy card play)**

Click the red ▶ on each policy card → overlay opens with that policy's explainer video. Close it.

- [ ] **Step 5: Verify touchpoint 3 (shorts)**

Click a shorts tile → the VXPlayer reels popup opens. Close it.

- [ ] **Step 6: Verify cross-links**

"Academy" in the header and "Learn more on the Academy" both navigate to `/`. From `/`, the navbar "My Policies" link returns to `/portal` (no re-login needed — localStorage persists).

- [ ] **Step 7: Commit**

```bash
git add app/portal/page.jsx
git commit -m "feat: portal dashboard with search/policy/shorts video touchpoints"
```

---

## Task 8: Update SUMMARY.md for the new project

**Files:**
- Modify: `SUMMARY.md`

- [ ] **Step 1: Update brand + add portal section**

Edit `SUMMARY.md`: replace "Tata AIA Life Insurance Academy" with "HDFC Life Academy" in the title/intro, and add a short section documenting the new `/login` and `/portal` routes, the mock `AuthProvider`, and the three portal video touchpoints (search overlay, policy-card play, shorts VXPlayer popup).

- [ ] **Step 2: Commit**

```bash
git add SUMMARY.md
git commit -m "docs: update SUMMARY for HDFC Life rebrand + portal"
```

---

## Self-Review

**Spec coverage:**
- Clone → Task 1. ✓
- Rebrand tokens/nav/footer → Tasks 2–3. ✓
- Mock auth + gate → Task 4. ✓
- Login replica → Task 5. ✓
- Portal data → Task 6. ✓
- Portal dashboard + 3 touchpoints → Task 7. ✓
- Cross-links (academy↔portal, login→academy) → Tasks 3, 5, 7. ✓
- Anonymous academy access unchanged → Tasks 1–3 leave `/` public. ✓
- Out-of-scope items (no backend/calculators/inner pages) honored. ✓

**Type/name consistency:** `useAuth()` returns `{ user, login, logout, ready }` (Task 4) and is consumed in Tasks 5/7 with those names. `RequireAuth` default-exported from `ProtectedRoute.jsx` (Task 4) and imported in Task 7. Data exports `portalPolicies`, `portalUser`, `personalisedShorts` (Task 6) match Task 7 imports. `play(videoId, title)` / `onPlay` signature consistent across `SearchVideoBar`, `PolicyCard`, and `VideoOverlay`.

**Placeholder scan:** No TBD/TODO; all code blocks complete.
