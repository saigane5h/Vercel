import Link from 'next/link'
import CourseCard from '@/components/CourseCard'
import { courses, policyVideos, promotions, stats } from '@/lib/data'
import { Play, ChevronRight, Shield, Award, BookOpen, TrendingUp, Clock, Calendar, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const featuredCourses = courses.slice(0, 3)

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-bg relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-navy-700/40 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="fade-up fade-up-1 inline-flex items-center gap-2 bg-red/15 border border-red/30 rounded-full px-4 py-1.5 mb-6">
                <Shield size={13} className="text-red" />
                <span className="text-xs font-semibold text-red uppercase tracking-wider">BFSI Certified Platform</span>
              </div>

              <h1 className="fade-up fade-up-2 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                Learn Insurance.<br />
                <span className="shimmer-red">Lead the Market.</span>
              </h1>

              <p className="fade-up fade-up-3 text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                India's professional BFSI learning platform — structured courses, IRDAI compliance videos, and expert-led training for every insurance career stage.
              </p>

              <div className="fade-up fade-up-4 flex flex-wrap gap-4">
                <Link href="/courses" className="btn-red px-7 py-3.5 text-base inline-flex items-center gap-2">
                  Explore Courses <ChevronRight size={18} />
                </Link>
                <Link href="/policies" className="btn-outline px-7 py-3.5 text-base inline-flex items-center gap-2">
                  <Play size={16} /> Policy Updates
                </Link>
              </div>

              {/* Stats row */}
              <div className="fade-up fade-up-4 grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10">
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-white/45 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — course preview cards */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="grid grid-cols-2 gap-4 opacity-90">
                {courses.slice(0, 4).map((course, i) => (
                  <div key={course.id} className={`bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 ${i === 1 ? 'mt-6' : ''} ${i === 3 ? '-mt-6' : ''}`}>
                    <img src={course.thumbnail} alt={course.title} className="w-full h-24 object-cover rounded-lg mb-3" />
                    <p className="text-xs font-semibold text-red mb-1">{course.category}</p>
                    <p className="text-white text-sm font-medium leading-snug line-clamp-2">{course.title}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-white/40 text-xs">
                      <Clock size={10} />{course.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="border-t border-white/10 bg-navy-800/60 py-3">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-x-10 gap-y-1 items-center">
            {['Life Insurance', 'Health Insurance', 'Motor Insurance', 'IRDAI Compliance', 'Bancassurance', 'Claims Management', 'Risk Assessment', 'Policy Underwriting'].map((t, i) => (
              <span key={i} className="text-xs text-white/30 uppercase tracking-widest flex items-center gap-2">
                <span className="text-red text-[8px]">●</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-red text-sm font-semibold uppercase tracking-wider mb-1">Learn at your pace</p>
            <h2 className="font-display text-3xl font-bold text-navy section-title">Featured Courses</h2>
          </div>
          <Link href="/courses" className="hidden sm:flex items-center gap-1 text-red text-sm font-semibold hover:gap-2 transition-all">
            View all courses <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/courses" className="btn-red px-6 py-2.5 text-sm inline-flex items-center gap-1.5">
            View all courses <ChevronRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── WHY LEARN HERE ───────────────────────────────────── */}
      <section className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-red text-sm font-semibold uppercase tracking-wider mb-1">Why choose us</p>
            <h2 className="font-display text-3xl font-bold text-navy">Everything your team needs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: 'Structured Learning', desc: 'Curated paths for Life, Health, Motor, and Regulatory tracks.', color: 'bg-red/10 text-red' },
              { icon: Play, title: 'Expert Videos', desc: 'Bite-sized lessons from seasoned BFSI professionals.', color: 'bg-blue-100 text-blue-600' },
              { icon: Shield, title: 'IRDAI Compliant', desc: 'All content aligned with current regulatory guidelines.', color: 'bg-green-100 text-green-700' },
              { icon: Award, title: 'Certifications', desc: 'Industry-recognised completion certificates for every course.', color: 'bg-purple-100 text-purple-700' },
            ].map((f, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-red/20 hover:shadow-md transition-all">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${f.color} mb-4`}>
                  <f.icon size={22} />
                </div>
                <h3 className="font-semibold text-navy mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POLICY UPDATES ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-red text-sm font-semibold uppercase tracking-wider mb-1">Stay compliant</p>
            <h2 className="font-display text-3xl font-bold text-navy section-title">Policy Updates</h2>
          </div>
          <Link href="/policies" className="hidden sm:flex items-center gap-1 text-red text-sm font-semibold hover:gap-2 transition-all">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {policyVideos.slice(0, 4).map(pv => (
            <Link href="/policies" key={pv.id} className="block group">
              <div className="card p-5 flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red/10 border border-red/15 flex items-center justify-center">
                  <Shield size={20} className="text-red" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`badge ${pv.tagColor}`}>{pv.tag}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={10} /> {pv.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-navy group-hover:text-red transition-colors leading-snug mb-1">
                    {pv.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={10} /> {pv.duration}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PROMOTIONS BANNER ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-2xl overflow-hidden hero-bg border border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,24,55,0.2),transparent_60%)]" />
          <div className="relative px-8 py-10 md:flex items-center justify-between gap-8">
            <div>
              <span className="badge bg-red/20 text-red mb-3">Limited Time</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                {promotions[0].title}
              </h2>
              <p className="text-white/55 text-base max-w-lg">{promotions[0].description}</p>
            </div>
            <div className="mt-6 md:mt-0 flex-shrink-0">
              <Link href="/promotions" className="btn-red px-7 py-3.5 text-base inline-flex items-center gap-2 whitespace-nowrap">
                {promotions[0].cta} <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL COURSES CTA ──────────────────────────────────── */}
      <section className="bg-gray-100 border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-red text-sm font-semibold uppercase tracking-wider mb-1">Full catalog</p>
              <h2 className="font-display text-3xl font-bold text-navy section-title">More Courses</h2>
            </div>
            <Link href="/courses" className="hidden sm:flex items-center gap-1 text-red text-sm font-semibold hover:gap-2 transition-all">
              Browse all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(3).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
