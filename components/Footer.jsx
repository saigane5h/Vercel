import Link from 'next/link'
import { Play, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red flex items-center justify-center">
                <Play size={14} className="text-white ml-0.5" />
              </div>
              <div className="leading-tight">
                <span className="block font-bold text-white text-xs">Tata AIA Life Insurance</span>
                <span className="block font-bold text-red text-xs -mt-0.5">Academy</span>
              </div>
            </div>
            <p className="text-white/45 text-xs leading-relaxed mb-3">
              India's most complete life insurance resource — videos, guides, tools and expert answers. Built so every Indian can make an informed decision about their cover.
            </p>
            <p className="text-white/30 text-xs italic">Because the best life insurance decision is an informed one. Start here.</p>
          </div>

          {/* Videos */}
          <div>
            <h4 className="font-semibold text-white text-xs mb-4 uppercase tracking-wider">Videos</h4>
            <ul className="space-y-2.5">
              {['Life basics', 'How claims work', 'Critical illness', 'Tax & life insurance', 'Riders & add-ons'].map(t => (
                <li key={t}><Link href="/courses" className="text-white/45 text-xs hover:text-red transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="font-semibold text-white text-xs mb-4 uppercase tracking-wider">Guides</h4>
            <ul className="space-y-2.5">
              {['Buying your first policy', 'Understanding your cover', 'Making a claim', 'Switching insurers'].map(t => (
                <li key={t}><Link href="/courses" className="text-white/45 text-xs hover:text-red transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-white text-xs mb-4 uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2.5">
              {['Cover calculator', 'Premium estimator', 'Protection gap tool', 'Plan comparison'].map(t => (
                <li key={t}><Link href="/courses" className="text-white/45 text-xs hover:text-red transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Updates + Contact */}
          <div>
            <h4 className="font-semibold text-white text-xs mb-4 uppercase tracking-wider">Updates</h4>
            <ul className="space-y-2.5 mb-6">
              {['IRDAI circulars', 'Government & budget', 'Market news', 'Product updates'].map(t => (
                <li key={t}><Link href="/policies" className="text-white/45 text-xs hover:text-red transition-colors">{t}</Link></li>
              ))}
            </ul>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/45 text-xs">
                <Mail size={12} className="text-red flex-shrink-0" /> support@tataaia-academy.in
              </div>
              <div className="flex items-center gap-2 text-white/45 text-xs">
                <Phone size={12} className="text-red flex-shrink-0" /> 1800-XXX-XXXX
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-white/25 text-xs leading-relaxed">
            Tata AIA Life Insurance Company Limited. IRDAI Registration No. 110. For informational purposes only — not a solicitation or offer to sell insurance products.
          </p>
          <p className="text-white/20 text-xs mt-2">© 2025 Tata AIA Life Insurance Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
