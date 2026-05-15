'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
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
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="border-b border-white/5 bg-navy-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="font-display text-4xl font-bold text-white mb-2">All Courses</h1>
            <p className="text-white/40">Structured BFSI learning paths for every career stage</p>
            <div className="relative mt-6 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-navy-900/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-gold-400/40 transition-all" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-1.5 text-white/30 text-xs mr-2">
              <SlidersHorizontal size={13} /> Filter:
            </div>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-white/50 hover:text-white border border-white/8'}`}>
                {cat}
              </button>
            ))}
            <div className="w-px h-6 bg-white/10 self-center mx-1" />
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
              <button key={level} onClick={() => setActiveLevel(level)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${activeLevel === level ? 'bg-navy-600 text-white border border-white/20' : 'bg-navy-800 text-white/40 hover:text-white border border-white/8'}`}>
                {level}
              </button>
            ))}
          </div>

          <p className="text-sm text-white/30 mb-6">
            Showing <span className="text-white/60">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
          </p>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-display text-xl text-white mb-2">No courses found</h3>
              <p className="text-white/40 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
