'use client'
import { useParams } from 'next/navigation'
import { videoSeries, featuredVideos } from '@/lib/data'
import Link from 'next/link'
import { ArrowLeft, Play, Clock, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

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

function VideoPlayer({ video }) {
  if (!video) return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 aspect-video flex items-center justify-center">
      <div className="text-center"><Play size={40} className="text-gray-200 mx-auto mb-2" /><p className="text-gray-400 text-sm">Select a video</p></div>
    </div>
  )
  // Prefer kpoint GCC embed when a gccId is present on the video
  if (video.gccId) return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-black shadow-sm">
      <GCCPlayer key={video.gccId} videoId={video.gccId} />
    </div>
  )
  if (video.embedCode) return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-black video-wrapper"
      dangerouslySetInnerHTML={{ __html: video.embedCode }} />
  )
  return (
    <div className="rounded-2xl border-2 border-dashed border-red/25 bg-red/2 aspect-video flex flex-col items-center justify-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-red/10 border border-red/20 flex items-center justify-center">
        <Play size={28} className="text-red/50" />
      </div>
      <h3 className="font-semibold text-navy text-base px-6 text-center">{video.title}</h3>
      <p className="text-gray-400 text-sm text-center max-w-xs">Video coming soon</p>
    </div>
  )
}

export default function SeriesPage() {
  const { id } = useParams()
  const series = videoSeries.find(s => s.id === id)
  const videos = featuredVideos.filter(v => v.seriesId === id)
  const [active, setActive] = useState(videos[0] || null)

  if (!series) return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <div className="text-5xl mb-3">📹</div>
        <h2 className="font-display text-xl text-navy mb-2">Guide not found</h2>
        <Link href="/courses" className="text-red text-sm font-medium hover:underline">← Back to Videos</Link>
      </div>
    </div>
  )

  return (
    <div>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/courses" className="hover:text-red transition-colors flex items-center gap-1"><ArrowLeft size={13} /> Video Guides</Link>
            <ChevronRight size={12} /><span className="text-navy font-medium truncate">{series.title}</span>
          </nav>
        </div>
      </div>
      <div className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <span className={`badge ${series.tagColor} text-[10px] mb-2 inline-block`}>{series.tag}</span>
          <h1 className="font-display text-2xl font-bold text-white mb-1">{series.title}</h1>
          <p className="text-white/50 text-sm">{series.subtitle}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <VideoPlayer video={active} />
            {active && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="font-semibold text-navy text-lg mb-1">{active.title}</h2>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={11} /> {active.duration}</span>
                  {active.tag && <span className={`badge ${active.tagColor} text-[10px]`}>{active.tag}</span>}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-navy text-sm">Videos in this guide</h3>
                <span className="text-xs text-gray-400">{videos.length} videos</span>
              </div>
              <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
                {videos.length > 0 ? videos.map((v, idx) => (
                  <button key={v.id} onClick={() => setActive(v)}
                    className={`w-full text-left px-4 py-3.5 flex gap-3 items-start hover:bg-gray-50 transition-colors ${active?.id === v.id ? 'bg-red/5 border-l-2 border-red' : ''}`}>
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${active?.id === v.id ? 'bg-red text-white' : 'bg-gray-100 text-gray-500'}`}>{idx + 1}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug mb-0.5 ${active?.id === v.id ? 'text-red font-medium' : 'text-navy'}`}>{v.title}</p>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} />{v.duration}</span>
                    </div>
                  </button>
                )) : (
                  <div className="px-4 py-8 text-center"><p className="text-gray-400 text-sm">Videos coming soon</p></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
