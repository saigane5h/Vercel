'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { featuredVideos, policyVideos } from '@/lib/data'
import { Play, ArrowRight, ShieldCheck, Search, ChevronRight, ChevronLeft, Calendar, X, PiggyBank, TrendingUp, HeartPulse, Landmark, Receipt, Baby } from 'lucide-react'

const REELS_HOST = 'ktpl.kpoint.com'
const HDFC_BLUE = '#0A3D7A'

const vthumb = (id) =>
  `https://${REELS_HOST}/media/data.ap-southeast-1.kpoint/ktpl.kpoint.in/ktpl.kpoint.com/kapsule/${id}/v4/i/vthumb.jpg`
const gthumb = (id) =>
  `https://${REELS_HOST}/media/data.ap-southeast-1.kpoint/ktpl.kpoint.in/ktpl.kpoint.com/kapsule/${id}/v4/i/thumb.jpg`

const gccVideos = [
  { id: 'gcc-3048f3df-f2d0-419c-a8c1-c84a660f8897', title: 'Life Insurance Explained' },
  { id: 'gcc-a97a3c26-7011-4312-85a3-f0724dad58e5', title: 'Policy Benefits & Coverage' },
  { id: 'gcc-5ef75afa-e47b-4863-bb23-09c5234b4dda', title: 'How to Choose the Right Plan' },
  { id: 'gcc-f5cecef7-8272-4a12-a5bd-fe366ccfa195', title: 'Claim Settlement Guide' },
  { id: 'gcc-6d7af790-a531-4f15-8754-0f20f6b9ed16', title: 'Smart Insurance Planning' },
]

const reels = [
  { id: 'gcc-6bc3afc3-d5ba-4ae6-9a84-51305101f2b7', title: 'What is Term Insurance?',             duration: '0:32' },
  { id: 'gcc-6947ca09-a39a-4c78-aa8c-b3860375cab9', title: 'How to File a Claim in 3 Steps',      duration: '0:45' },
  { id: 'gcc-e2b96e60-15f9-4ae9-a02e-70e6bfce5b64', title: 'ULIP vs Term — Which is Better?',     duration: '0:28' },
  { id: 'gcc-4e8fb7ac-5625-4a21-9ed9-90411ae5249a', title: 'Critical Illness — Are You Covered?', duration: '0:38' },
  { id: 'gcc-09788a3f-3892-4c6b-bb9e-dfbe6991870e', title: 'Tax Savings on Life Insurance',       duration: '0:41' },
]

// ── Hero video — light framed, click to play ──────────────────
function HeroVideo() {
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    const script = document.createElement('script')
    script.src = 'https://ktpl.kpoint.com/assets/orca/media/embed/videofront-vega.js'
    script.async = true
    document.body.appendChild(script)
    return () => { script.remove() }
  }, [playing])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">
      {playing ? (
        <div className="video-wrapper">
          <div data-init-dynamic data-video-host="ktpl.kpoint.com"
            data-kvideo-id="gcc-2ddf9906-1b9f-4ce2-80e3-da11af723c7e"
            data-state="PUBLISHED" data-samesite="true" style={{ width: '100%' }} />
        </div>
      ) : (
        <div className="relative aspect-video cursor-pointer group" onClick={() => setPlaying(true)}>
          <img src={gthumb('gcc-2ddf9906-1b9f-4ce2-80e3-da11af723c7e')}
            alt="Understanding life insurance" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80' }} />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-red flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play size={24} className="text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/75 to-transparent">
            <p className="text-white font-semibold text-sm">Why life insurance matters — in 3 minutes</p>
            <p className="text-white/60 text-xs mt-0.5">Start here · 3 min</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Shared play button (light card variant) ───────────────────
function PlayBtn({ large = false }) {
  return (
    <div className={`rounded-full bg-white/30 border-2 border-white/70 flex items-center justify-center group-hover:bg-red group-hover:border-red transition-all duration-300 flex-shrink-0 ${large ? 'w-14 h-14' : 'w-9 h-9'}`}>
      <Play size={large ? 22 : 13} className="text-white ml-0.5" />
    </div>
  )
}

// ── 9:16 reel card ────────────────────────────────────────────
function ReelCard({ reel, onClick }) {
  return (
    <div className="group cursor-pointer flex-shrink-0 snap-start" style={{ width: '120px' }} onClick={onClick}>
      <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ width: '120px', height: '210px', background: '#0d1b35' }}>
        <img src={vthumb(reel.id)} alt={reel.title}
          style={{ width: '120px', height: '210px', objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.style.display = 'none' }} />
        <div className="absolute inset-0 flex items-center justify-center"><PlayBtn /></div>
        <span className="absolute bottom-2 right-2 bg-black/70 rounded px-1.5 py-0.5 text-[9px] text-white font-medium">{reel.duration}</span>
      </div>
      <p className="text-gray-600 text-[11px] font-medium mt-2 line-clamp-2 leading-snug group-hover:text-red transition-colors">{reel.title}</p>
    </div>
  )
}

