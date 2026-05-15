'use client'

import { useState } from 'react'
import CourseCard from '@/components/CourseCard'
import { courses, categories } from '@/lib/data'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeLevel, setActiveLevel] = useState('All')

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || c.category === activeCategory
    const matchLevel = activeLevel === 'All' || c.level === activeLevel
    return matchSearch && matchCat && matchLevel
  })

  return (
    <div>
      {/* Page header */}
      <div className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-red text-sm font-semibold uppercase tracking-wider mb-2">BFSI Learning</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">All Courses</h1>
          <p className="text-white/55 text-base mb-6">Structured learning paths for every BFSI career stage</p>
          {/* Search */}
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-red/60 transition-all" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-200 pb-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-red text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-red/40 hover:text-red'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Level filter */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-gray-400 flex items-center gap-1.5 mr-1">
            <SlidersHorizontal size={13} /> Level:
          </span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
            <button key={level} onClick={() => setActiveLevel(level)}
              className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                activeLevel === level
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {level}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400">
            <span className="font-semibold text-navy">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-xl text-navy mb-2">No courses found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
