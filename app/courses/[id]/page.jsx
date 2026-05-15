'use client'

import { useParams } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { courses, videos } from '@/lib/data'
import Link from 'next/link'
import { ArrowLeft, Clock, PlayCircle, BookOpen, ChevronRight, Users, Code2 } from 'lucide-react'
import { useState } from 'react'

function VideoPlayer({ video }) {
  if (!video) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/8 bg-navy-800/60 aspect-video flex items-center justify-center">
        <div className="text-center">
          <PlayCircle size={48} className="text-white/20 mx-auto mb-3" />
          <p className="text-white/30 text-sm">Select a lesson to begin</p>
        </div>
      </div>
    )
  }
  if (video.embedCode) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/8 bg-black video-wrapper"
        dangerouslySetInnerHTML={{ __html: video.embedCode }} />
    )
  }
  return (
    <div className="rounded-2xl overflow-hidden border border-dashed border-gold-400/30 bg-navy-800/60 aspect-video flex flex-col items-center justify-center gap-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,180,41,0.05),transparent_70%)]" />
      <div className="relative text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mx-auto mb-4">
          <PlayCircle size={32} className="text-gold-400/60" />
        </div>
        <h3 className="font-display text-lg font-semibold text-white mb-2">{video.title}</h3>
        <p className="text-white/35 text-sm mb-4 max-w-sm leading-relaxed">
          Video embed pending. Add your <code className="text-gold-400/70 bg-gold-400/10 px-1 py-0.5 rounded text-xs">embedCode</code> to <code className="text-gold-400/70 bg-gold-400/10 px-1 py-0.5 rounded text-xs">lib/data.js</code> for this lesson.
        </p>
        <div className="inline-flex items-center gap-2 bg-navy-700/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/40 font-mono">
          <Code2 size={12} className="text-gold-400/60" />
          embedCode: '&lt;iframe src="..." /&gt;'
        </div>
      </div>
    </div>
  )
}

export default function CoursePage() {
  const { id } = useParams()
  const course = courses.find(c => c.id === id)
  const courseVideos = videos.filter(v => v.courseId === id)
  const [activeVideo, setActiveVideo] = useState(courseVideos[0] || null)

  if (!course) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center text-center px-4">
          <div>
            <div className="text-6xl mb-4">📚</div>
            <h2 className="font-display text-2xl text-white mb-2">Course not found</h2>
            <p className="text-white/40 text-sm mb-6">This course may have moved or does not exist.</p>
            <Link href="/courses" className="text-gold-400 hover:underline text-sm">← Back to Courses</Link>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="border-b border-white/5 bg-navy-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-white/40">
              <Link href="/courses" className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft size={14} /> Courses
              </Link>
              <ChevronRight size={13} />
              <span className="text-white/70 truncate">{course.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <VideoPlayer video={activeVideo} />
                {activeVideo && (
                  <div className="mt-4">
                    <h2 className="font-display text-xl font-bold text-white mb-1">{activeVideo.title}</h2>
                    <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                      <span className="flex items-center gap-1"><Clock size={12} /> {activeVideo.duration}</span>
                      <div className="flex gap-1.5">
                        {activeVideo.tags.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-full bg-navy-700 text-white/50">{t}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{activeVideo.description}</p>
                  </div>
                )}
              </div>
              <div className="bg-navy-800/60 border border-white/5 rounded-2xl p-6">
                <h1 className="font-display text-2xl font-bold text-white mb-3">{course.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/40 mb-4">
                  <span className="text-gold-400/80 font-medium">{course.category}</span>
                  <span className="flex items-center gap-1"><Users size={13} /> {course.instructor}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {course.duration}</span>
                  <span className="flex items-center gap-1"><PlayCircle size={13} /> {course.videos} videos</span>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{course.description}</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-navy-800/60 border border-white/8 rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen size={15} className="text-gold-400" />
                      <h3 className="font-medium text-white text-sm">Course Content</h3>
                    </div>
                    <span className="text-xs text-white/30">{courseVideos.length} lessons</span>
                  </div>
                  <div className="divide-y divide-white/5 max-h-[60vh] overflow-y-auto">
                    {courseVideos.length > 0 ? courseVideos.map((video, idx) => (
                      <button key={video.id} onClick={() => setActiveVideo(video)}
                        className={`w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-white/5 transition-colors ${activeVideo?.id === video.id ? 'bg-gold-400/8 border-l-2 border-gold-400' : ''}`}>
                        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${activeVideo?.id === video.id ? 'bg-gold-400 text-navy-900' : 'bg-navy-700 text-white/40'}`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-snug mb-1 ${activeVideo?.id === video.id ? 'text-gold-400' : 'text-white/70'}`}>{video.title}</p>
                          <span className="text-xs text-white/30 flex items-center gap-1"><Clock size={10} /> {video.duration}</span>
                        </div>
                      </button>
                    )) : (
                      <div className="px-5 py-8 text-center">
                        <p className="text-white/30 text-sm">Videos coming soon</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
