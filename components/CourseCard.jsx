import Link from 'next/link'
import { Clock, PlayCircle, ChevronRight } from 'lucide-react'

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <div className="card-glow rounded-2xl overflow-hidden bg-navy-800 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative overflow-hidden h-44">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`badge ${course.badgeColor}`}>{course.badge}</span>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1.5">
            <PlayCircle size={13} className="text-gold-400" />
            <span className="text-xs text-white/80">{course.videos} videos</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gold-400/80 font-medium uppercase tracking-wide">
              {course.category}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              course.level === 'Beginner' ? 'bg-green-400/15 text-green-400' :
              course.level === 'Intermediate' ? 'bg-blue-400/15 text-blue-400' :
              'bg-purple-400/15 text-purple-400'
            }`}>
              {course.level}
            </span>
          </div>

          <h3 className="font-display text-white font-semibold text-lg leading-snug mb-2 group-hover:text-gold-400 transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-white/50 leading-relaxed flex-1 mb-4">
            {course.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <Clock size={12} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-gold-400 text-xs font-medium group-hover:gap-2 transition-all">
              Start Course <ChevronRight size={13} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
