'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { policyVideos } from '@/lib/data'
import { Shield, Clock, Calendar, Play, X } from 'lucide-react'

export default function PoliciesPage() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <div className="border-b border-white/5 bg-navy-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center">
                <Shield size={18} className="text-red-400" />
              </div>
              <h1 className="font-display text-4xl font-bold text-white">Policy Updates</h1>
            </div>
            <p className="text-white/40">Latest IRDAI circulars, regulatory changes, and compliance briefings</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Alert banner */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-400/8 border border-red-400/20 mb-10">
            <Shield size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-400 font-medium mb-0.5">Compliance Notice</p>
              <p className="text-xs text-white/40 leading-relaxed">
                All BFSI professionals are required to review the latest IRDAI circulars. 
                New policy videos are added regularly. Ensure your team stays compliant.
              </p>
            </div>
          </div>

          {/* Video grid */}
          <div className="space-y-4">
            {policyVideos.map((pv, i) => (
              <div key={pv.id} className="card-glow rounded-xl bg-navy-800/60 overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start gap-0">
                  {/* Video thumbnail / play */}
                  <button
                    onClick={() => setActiveVideo(pv)}
                    className="relative flex-shrink-0 w-full sm:w-56 h-32 bg-navy-900 flex items-center justify-center group border-b sm:border-b-0 sm:border-r border-white/5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-700/50 to-navy-900" />
                    <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-gold-400/20 group-hover:border-gold-400/40 transition-all">
                      <Play size={20} className="text-white group-hover:text-gold-400 ml-1" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 rounded px-2 py-0.5 text-xs text-white/70">
                      {pv.duration}
                    </div>
                  </button>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <span className={`badge ${pv.tagColor}`}>{pv.tag}</span>
                      <div className="flex items-center gap-1.5 text-xs text-white/30">
                        <Calendar size={11} />
                        <span>{pv.date}</span>
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-2 leading-snug">
                      {pv.title}
                    </h3>
                    <p className="text-sm text-white/45 leading-relaxed mb-4">{pv.summary}</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setActiveVideo(pv)}
                        className="flex items-center gap-1.5 text-gold-400 text-sm font-medium hover:text-gold-500 transition-colors"
                      >
                        <Play size={13} /> Watch Now
                      </button>
                      <span className="flex items-center gap-1 text-xs text-white/30">
                        <Clock size={11} /> {pv.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-navy-800 rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-4 border-b border-white/5">
              <div className="flex-1 pr-4">
                <span className={`badge ${activeVideo.tagColor} text-[10px] mb-1`}>{activeVideo.tag}</span>
                <h3 className="font-display text-base font-semibold text-white leading-snug">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-white/30 hover:text-white transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
            {activeVideo.embedCode ? (
              <div
                className="video-wrapper"
                dangerouslySetInnerHTML={{ __html: activeVideo.embedCode }}
              />
            ) : (
              <div className="aspect-video bg-navy-900 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-400/60"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <p className="text-white/30 text-sm text-center px-6">
                  Add your <code className="text-gold-400/60 bg-gold-400/10 px-1 rounded text-xs">embedCode</code> in <code className="text-gold-400/60 bg-gold-400/10 px-1 rounded text-xs">lib/data.js</code> for this video
                </p>
              </div>
            )}
            <div className="p-4 border-t border-white/5">
              <p className="text-sm text-white/45 leading-relaxed">{activeVideo.summary}</p>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  )
}
