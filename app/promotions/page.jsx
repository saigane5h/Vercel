import { policyVideos } from '@/lib/data'
import { Gift, ChevronRight, Zap, Play, Shield } from 'lucide-react'
import Link from 'next/link'

const offers = [
  { id: 1, title: '10% Discount on First Year Premium', subtitle: 'For new health policy buyers', tag: 'Offer', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', duration: '0:30' },
  { id: 2, title: 'No-Claim Bonus — Up to 50% Sum Insured Boost', subtitle: 'Stay healthy, get rewarded', tag: 'Reward', thumbnail: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=600&q=80', duration: '0:45' },
  { id: 3, title: 'Family Floater — Add 2 Members Free', subtitle: 'Limited period offer', tag: 'Bundle', thumbnail: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&q=80', duration: '0:40' },
  { id: 4, title: 'Annual Health Check-up Included — Zero Extra Cost', subtitle: 'Free with all plans', tag: 'Benefit', thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80', duration: '0:35' },
]

export default function OffersPage() {
  return (
    <div>
      <div className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Gift size={20} className="text-red mb-2" />
          <h1 className="font-display text-3xl font-bold text-white mb-1">Offers & Rewards</h1>
          <p className="text-white/50 text-sm">Discounts, cashback, and benefits on health insurance plans</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-2xl overflow-hidden hero-bg mb-10 border border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(227,24,55,0.2),transparent_60%)]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-7 py-9">
            <div>
              <div className="inline-flex items-center gap-2 bg-red/15 border border-red/25 rounded-full px-3 py-1 mb-3">
                <Zap size={12} className="text-red" />
                <span className="text-xs text-red font-bold uppercase tracking-wide">Featured Offer</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">{offers[0].title}</h2>
              <p className="text-white/50 text-sm">{offers[0].subtitle}</p>
            </div>
            <div className="flex-shrink-0">
              <button className="btn-red px-7 py-3 text-sm inline-flex items-center gap-2">Claim Offer <ChevronRight size={16} /></button>
            </div>
          </div>
        </div>

        <h2 className="font-display text-xl font-bold text-navy mb-5">All Offers & Benefits</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {offers.map(r => (
            <div key={r.id} className="card overflow-hidden group cursor-pointer">
              <div className="relative h-40 overflow-hidden">
                <img src={r.thumbnail} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-red flex items-center justify-center"><Play size={15} className="text-white ml-0.5" /></div>
                </div>
                <span className="absolute top-2 left-2 badge bg-red text-white text-[9px]">{r.tag}</span>
                <span className="absolute bottom-2 right-2 bg-black/60 rounded text-[10px] text-white px-1.5 py-0.5">{r.duration}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-navy text-sm leading-snug group-hover:text-red transition-colors mb-1 line-clamp-2">{r.title}</h3>
                <p className="text-xs text-gray-400">{r.subtitle}</p>
                <button className="mt-3 text-red text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">View Details <ChevronRight size={12} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 rounded-xl bg-gray-100 border border-gray-200 text-center">
          <p className="text-sm text-gray-500">All offers subject to terms and conditions. Contact your advisor for eligibility details.</p>
        </div>
      </div>
    </div>
  )
}
