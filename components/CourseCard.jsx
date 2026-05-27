import Link from 'next/link'
import { Clock, PlayCircle, User, ChevronRight } from 'lucide-react'

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <div className="card h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative overflow-hidden h-44 bg-gray-100">
          <img src={course.thumbnail} alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`badge ${course.badgeColor}`}>{course.badge}</span>
          </div>
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-xs font-semibold text-navy">
            <PlayCircle size={12} className="text-red" />
            {course.videos} videos
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-red uppercase tracking-wide">{course.category}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
              course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
              'bg-purple-100 text-purple-700'}`}>
              {course.level}
            </span>
          </div>

          <h3 className="font-semibold text-navy text-base leading-snug mb-2 group-hover:text-red transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
              <span className="flex items-center gap-1"><User size={11} /> {course.instructor}</span>
            </div>
            <span className="text-red text-xs font-semibold flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
              Explore <ChevronRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