// ── GCC embed — re-mounts via key ─────────────────────────────
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

// ── Modal popup with left/right navigation ────────────────────
function GCCModal({ videos, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrent(p => Math.max(0, p - 1))
      if (e.key === 'ArrowRight') setCurrent(p => Math.min(videos.length - 1, p + 1))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, videos.length])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" style={{ background: 'rgba(0,0,0,0.88)' }} onClick={onClose}>
      <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
          <GCCVideoPlayer key={videos[current].id} videoId={videos[current].id} />
          <button onClick={onClose} className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-all" aria-label="Close"><X size={16} /></button>
          <button onClick={e => { e.stopPropagation(); setCurrent(p => Math.max(0, p - 1)) }} disabled={current === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/55 hover:bg-black/80 text-white transition-all disabled:opacity-20" aria-label="Previous"><ChevronLeft size={24} /></button>
          <button onClick={e => { e.stopPropagation(); setCurrent(p => Math.min(videos.length - 1, p + 1)) }} disabled={current === videos.length - 1}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/55 hover:bg-black/80 text-white transition-all disabled:opacity-20" aria-label="Next"><ChevronRight size={24} /></button>
        </div>
        <div className="mt-3 flex items-center justify-between px-1">
          <p className="text-white/75 text-sm font-medium truncate mr-4">{videos[current].title}</p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {videos.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-red w-5' : 'bg-white/30 w-1.5 hover:bg-white/60'}`} aria-label={`Video ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 16:9 GCC thumbnail card (light caption) ───────────────────
function GCCCard({ video, onClick }) {
  return (
    <div className="group cursor-pointer flex-shrink-0 snap-start" style={{ width: '232px' }} onClick={onClick}>
      <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ width: '232px', height: '131px', background: '#0d1b35' }}>
        <img src={gthumb(video.id)} alt={video.title}
          style={{ width: '232px', height: '131px', objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.style.display = 'none' }} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center"><PlayBtn /></div>
      </div>
      <p className="text-gray-700 text-sm font-medium mt-2 line-clamp-2 leading-snug group-hover:text-red transition-colors">{video.title}</p>
    </div>
  )
}

