'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Play, Menu, X, Search } from 'lucide-react'

const navLinks = [
  { href: '/academy', label: 'Home' },
  { href: '/courses', label: 'Guides' },
  { href: '/policies', label: 'Updates' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/academy" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-md bg-red flex items-center justify-center">
              <span className="text-white font-extrabold text-base leading-none">H</span>
            </div>
            <div className="leading-tight hidden sm:block">
              <span className="block font-bold text-navy text-xs tracking-tight">HDFC Life</span>
              <span className="block font-bold text-red text-xs tracking-tight -mt-0.5">Academy</span>
            </div>
            <div className="leading-tight sm:hidden">
              <span className="block font-bold text-red text-sm tracking-tight">HDFC Academy</span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-sm relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search life insurance topics…"
              className="w-full bg-gray-100 border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-red/40 focus:bg-white transition-all"
            />
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname === link.href ? 'text-red bg-red/5' : 'text-gray-600 hover:text-navy hover:bg-gray-100'}`}>
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="ml-1 text-sm font-medium text-gray-600 hover:text-red transition-colors px-3 py-2">Login</Link>
            <Link href="/portal" className="text-sm font-semibold text-white bg-red hover:bg-red-dark transition-colors px-4 py-2 rounded-lg">My Policies</Link>
          </nav>

          <button className="md:hidden text-gray-600 hover:text-navy" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search life insurance topics…"
              className="w-full bg-gray-100 border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm text-gray-600 focus:outline-none" />
          </div>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${pathname === link.href ? 'text-red bg-red/5' : 'text-gray-600 hover:text-navy'}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-600">Login</Link>
          <Link href="/portal" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-red">My Policies</Link>
        </div>
      )}
    </header>
  )
}
