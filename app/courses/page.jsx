'use client'
import { useState } from 'react'
import { featuredVideos, videoSeries, categories } from '@/lib/data'
import { Search, Play, Clock } from 'lucide-react'
import Link from 'next/link'

function VideoCard({ video }) {
  return (
    <div className="card overflow-hidden group cursor-pointer">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-white/25 border border-white/50 flex items-center justify-center group-hover:bg-red group-hover:border-red transition-all">
            <Play size={15} className="text-white ml-0.5" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/70 rounded text-[10px] text-white px-1.5 py-0.5">{video.duration}</span>
        {video.tag && <span className={`absolute top-2 left-2 badge ${video.tagColor} text-[10px]`}>{video.tag}</span>}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-navy text-sm leading-snug group-hover:text-red transition-colors line-clamp-2">{video.title}</h3>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const filtered = featuredVideos.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase())
    const matchTag = activeTag === 'All' || v.tag === activeTag
    return matchSearch && matchTag
  })

  return (
    <div>
      <div className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-red text-xs font-semibold uppercase tracking-wider mb-2">Health Insurance</p>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Video Guides</h1>
          <p className="text-white/50 text-sm mb-5">Everything you need to know about health insurance — in short videos</p>
          <div className="relative max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" />
            <input type="text" placeholder="Search videos..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-red/50 transition-all" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveTag(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${activeTag === cat ? 'bg-red text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-red/40 hover:text-red'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Series */}
        <h2 className="font-display text-lg font-bold text-navy mb-4">Video Guides by Topic</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {videoSeries.map(s => (
            <Link href={`/courses/${s.id}`} key={s.id} className="block group">
              <div className="card overflow-hidden">
                <div className="relative h-28 overflow-hidden">
                  <img src={s.thumbnail} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-red flex items-center justify-center">
                      <Play size={14} className="text-white ml-0.5" />
                    </div>
                  </div>
                  <span className={`absolute top-2 left-2 badge ${s.tagColor} text-[9px]`}>{s.tag}</span>
                  <div className="absolute bottom-2 right-2 bg-black/60 rounded-full px-1.5 py-0.5 text-[10px] text-white flex items-center gap-1"><Play size={7} />{s.videos}</div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-navy text-xs leading-snug group-hover:text-red transition-colors line-clamp-2">{s.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Video grid */}
        <h2 className="font-display text-lg font-bold text-navy mb-4">All Videos <span className="text-gray-400 font-normal text-sm ml-1">{filtered.length} videos</span></h2>
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-semibold text-navy mb-1">No videos found</h3>
            <p className="text-gray-400 text-sm">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}
