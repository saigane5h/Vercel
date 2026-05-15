'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/lib/auth'
import Link from 'next/link'
import { courses, policyVideos, promotions } from '@/lib/data'
import { BookOpen, Play, TrendingUp, Shield, ChevronRight, Clock, Bell } from 'lucide-react'
import CourseCard from '@/components/CourseCard'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <div className="border-b border-white/5 bg-navy-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gold-400 text-sm font-medium mb-1">Welcome back</p>
                <h1 className="font-display text-3xl font-bold text-white">
                  {user?.name} 👋
                </h1>
                <p className="text-white/40 text-sm mt-1">Continue your BFSI learning journey</p>
              </div>
              <Link href="/policies" className="hidden sm:flex items-center gap-2 text-xs text-white/40 hover:text-white bg-navy-700/60 border border-white/8 rounded-xl px-4 py-2.5 transition-colors">
                <Bell size={14} className="text-red-400" />
                {policyVideos.length} new policy updates
              </Link>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { label: 'Available Courses', value: courses.length, icon: BookOpen, color: 'text-gold-400', bg: 'bg-gold-400/10' },
                { label: 'Video Lessons', value: '200+', icon: Play, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                { label: 'Active Promotions', value: promotions.length, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
                { label: 'Policy Updates', value: policyVideos.length, icon: Shield, color: 'text-red-400', bg: 'bg-red-400/10' },
              ].map((s, i) => (
                <div key={i} className="bg-navy-800/60 border border-white/5 rounded-xl p-4">
                  <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${s.bg} mb-3`}>
                    <s.icon size={16} className={s.color} />
                  </div>
                  <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Featured Courses */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Featured Courses</h2>
                <p className="text-white/40 text-sm mt-0.5">Top picks for BFSI professionals</p>
              </div>
              <Link href="/courses" className="flex items-center gap-1 text-gold-400 text-sm hover:text-gold-500 font-medium">
                View all <ChevronRight size={15} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>

          {/* Latest Policy Updates */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Latest Policy Updates</h2>
                <p className="text-white/40 text-sm mt-0.5">Regulatory & compliance briefings</p>
              </div>
              <Link href="/policies" className="flex items-center gap-1 text-gold-400 text-sm hover:text-gold-500 font-medium">
                View all <ChevronRight size={15} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {policyVideos.slice(0, 2).map(pv => (
                <Link key={pv.id} href={`/policies`} className="block group">
                  <div className="card-glow rounded-xl p-5 bg-navy-800/60 flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center">
                      <Shield size={20} className="text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`badge text-[10px] mb-2 ${pv.tagColor}`}>{pv.tag}</span>
                      <h3 className="text-sm font-medium text-white group-hover:text-gold-400 transition-colors leading-snug mb-1">
                        {pv.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-white/30">
                        <span>{pv.date}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {pv.duration}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Active Promotions */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Active Promotions</h2>
                <p className="text-white/40 text-sm mt-0.5">Limited-time offers for your team</p>
              </div>
              <Link href="/promotions" className="flex items-center gap-1 text-gold-400 text-sm hover:text-gold-500 font-medium">
                View all <ChevronRight size={15} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {promotions.map(promo => (
                <div key={promo.id} className={`card-glow rounded-xl p-5 bg-gradient-to-br ${promo.gradient} border border-white/5`}>
                  <span className="badge bg-white/10 text-white/70 text-[10px] mb-3">{promo.badge}</span>
                  <h3 className="font-display text-lg font-bold text-white mb-1">{promo.title}</h3>
                  <p className="text-xs text-white/50 mb-4 leading-relaxed">{promo.subtitle}</p>
                  <Link href="/promotions" className="text-xs text-gold-400 font-medium hover:underline">
                    {promo.cta} →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  )
}
