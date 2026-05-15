import Link from 'next/link'
import { BookOpen, Shield, TrendingUp, Award, Play, ChevronRight, Star, Users, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-bg noise min-h-[92vh] flex items-center overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="fade-up fade-up-1 inline-flex items-center gap-2 border border-gold-400/20 bg-gold-400/5 rounded-full px-4 py-2 mb-8">
              <Shield size={14} className="text-gold-400" />
              <span className="text-xs font-medium text-gold-400 tracking-wide uppercase">BFSI Certified Learning Platform</span>
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-2 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight mb-6">
              <span className="text-white">Master Insurance.</span>
              <br />
              <span className="shimmer-gold">Lead the Industry.</span>
            </h1>

            <p className="fade-up fade-up-3 text-lg text-white/55 leading-relaxed max-w-xl mb-10">
              The professional learning platform built for BFSI teams. Structured courses, 
              regulatory updates, and expert-led videos — all in one secure hub.
            </p>

            {/* CTAs */}
            <div className="fade-up fade-up-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-gold-400 text-navy-900 px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-gold-500 transition-all hover:shadow-lg hover:shadow-gold-400/20 hover:-translate-y-0.5"
              >
                Access Your Courses
                <ChevronRight size={18} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white px-7 py-3.5 rounded-xl font-medium text-base hover:border-white/30 hover:bg-white/5 transition-all"
              >
                <Play size={16} className="text-gold-400" />
                See How It Works
              </a>
            </div>

            {/* Social proof */}
            <div className="fade-up fade-up-4 flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['bg-blue-400', 'bg-gold-400', 'bg-green-400', 'bg-purple-400'].map((c, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-navy-900`} />
                  ))}
                </div>
                <span className="text-sm text-white/50">10,000+ learners</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-gold-400 text-gold-400" />)}
                <span className="text-sm text-white/50 ml-1">4.9 rating</span>
              </div>
              <div className="text-sm text-white/50">IRDAI Compliant Content</div>
            </div>
          </div>
        </div>

        {/* Scrolling ticker */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-navy-800/50 py-3 overflow-hidden">
          <div className="flex gap-12 animate-[scroll_20s_linear_infinite] whitespace-nowrap">
            {['Life Insurance', 'Health Insurance', 'Motor Insurance', 'IRDAI Compliance', 'Bancassurance', 'Claims Management', 'Risk Assessment', 'Policy Underwriting'].map((t, i) => (
              <span key={i} className="text-xs text-white/30 uppercase tracking-widest flex items-center gap-3">
                <span className="text-gold-400">◆</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/5 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Expert Courses', icon: BookOpen },
              { value: '200+', label: 'Video Lessons', icon: Play },
              { value: '10K+', label: 'Professionals Trained', icon: Users },
              { value: '98%', label: 'Completion Rate', icon: Award },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon size={20} className="text-gold-400/60" />
                </div>
                <div className="font-display text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <p className="text-gold-400 text-sm font-medium uppercase tracking-widest mb-3">Platform Features</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything your team needs
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            From regulatory training to sales enablement — structured learning for every BFSI role.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              title: 'Structured Courses',
              desc: 'Curated learning paths for Life, Health, General Insurance, and Regulatory tracks.',
              color: 'text-gold-400',
              bg: 'bg-gold-400/10 border-gold-400/20',
            },
            {
              icon: Play,
              title: 'Individual Video Lessons',
              desc: 'Bite-sized expert videos you can watch at your own pace, on any device.',
              color: 'text-blue-400',
              bg: 'bg-blue-400/10 border-blue-400/20',
            },
            {
              icon: TrendingUp,
              title: 'Promotions & Offers',
              desc: 'Exclusive deals on course bundles and team learning packages.',
              color: 'text-green-400',
              bg: 'bg-green-400/10 border-green-400/20',
            },
            {
              icon: Shield,
              title: 'Policy Updates',
              desc: 'Stay ahead with IRDAI circulars, regulatory changes, and compliance briefings.',
              color: 'text-red-400',
              bg: 'bg-red-400/10 border-red-400/20',
            },
            {
              icon: Award,
              title: 'BFSI Certification',
              desc: 'Industry-recognised completion certificates for every course you finish.',
              color: 'text-purple-400',
              bg: 'bg-purple-400/10 border-purple-400/20',
            },
            {
              icon: Clock,
              title: 'Learn at Your Pace',
              desc: 'Access content anytime. Bookmark, replay, and track your progress seamlessly.',
              color: 'text-cyan-400',
              bg: 'bg-cyan-400/10 border-cyan-400/20',
            },
          ].map((f, i) => (
            <div key={i} className="card-glow rounded-2xl p-6 bg-navy-800/60">
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${f.bg} mb-4`}>
                <f.icon size={20} className={f.color} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-gold-400/15" style={{ background: 'linear-gradient(135deg, #0F2040 0%, #060D1F 100%)' }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(240,180,41,0.12),transparent_60%)]" />
          <div className="relative px-8 py-14 md:py-16 text-center">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to level up your <span className="text-gold-400">BFSI knowledge?</span>
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of insurance professionals already learning on the platform.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gold-400 text-navy-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-gold-500 transition-all hover:shadow-xl hover:shadow-gold-400/25 hover:-translate-y-1"
            >
              Sign In & Start Learning
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-gold-400" />
            <span className="font-display text-sm text-white/60">Insurance Learning Hub</span>
          </div>
          <p className="text-xs text-white/25">© 2025 Insurance Learning Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
