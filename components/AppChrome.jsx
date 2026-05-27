'use client'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Routes that supply their own header/footer (no academy chrome).
const BARE_ROUTES = ['/login', '/portal']

export default function AppChrome({ children }) {
  const pathname = usePathname()
  const bare = BARE_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'))

  if (bare) return <main>{children}</main>

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
