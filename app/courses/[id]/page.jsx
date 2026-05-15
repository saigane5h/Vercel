'use client'

import { useParams } from 'next/navigation'
import { courses, videos } from '@/lib/data'
import Link from 'next/link'
import { ArrowLeft, Clock, PlayCircle, BookOpen, ChevronRight, User, Code2 } from 'lucide-react'
import { useState } from 'react'

function VideoPlayer({ video }) {
  if (!video) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-100 aspect-video flex items-center justify-center">
        <div className="text-center">
          <PlayCircle size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Select a lesson to begin</p>
        </div>
      </div>
    )
  }
  if (video.embedCode) {
    return (
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-black video-wrapper"
        dangerouslySetInnerHTML={{ __html: video.embedCode }} />
    )
  }
  // Placeholder
  return (
    <div className="rounded-2xl border-2 border-dashed border-red/30 bg-red/3 aspect-video flex flex-col items-center justify-center gap-4 relative">
      <div className="text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-red/10 border border-red/20 flex items-center justify-center mx-auto mb-4">
          <PlayCircle size={32} className="text-red/50" />
        </div>
        <h3 className="font-semibold text-navy text-lg mb-2">{video.title}</h3>
        <p className="text-gray-500 text-sm mb-4 max-w-sm leading-relaxed">
          Video embed pending. Add your <code className="text-red bg-red/10 px-1 py-0.5 rounded text-xs">embedCode</code> in <code className="text-red bg-red/10 px-1 py-0.5 rounded text-xs">lib/data.js</code>.
        </p>
        <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 font-mono">
          <Code2 size={12} className="text-red" />
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
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <div className="text-6xl mb-4">📚</div>
          <h2 className="font-display text-2xl text-navy mb-2">Course not found</h2>
          <p className="text-gray-400 text-sm mb-6">This course may have moved or does not exist.</p>
          <Link href="/courses" className="text-red hover:underline text-sm font-medium">← Back to Courses</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/courses" className="hover:text-red transition-colors flex items-center gap-1 font-medium">
              <ArrowLeft size={14} /> Courses
            </Link>
            <ChevronRight size={13} />
            <span className="text-navy font-medium truncate">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* Course hero strip */}
      <div className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <span className="text-xs font-semibold text-red uppercase tracking-wider">{course.category}</span>
          <h1 className="font-display text-3xl font-bold text-white mt-1 mb-2">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><User size={13} /> {course.instructor}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {course.duration}</span>
            <span className="flex items-center gap-1.5"><PlayCircle size={13} /> {course.videos} lessons</span>
            <span className={`badge ${
              course.level === 'Beginner' ? 'bg-green-400/20 text-green-300' :
              course.level === 'Intermediate' ? 'bg-blue-400/20 text-blue-300' :
              'bg-purple-400/20 text-purple-300'}`}>
              {course.level}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video + info */}
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer video={activeVideo} />
            {activeVideo && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="font-semibold text-navy text-lg mb-1">{activeVideo.title}</h2>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Clock size={11} /> {activeVideo.duration}</span>
                  <div className="flex gap-1.5">
                    {activeVideo.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{t}</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{activeVideo.description}</p>
              </div>
            )}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-semibold text-navy mb-2">About this course</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={15} className="text-red" />
                  <h3 className="font-semibold text-navy text-sm">Course Content</h3>
                </div>
                <span className="text-xs text-gray-400">{courseVideos.length} lessons</span>
              </div>
              <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
                {courseVideos.length > 0 ? courseVideos.map((video, idx) => (
                  <button key={video.id} onClick={() => setActiveVideo(video)}
                    className={`w-full text-left px-5 py-3.5 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                      activeVideo?.id === video.id ? 'bg-red/5 border-l-2 border-red' : ''}`}>
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                      activeVideo?.id === video.id ? 'bg-red text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug mb-0.5 ${activeVideo?.id === video.id ? 'text-red font-medium' : 'text-navy'}`}>
                        {video.title}
                      </p>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={10} /> {video.duration}
                      </span>
                    </div>
                  </button>
                )) : (
                  <div className="px-5 py-8 text-center">
                    <p className="text-gray-400 text-sm">Videos coming soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
