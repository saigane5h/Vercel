import Link from 'next/link'
import { BookOpen, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red flex items-center justify-center">
                <BookOpen size={16} className="text-white" />
              </div>
              <div className="leading-tight">
                <span className="block font-bold text-white text-sm">Insurance</span>
                <span className="block font-bold text-red text-sm -mt-0.5">Learning Hub</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Professional BFSI learning platform — empowering insurance professionals across India.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Learn</h4>
            <ul className="space-y-2.5">
              {['Life Insurance', 'Health Insurance', 'Motor Insurance', 'IRDAI Compliance', 'Bancassurance'].map(t => (
                <li key={t}><Link href="/courses" className="text-white/50 text-sm hover:text-red transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5">
              {[['Courses', '/courses'], ['Policy Updates', '/policies'], ['Promotions', '/promotions']].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-white/50 text-sm hover:text-red transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <Mail size={14} className="text-red flex-shrink-0" /> support@learninghub.in
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <Phone size={14} className="text-red flex-shrink-0" /> 1800-XXX-XXXX
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© 2025 Insurance Learning Hub. All rights reserved.</p>
          <p className="text-white/30 text-xs">IRDAI Compliant · BFSI Certified Platform</p>
        </div>
      </div>
    </footer>
  )
}