// ── Featured GCC strip — click opens modal ────────────────────
function FeaturedGCCSection() {
  const [modalIndex, setModalIndex] = useState(null)
  return (
    <div>
      {modalIndex !== null && <GCCModal videos={gccVideos} startIndex={modalIndex} onClose={() => setModalIndex(null)} />}
      <div className="flex gap-4 overflow-x-auto snap-x pb-2" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        {gccVideos.map((v, i) => <GCCCard key={v.id} video={v} onClick={() => setModalIndex(i)} />)}
        <Link href="/courses" className="flex-shrink-0 snap-start group flex items-center" style={{ width: '120px' }}>
          <div className="rounded-xl border-2 border-dashed border-gray-300 hover:border-red/50 flex flex-col items-center justify-center gap-2 transition-all w-full" style={{ height: '131px' }}>
            <ArrowRight size={16} className="text-gray-400 group-hover:text-red transition-colors" />
            <span className="text-[11px] text-gray-400 group-hover:text-red transition-colors">All videos</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

// ── VXPlayer popup for short reels ────────────────────────────
function ShortVideosSection() {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  useEffect(() => {
    function init() {
      if (!containerRef.current || playerRef.current) return
      playerRef.current = window.VXPlayer(containerRef.current, { hostname: REELS_HOST, type: 'reels', videoIds: reels.map(r => r.id), mode: 'popup' })
    }
    if (window.VXPlayer) init()
    else { document.addEventListener('vxplayerready', init); return () => document.removeEventListener('vxplayerready', init) }
  }, [])
  const open = (id) => playerRef.current?.jumpTo(id)
  return (
    <div>
      <Script src="https://assets.kpoint.com/orca/media/embed/player-vx.js" strategy="afterInteractive" />
      <div ref={containerRef} />
      <div className="flex gap-4 overflow-x-auto snap-x pb-2" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        {reels.map((reel, i) => <ReelCard key={i} reel={reel} onClick={() => open(reel.id)} />)}
        <Link href="/courses" className="flex-shrink-0 snap-start group flex items-center" style={{ width: '120px' }}>
          <div className="rounded-xl border-2 border-dashed border-gray-300 hover:border-red/50 flex flex-col items-center justify-center gap-2 transition-all w-full" style={{ height: '210px' }}>
            <ArrowRight size={18} className="text-gray-400 group-hover:text-red transition-colors" />
            <span className="text-[11px] text-gray-400 group-hover:text-red text-center px-2 leading-tight transition-colors">See all</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

// ── Grid video card → /video/[id] ─────────────────────────────
function GridCard({ video }) {
  const thumb = video.gccId ? gthumb(video.gccId) : video.thumbnail
  return (
    <Link href={`/video/${video.id}`} className="block group">
      <div className="relative rounded-xl overflow-hidden aspect-video mb-3 bg-gray-100 border border-gray-200">
        <img src={thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.onerror = null; e.target.src = video.thumbnail || '' }} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center"><PlayBtn /></div>
        <span className="absolute bottom-2.5 right-2.5 bg-black/70 rounded px-2 py-0.5 text-xs text-white font-medium">{video.duration}</span>
        {video.tag && <span className={`absolute top-2.5 left-2.5 badge ${video.tagColor} text-[10px]`}>{video.tag}</span>}
      </div>
      <h3 className="font-semibold text-navy text-sm leading-snug group-hover:text-red transition-colors">{video.title}</h3>
    </Link>
  )
}

// ── Regulatory update row + modal ─────────────────────────────
function PolicyRow({ pv, onOpen }) {
  const thumb = pv.gccId ? gthumb(pv.gccId) : pv.thumbnail
  return (
    <button onClick={() => onOpen(pv)} className="block group text-left w-full">
      <div className="card flex gap-4 p-4 items-start hover:border-red/25 transition-all">
        <div className="relative flex-shrink-0 w-24 sm:w-36 h-16 sm:h-20 rounded-xl overflow-hidden bg-gray-100">
          <img src={thumb} alt={pv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.onerror = null; e.target.src = pv.thumbnail || '' }} />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-red flex items-center justify-center"><Play size={13} className="text-white ml-0.5" /></div>
          </div>
          <span className="absolute bottom-1.5 right-1.5 bg-black/70 rounded text-[10px] text-white px-1.5 py-0.5">{pv.duration}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`badge ${pv.tagColor} text-[10px]`}>{pv.tag}</span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1"><Calendar size={9} />{pv.date}</span>
          </div>
          <h3 className="font-semibold text-navy text-sm leading-snug group-hover:text-red transition-colors mb-1">{pv.title}</h3>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{pv.summary}</p>
        </div>
      </div>
    </button>
  )
}

function PolicyVideoModal({ pv, onClose }) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-4 border-b border-gray-100">
          <div className="flex-1 pr-4">
            <span className={`badge ${pv.tagColor} mb-1`}>{pv.tag}</span>
            <h3 className="font-semibold text-navy text-base leading-snug">{pv.title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-navy transition-colors flex-shrink-0" aria-label="Close"><X size={20} /></button>
        </div>
        <div className="aspect-video bg-black">
          <GCCVideoPlayer key={pv.gccId} videoId={pv.gccId || 'gcc-3048f3df-f2d0-419c-a8c1-c84a660f8897'} />
        </div>
        <div className="p-4"><p className="text-sm text-gray-600 leading-relaxed">{pv.summary}</p></div>
      </div>
    </div>
  )
}

function TagBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${active ? 'bg-red text-white border-red' : 'bg-white text-gray-500 border-gray-200 hover:border-red/40 hover:text-red'}`}>
      {label}
    </button>
  )
}

// ── Plan-type category (HDFC product taxonomy) ────────────────
const PLAN_TYPES = [
  { icon: ShieldCheck, title: 'Term Insurance', desc: 'Pure protection for your family', tint: 'bg-red/10 text-red' },
  { icon: TrendingUp,  title: 'ULIP & Investment', desc: 'Market-linked growth + cover', tint: 'bg-blue-100 text-blue-700' },
  { icon: PiggyBank,   title: 'Savings Plans', desc: 'Guaranteed savings like Sanchay', tint: 'bg-emerald-100 text-emerald-700' },
  { icon: Landmark,    title: 'Retirement & Pension', desc: 'Annuities and lifelong income', tint: 'bg-amber-100 text-amber-700' },
  { icon: HeartPulse,  title: 'Health Cover', desc: 'Critical illness and add-ons', tint: 'bg-rose-100 text-rose-700' },
  { icon: Receipt,     title: 'Tax Saving', desc: '80C, 10(10D) explained simply', tint: 'bg-violet-100 text-violet-700' },
]

export default function AcademyPage() {
  const router = useRouter()
  const [heroQuery, setHeroQuery] = useState('')
  const essentialsTags = ['All', 'Basics', 'Planning', 'Claims', 'Critical illness', 'Benefits', 'Must know', 'Tax & cover']
  const [essentialsTag, setEssentialsTag] = useState('All')
  const [activePolicy, setActivePolicy] = useState(null)

  const essentialsVideos = featuredVideos.filter(v =>
    essentialsTag === 'All' ? !['Myth busted', 'FAQ'].includes(v.tag) : v.tag === essentialsTag
  )

  const submitSearch = (e) => { e.preventDefault(); router.push('/courses') }

  return (
    <div className="bg-white">
      {activePolicy && <PolicyVideoModal pv={activePolicy} onClose={() => setActivePolicy(null)} />}

      {/* ── HERO (light, HDFC) ─────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100" style={{ background: 'linear-gradient(180deg,#FFF5F5 0%,#FFFFFF 60%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_-10%,rgba(237,28,36,0.10),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1 mb-5 shadow-sm">
                <span className="w-5 h-5 rounded bg-red flex items-center justify-center text-white text-[10px] font-extrabold">H</span>
                <span className="text-xs font-semibold text-navy">HDFC Life Academy</span>
              </div>
              <h1 className="font-display font-bold text-navy leading-tight mb-3" style={{ fontSize: 'clamp(2rem,4.2vw,3.2rem)' }}>
                Understand your cover.<br /><span className="text-red">Sar utha ke jiyo.</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed mb-7 max-w-lg">
                Short, clear videos that explain term, savings, ULIP, retirement and claims — so you choose with confidence and make the most of every HDFC Life policy.
              </p>

              <form onSubmit={submitSearch} className="relative max-w-md mb-5">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={heroQuery} onChange={e => setHeroQuery(e.target.value)}
                  placeholder="What do you want to learn about?"
                  className="w-full bg-white border border-gray-300 rounded-full pl-12 pr-28 py-3.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-red shadow-sm" />
                <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 btn-red px-5 py-2 text-sm">Search</button>
              </form>

              <div className="flex flex-wrap gap-3">
                <Link href="/courses" className="btn-red px-6 py-3 text-sm inline-flex items-center gap-2"><Play size={15} /> Explore videos</Link>
                <Link href="/login" className="px-6 py-3 text-sm font-semibold rounded-lg border-2 border-gray-300 text-navy hover:border-red hover:text-red transition-all inline-flex items-center gap-2">Login to My Policies</Link>
              </div>
            </div>
            <HeroVideo />
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative border-t border-gray-100 bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { k: '200+', v: 'Explainer videos' },
              { k: 'IRDAI', v: 'Compliant & unbiased' },
              { k: '6', v: 'Plan categories' },
              { k: 'Free', v: 'No login needed' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-red font-bold text-lg leading-none">{s.k}</p>
                <p className="text-gray-500 text-xs mt-1">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPLORE BY PLAN TYPE ───────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-red text-xs font-semibold uppercase tracking-wider mb-2">Explore by plan type</p>
            <h2 className="font-display text-3xl font-bold text-navy">Learn about every HDFC Life solution</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">From protection to wealth and retirement — pick a category and watch the essentials.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLAN_TYPES.map((p, i) => {
              const Icon = p.icon
              return (
                <Link href="/courses" key={i} className="group">
                  <div className="card p-6 h-full flex items-start gap-4 hover:shadow-lg transition-all">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${p.tint}`}><Icon size={22} /></div>
                    <div>
                      <h3 className="font-bold text-navy group-hover:text-red transition-colors">{p.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{p.desc}</p>
                      <span className="text-red text-xs font-semibold flex items-center gap-1 mt-3 group-hover:gap-2 transition-all">Watch videos <ArrowRight size={11} /></span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WATCH & LEARN (featured) ───────────────────────── */}
      <section className="py-14" style={{ background: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-red text-xs font-semibold uppercase tracking-wider mb-1">Watch &amp; learn</p>
              <h2 className="font-display text-2xl font-bold text-navy">Featured explainers</h2>
              <p className="text-gray-500 text-sm mt-1">Curated by our advisors — tap any video to play.</p>
            </div>
            <Link href="/courses" className="hidden sm:flex items-center gap-1 text-red text-sm font-semibold hover:gap-2 transition-all">All videos <ArrowRight size={13} /></Link>
          </div>
          <FeaturedGCCSection />
        </div>
      </section>

      {/* ── QUICK ANSWERS (shorts) ─────────────────────────── */}
      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-red text-xs font-semibold uppercase tracking-wider mb-1">Quick answers</p>
              <h2 className="font-display text-2xl font-bold text-navy">60-second shorts</h2>
              <p className="text-gray-500 text-sm mt-1">The questions everyone asks — answered fast.</p>
            </div>
            <Link href="/courses" className="hidden sm:flex items-center gap-1 text-red text-sm font-semibold hover:gap-2 transition-all">See more <ArrowRight size={13} /></Link>
          </div>
          <ShortVideosSection />
        </div>
      </section>

      {/* ── THE ESSENTIALS (filterable grid) ───────────────── */}
      <section className="py-14" style={{ background: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="text-red text-xs font-semibold uppercase tracking-wider mb-1">Begin here</p>
              <h2 className="font-display text-2xl font-bold text-navy">The essentials, explained simply</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-xl">The most important things to know — curated, not algorithmic.</p>
            </div>
            <Link href="/courses" className="hidden sm:flex items-center gap-1 text-red text-sm font-semibold hover:gap-2 transition-all">All videos <ArrowRight size={13} /></Link>
          </div>
          <div className="flex flex-wrap gap-2 my-5">
            {essentialsTags.map(tag => <TagBtn key={tag} label={tag} active={essentialsTag === tag} onClick={() => setEssentialsTag(tag)} />)}
          </div>
          {essentialsVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {essentialsVideos.slice(0, 4).map(v => <GridCard key={v.id} video={v} />)}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 text-sm">No videos in this category yet.</div>
          )}
        </div>
      </section>

      {/* ── PLAN WITH OUR TOOLS ────────────────────────────── */}
      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-red text-xs font-semibold uppercase tracking-wider mb-1">Plan with our tools</p>
            <h2 className="font-display text-2xl font-bold text-navy">Know your numbers before you decide</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-xl">Calculators and estimators to make the numbers make sense.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, title: 'How much cover do I need?', desc: 'Based on income, dependants and liabilities' },
              { icon: Receipt, title: 'What will my premium be?', desc: 'Age, cover amount and policy term' },
              { icon: Landmark, title: 'Plan my retirement income', desc: 'Annuity and pension estimator' },
              { icon: PiggyBank, title: 'Tax saved under 80C', desc: 'See your deduction at a glance' },
            ].map((tool, i) => {
              const Icon = tool.icon
              return (
                <div key={i} className="card p-5 hover:border-red/25 cursor-pointer group transition-all">
                  <div className="w-10 h-10 rounded-lg bg-red/10 flex items-center justify-center mb-3"><Icon size={18} className="text-red" /></div>
                  <h3 className="font-semibold text-navy text-sm mb-2 group-hover:text-red transition-colors leading-snug">{tool.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">{tool.desc}</p>
                  <span className="text-red text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Use tool <ArrowRight size={11} /></span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── LATEST UPDATES ─────────────────────────────────── */}
      <section className="py-14" style={{ background: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-red text-xs font-semibold uppercase tracking-wider mb-1">Stay current</p>
              <h2 className="font-display text-2xl font-bold text-navy">What just changed — and what it means for you</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-xl">IRDAI regulations and budget updates, in plain language.</p>
            </div>
            <Link href="/policies" className="hidden sm:flex items-center gap-1 text-red text-sm font-semibold hover:gap-2 transition-all">All updates <ArrowRight size={13} /></Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {policyVideos.slice(0, 4).map(pv => <PolicyRow key={pv.id} pv={pv} onOpen={setActivePolicy} />)}
          </div>
        </div>
      </section>

      {/* ── ALREADY A CUSTOMER BAND ────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-12" style={{ background: `linear-gradient(120deg, ${HDFC_BLUE} 0%, #0E1A3C 100%)` }}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(237,28,36,0.25),transparent_55%)]" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-red-light text-xs font-semibold uppercase tracking-wider mb-2">Already an HDFC Life customer?</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">See your policies and personalised video answers</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-lg">
                  Log in to My Policies to view your sum assured, premiums and tailored explainer videos for each plan you own.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/login" className="btn-red px-6 py-3 text-sm inline-flex items-center gap-2">Login <ArrowRight size={14} /></Link>
                  <Link href="/portal" className="px-6 py-3 text-sm font-semibold rounded-lg border-2 border-white/40 text-white hover:border-white transition-all inline-flex items-center gap-2">Go to My Policies</Link>
                </div>
              </div>
              <div className="hidden md:grid grid-cols-2 gap-3">
                {[
                  { icon: ShieldCheck, t: 'Your cover at a glance' },
                  { icon: Play, t: 'Per-policy video answers' },
                  { icon: Receipt, t: 'Premiums & receipts' },
                  { icon: Baby, t: 'Plans for your family' },
                ].map((c, i) => {
                  const Icon = c.icon
                  return (
                    <div key={i} className="bg-white/10 border border-white/15 rounded-xl p-4">
                      <Icon size={18} className="text-red-light mb-2" />
                      <p className="text-white text-xs font-medium leading-snug">{c.t}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
