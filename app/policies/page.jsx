'use client'

import { useState } from 'react'
import { policyVideos } from '@/lib/data'
import { Shield, Clock, Calendar, Play, X, AlertTriangle } from 'lucide-react'

export default function PoliciesPage() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <div>
      {/* Header */}
      <div className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-red/20 border border-red/30 flex items-center justify-center">
              <Shield size={18} className="text-red" />
            </div>
            <div>
              <p className="text-red text-xs font-semibold uppercase tracking-wider">Regulatory</p>
              <h1 className="font-display text-3xl font-bold text-white">Policy Updates</h1>
            </div>
          </div>
          <p className="text-white/55 mt-2">Latest IRDAI circulars, regulatory changes, and compliance briefings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Compliance notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red/5 border border-red/20 mb-8">
          <AlertTriangle size={16} className="text-red flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red font-semibold mb-0.5">Compliance Notice</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              All BFSI professionals are required to review the latest IRDAI circulars. New policy videos are added regularly. Ensure your team stays compliant with current regulations.
            </p>
          </div>
        </div>

        {/* Video list */}
        <div className="space-y-4">
          {policyVideos.map(pv => (
            <div key={pv.id} className="card flex flex-col sm:flex-row items-start">
              {/* Play button area */}
              <button onClick={() => setActiveVideo(pv)}
                className="relative flex-shrink-0 w-full sm:w-52 h-32 bg-navy flex items-center justify-center group border-b sm:border-b-0 sm:border-r border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-700 to-navy" />
                <div className="relative z-10 w-12 h-12 rounded-full bg-white/15 border border-white/25 flex items-center justify-center group-hover:bg-red group-hover:border-red transition-all">
                  <Play size={18} className="text-white ml-1" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/60 rounded px-2 py-0.5 text-xs text-white/80">{pv.duration}</span>
              </button>

              {/* Content */}
              <div className="flex-1 p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <span className={`badge ${pv.tagColor}`}>{pv.tag}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={11} /> {pv.date}</span>
                </div>
                <h3 className="font-semibold text-navy text-base leading-snug mb-2">{pv.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{pv.summary}</p>
                <button onClick={() => setActiveVideo(pv)}
                  className="btn-red px-4 py-2 text-sm inline-flex items-center gap-1.5">
                  <Play size={13} /> Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}>
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b border-gray-100">
              <div className="flex-1 pr-4">
                <span className={`badge ${activeVideo.tagColor} mb-1`}>{activeVideo.tag}</span>
                <h3 className="font-semibold text-navy text-base leading-snug">{activeVideo.title}</h3>
              </div>
              <button onClick={() => setActiveVideo(null)} className="text-gray-400 hover:text-navy transition-colors flex-shrink-0">
                <X size={20} />
              </button>
            </div>

            {/* Video */}
            {activeVideo.embedCode ? (
              <div className="video-wrapper" dangerouslySetInnerHTML={{ __html: activeVideo.embedCode }} />
            ) : (
              <div className="aspect-video bg-gray-50 flex flex-col items-center justify-center gap-3 border-y border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-red/10 border border-red/20 flex items-center justify-center">
                  <Play size={24} className="text-red ml-1" />
                </div>
                <p className="text-gray-500 text-sm text-center px-8">
                  Add your <code className="text-red bg-red/10 px-1 rounded text-xs">embedCode</code> in <code className="text-red bg-red/10 px-1 rounded text-xs">lib/data.js</code> to play this video.
                </p>
              </div>
            )}

            {/* Summary */}
            <div className="p-4">
              <p className="text-sm text-gray-600 leading-relaxed">{activeVideo.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
