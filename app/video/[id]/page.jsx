'use client'

import { useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { featuredVideos, policyVideos, shortReels } from '@/lib/data'
import { ArrowLeft, Play, Clock, ChevronRight, Share2, BadgeCheck } from 'lucide-react'

const REELS_HOST = 'ktpl.kpoint.com'
const vthumb = (id) => `https://${REELS_HOST}/media/data.ap-southeast-1.kpoint/ktpl.kpoint.in/ktpl.kpoint.com/kapsule/${id}/v4/i/vthumb.jpg`
const gthumb = (id) => `https://${REELS_HOST}/media/data.ap-southeast-1.kpoint/ktpl.kpoint.in/ktpl.kpoint.com/kapsule/${id}/v4/i/thumb.jpg`

// GCC embed — re-mounts via key to reload player on each video
function GCCPlayer({ videoId }) {
  useEffect(() => {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = 'https://ktpl.kpoint.com/assets/orca/media/embed/videofront-vega.js'
    s.async = true
    document.body.appendChild(s)
    return () => { s.remove() }
  }, [videoId])
  return (
    <div className="video-wrapper" style={{ width: '100%' }}>
      <div
        data-init-dynamic
        data-video-host="ktpl.kpoint.com"
        data-kvideo-id={videoId}
        data-package-id={
          videoId === 'gcc-3048f3df-f2d0-419c-a8c1-c84a660f8897' ? 'tataai-form-video' :
          videoId === 'gcc-a97a3c26-7011-4312-85a3-f0724dad58e5' ? 'tataai-popup-forms tataai-buttons' :
          undefined
        }
        data-state="PUBLISHED"
        data-samesite="true"
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default function VideoLandingPage() {
  const { id } = useParams()

  // Look up the clicked item across all sources so this page is reusable
  const video = useMemo(() => {
    const all = [...featuredVideos, ...policyVideos]
    return all.find(v => v.id === id) || featuredVideos[0]
  }, [id])

  const related = featuredVideos.filter(v => v.id !== video.id).slice(0, 8)

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <div className="text-5xl mb-3">🎬</div>
          <h2 className="font-display text-xl text-navy mb-2">Video not found</h2>
          <Link href="/" className="text-red text-sm font-medium hover:underline">← Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-red transition-colors flex items-center gap-1">
              <ArrowLeft size={13} /> Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-navy font-medium truncate">{video.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT — Player + meta */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-black shadow-sm">
              <GCCPlayer key={video.gccId || video.id} videoId={video.gccId || 'gcc-3048f3df-f2d0-419c-a8c1-c84a660f8897'} />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-2">
                  {video.tag && <span className={`badge ${video.tagColor} text-[10px]`}>{video.tag}</span>}
                  {video.duration && (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={11} /> {video.duration}
                    </span>
                  )}
                </div>
                <button className="text-xs font-semibold text-gray-500 hover:text-red flex items-center gap-1 transition-colors">
                  <Share2 size={12} /> Share
                </button>
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-navy leading-snug mb-2">
                {video.title}
              </h1>
              {video.summary && (
                <p className="text-sm text-gray-500 leading-relaxed">{video.summary}</p>
              )}
              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                <BadgeCheck size={12} className="text-red" />
                HDFC Life Academy
              </div>
            </div>

            {/* Related Videos (horizontal cards) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-base font-bold text-navy">Watch more in Trending</h2>
                <Link href="/courses" className="text-red text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  All videos <ChevronRight size={12} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.slice(0, 4).map(v => (
                  <Link key={v.id} href={`/video/${v.id}`} className="group flex gap-3 items-start hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
                    <div className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{ width: '120px', height: '68px', background: '#0d1b35' }}>
                      <img
                        src={gthumb(v.gccId)}
                        alt={v.title}
                        style={{ width: '120px', height: '68px', objectFit: 'cover' }}
                        className="group-hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.style.display = 'none' }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-white/30 border border-white/60 flex items-center justify-center group-hover:bg-red group-hover:border-red transition-all">
                          <Play size={10} className="text-white ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/70 rounded px-1 py-0.5 text-[9px] text-white font-medium">{v.duration}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy text-sm leading-snug group-hover:text-red transition-colors line-clamp-2">{v.title}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{v.tag}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Related Shorts carousel */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-navy text-sm">Related Videos</h3>
                <Link href="/courses" className="text-red text-[11px] font-semibold hover:underline">See all</Link>
              </div>

              {/* Vertical 9:16 reels carousel */}
              <div className="p-3">
                <div className="flex gap-3 overflow-x-auto snap-x pb-1" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                  {shortReels.map(r => (
                    <Link key={r.id} href={`/video/${r.id}`} className="group cursor-pointer flex-shrink-0 snap-start" style={{ width: '108px' }}>
                      <div className="relative rounded-xl overflow-hidden border border-white/10" style={{ width: '108px', height: '192px', background: '#0d1b35' }}>
                        <img
                          src={vthumb(r.id)}
                          alt={r.title}
                          style={{ width: '108px', height: '192px', objectFit: 'cover' }}
                          className="group-hover:scale-105 transition-transform duration-500"
                          onError={e => { e.target.style.display = 'none' }}
                        />
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-9 h-9 rounded-full bg-white/25 border-2 border-white/50 flex items-center justify-center group-hover:bg-red group-hover:border-red transition-all">
                            <Play size={13} className="text-white ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/70 rounded px-1.5 py-0.5 text-[9px] text-white font-medium">{r.duration}</span>
                      </div>
                      <p className="text-gray-600 text-[11px] font-medium mt-1.5 line-clamp-2 leading-snug group-hover:text-red transition-colors">{r.title}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Vertical list of more videos */}
              <div className="border-t border-gray-100 max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
                {related.slice(0, 6).map(v => (
                  <Link key={v.id} href={`/video/${v.id}`} className="flex gap-3 items-start px-4 py-3 hover:bg-gray-50 transition-colors group">
                    <div className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{ width: '100px', height: '56px', background: '#0d1b35' }}>
                      <img
                        src={gthumb(v.gccId)}
                        alt={v.title}
                        style={{ width: '100px', height: '56px', objectFit: 'cover' }}
                        onError={e => { e.target.style.display = 'none' }}
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-0.5 right-0.5 bg-black/70 rounded px-1 text-[9px] text-white">{v.duration}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-navy leading-snug line-clamp-2 group-hover:text-red transition-colors">{v.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{v.tag}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
