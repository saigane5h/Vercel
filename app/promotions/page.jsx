import { promotions } from '@/lib/data'
import { TrendingUp, Calendar, ChevronRight, Zap, Tag } from 'lucide-react'
import Link from 'next/link'

export default function PromotionsPage() {
  return (
    <div>
      {/* Header */}
      <div className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-red/20 border border-red/30 flex items-center justify-center">
              <Tag size={18} className="text-red" />
            </div>
            <div>
              <p className="text-red text-xs font-semibold uppercase tracking-wider">Offers</p>
              <h1 className="font-display text-3xl font-bold text-white">Promotions</h1>
            </div>
          </div>
          <p className="text-white/55 mt-2">Limited-time deals and course bundles for BFSI teams</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured promo */}
        <div className="relative rounded-2xl overflow-hidden hero-bg border border-white/5 mb-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(227,24,55,0.2),transparent_60%)]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-red/20 border border-red/30 rounded-full px-3 py-1 mb-4">
                <Zap size={13} className="text-red" />
                <span className="text-xs text-red font-semibold uppercase tracking-wide">Featured Deal</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">{promotions[0].title}</h2>
              <p className="text-white/55 max-w-lg leading-relaxed">{promotions[0].description}</p>
              <div className="flex items-center gap-2 mt-4 text-sm text-white/40">
                <Calendar size={13} /> Expires: <span className="text-white/70">{promotions[0].expiresAt}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/courses" className="btn-red px-8 py-3.5 text-base inline-flex items-center gap-2 whitespace-nowrap">
                {promotions[0].cta} <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* All offers */}
        <h2 className="font-display text-2xl font-bold text-navy mb-6 section-title">All Offers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map(promo => (
            <div key={promo.id} className="card p-6 flex flex-col">
              <span className="badge bg-red/10 text-red w-fit mb-4">{promo.badge}</span>
              <h3 className="font-display text-xl font-bold text-navy mb-1">{promo.title}</h3>
              <p className="text-red text-sm font-semibold mb-3">{promo.subtitle}</p>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">{promo.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar size={11} /> Expires {promo.expiresAt}
                </div>
                <Link href="/courses" className="text-red text-sm font-semibold hover:text-red-dark flex items-center gap-1 transition-colors">
                  {promo.cta} <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 rounded-xl bg-gray-100 border border-gray-200 text-center">
          <p className="text-sm text-gray-500">All promotions are subject to availability and terms. Contact your account manager for corporate pricing.</p>
        </div>
      </div>
    </div>
  )
}
