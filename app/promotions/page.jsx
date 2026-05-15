'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { promotions } from '@/lib/data'
import { TrendingUp, Calendar, ChevronRight, Zap } from 'lucide-react'

export default function PromotionsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <div className="border-b border-white/5 bg-navy-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                <TrendingUp size={18} className="text-green-400" />
              </div>
              <h1 className="font-display text-4xl font-bold text-white">Promotions</h1>
            </div>
            <p className="text-white/40">Limited-time offers and course bundles for BFSI teams</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Featured promo banner */}
          <div className="relative rounded-3xl overflow-hidden mb-10 border border-gold-400/20" style={{ background: 'linear-gradient(135deg, #1a2a4a 0%, #060D1F 100%)' }}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(240,180,41,0.15),transparent_60%)]" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-gold-400/15 border border-gold-400/20 rounded-full px-3 py-1 mb-4">
                  <Zap size={13} className="text-gold-400" />
                  <span className="text-xs text-gold-400 font-semibold uppercase tracking-wide">Featured Deal</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                  {promotions[0].title}
                </h2>
                <p className="text-white/50 text-base max-w-lg leading-relaxed">
                  {promotions[0].description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-sm text-white/40">
                  <Calendar size={13} />
                  <span>Expires: <span className="text-white/60">{promotions[0].expiresAt}</span></span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button className="flex items-center gap-2 bg-gold-400 text-navy-900 px-7 py-3.5 rounded-xl font-bold text-base hover:bg-gold-500 transition-all hover:shadow-lg hover:shadow-gold-400/20 whitespace-nowrap">
                  {promotions[0].cta} <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* All promotions grid */}
          <h2 className="font-display text-2xl font-bold text-white mb-6">All Offers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo, i) => (
              <div key={promo.id} className={`card-glow rounded-2xl p-7 bg-gradient-to-br ${promo.gradient} border border-white/8 flex flex-col`}>
                <span className="badge bg-white/10 text-white/60 text-[10px] w-fit mb-4">{promo.badge}</span>
                <h3 className="font-display text-xl font-bold text-white mb-1">{promo.title}</h3>
                <p className="text-white/60 text-sm font-medium mb-3">{promo.subtitle}</p>
                <p className="text-white/40 text-sm leading-relaxed flex-1 mb-5">{promo.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/8">
                  <div className="flex items-center gap-1.5 text-xs text-white/30">
                    <Calendar size={11} />
                    <span>Expires {promo.expiresAt}</span>
                  </div>
                  <button className="text-gold-400 text-sm font-semibold hover:text-gold-500 flex items-center gap-1 transition-colors">
                    {promo.cta} <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-10 p-4 rounded-xl bg-navy-800/40 border border-white/5 text-center">
            <p className="text-sm text-white/30">
              All promotions are subject to availability and terms. Contact your account manager for corporate pricing.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
