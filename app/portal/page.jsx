'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useAuth } from '@/lib/auth'
import RequireAuth from '@/components/ProtectedRoute'
import { portalPolicies, portalUser, personalisedShorts, featuredVideos, policyVideos } from '@/lib/data'
import { Search, Play, X, MessageSquareText } from 'lucide-react'

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
            className="w-full bg-white/5 border border-white/15 rounded-full pl-11 pr-10 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-red"
          />
          {(q || open) && (
            <button
              onClick={() => { setQ(''); setOpen(false) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button onClick={() => setOpen(true)} className="bg-red text-white rounded-full px-6 font-semibold text-sm flex items-center gap-2 whitespace-nowrap">
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
        <Link href="/academy" className="text-white/50 text-sm hover:text-white">See all →</Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {personalisedShorts.map((reel) => (
          <div key={reel.id} onClick={() => open(reel.id)} className="group cursor-pointer flex-shrink-0" style={{ width: '120px' }}>
            <div className="relative rounded-xl overflow-hidden" style={{ width: '120px', height: '200px', background: '#0d1b35' }}>
              <img src={vthumb(reel.id)} alt={reel.title} style={{ width: '120px', height: '200px', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none' }} />
              {/* Bottom gradient for title legibility */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none" />
              <span className="absolute top-2 right-2 bg-black/70 rounded px-1.5 py-0.5 text-[10px] text-white">{reel.duration}</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-10 h-10 rounded-full bg-white/25 border-2 border-white/50 flex items-center justify-center group-hover:bg-red group-hover:border-red transition-all"><Play size={14} className="text-white ml-0.5" /></span>
              </div>
              <p className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-semibold leading-tight drop-shadow">{reel.title}</p>
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
      <div className="absolute bottom-5 right-5 flex items-center gap-2 group/explainer">
        <span className="hidden sm:inline-block bg-white/10 border border-white/20 text-white/80 text-[11px] font-semibold rounded-full px-2.5 py-1">Policy Explainer</span>
        <button onClick={() => onPlay(policy.gccId, policy.planName)}
          title="Policy Explainer — watch the benefits of your plan"
          className="relative w-11 h-11 rounded-full bg-red flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Play Policy Explainer">
          <Play size={18} className="text-white ml-0.5" />
          {/* Hover tooltip (mobile + desktop) */}
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-navy-800 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-lg opacity-0 group-hover/explainer:opacity-100 transition-opacity sm:hidden">
            Policy Explainer
          </span>
        </button>
      </div>
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
      <header className="bg-navy-800 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded bg-red flex items-center justify-center text-white font-extrabold">H</span>
          <span className="text-white font-bold text-lg">HDFC Life</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <span className="text-white font-semibold border-b-2 border-white pb-1">My Policies</span>
          <span className="text-white/60">My Account</span>
          <span className="text-white/60">Receipts</span>
          <span className="text-white/60">Service Requests</span>
          <Link href="/academy" className="text-red font-semibold">Academy</Link>
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
            <Link href="/academy" className="text-red text-sm font-semibold mt-4 inline-block">Learn more on the Academy →</Link>
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
