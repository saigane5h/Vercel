'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Calendar, RefreshCw, Info, Headphones, ChevronRight, ExternalLink } from 'lucide-react'

const TABS = ['Mobile No', 'Email ID', 'Policy No', 'Client ID']

const LANGS = [
  'English', 'हिन्दी', 'বাংলা', 'తెలుగు', 'தமிழ்',
  'मराठी', 'ગુજરાતી', 'ਪੰਜਾਬੀ', 'മലയാളം', 'ಕನ್ನಡ',
]

const USEFUL_LINKS = [
  'DT Payout', 'Branch Locator', 'Become an advisor',
  'Pay Premium', 'Policy Servicing', 'Service Query - Chat',
  'Application Tracker', 'Buy Term Insurance Plan Online', 'Unit Prices',
  'Make a Claim', 'Escalations', 'Submit Life Certificate Online',
  'Maturity Payout',
]

// Real QR pointing to the WhatsApp deep link in the screenshot
const QR_SRC =
  'https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=0&data=https://wa.me/918291890569?text=Hi'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [mode, setMode] = useState('individual') // individual | special
  const [tab, setTab] = useState('Mobile No')
  const [country] = useState('+91')
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [captchaCode, setCaptchaCode] = useState('811599')

  const ready = mobile.trim() && dob.trim() && captcha.trim()

  const refreshCaptcha = () => {
    setCaptchaCode(String(Math.floor(100000 + Math.random() * 900000)))
    setCaptcha('')
  }

  const handleProceed = (e) => {
    e.preventDefault()
    if (!ready) return
    login()
    router.push('/portal')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top logo bar */}
      <div className="border-b border-gray-200 px-6 py-4">
        <Link href="/academy" className="inline-flex items-center gap-2">
          <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-md bg-red text-white">
            <span className="font-extrabold text-[11px] leading-tight tracking-tight text-center">HDFC<br/>Life</span>
          </span>
          <span className="text-red italic text-[11px] font-semibold leading-none">Sar&apos;utha ke&nbsp;jiyo!</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-2 gap-8">

        {/* ── LEFT: login card ───────────────────────────── */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          {/* Individual / Special toggle */}
          <div className="relative flex rounded-full bg-gray-100 p-1 mb-5">
            <button
              type="button"
              onClick={() => setMode('individual')}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                mode === 'individual' ? 'bg-red text-white shadow' : 'text-gray-700'
              }`}>
              Individual Login
            </button>
            <button
              type="button"
              onClick={() => setMode('special')}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1.5 ${
                mode === 'special' ? 'bg-red text-white shadow' : 'text-gray-700'
              }`}>
              Special Life Login
              <Info size={13} className={mode === 'special' ? 'text-white' : 'text-gray-500'} />
            </button>
          </div>

          {/* Identifier tabs */}
          <div className="flex border-b border-gray-200 mb-3">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); setMobile('') }}
                className={`flex-1 pb-2.5 text-sm font-medium transition-colors ${
                  tab === t ? 'text-red border-b-2 border-red' : 'text-gray-500 hover:text-navy'
                }`}>
                {t}
              </button>
            ))}
          </div>

          <div className="flex justify-end mb-4">
            <button type="button" className="text-xs text-red font-medium hover:underline">
              Facing login Issues?
            </button>
          </div>

          <form onSubmit={handleProceed} className="space-y-6">
            {/* Country code + identifier */}
            {tab === 'Mobile No' ? (
              <div className="grid grid-cols-[80px_1fr] gap-4">
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">
                    Country Code <span className="text-red">*</span>
                  </label>
                  <input
                    value={country}
                    readOnly
                    className="w-full border-b border-gray-300 py-2 text-sm text-navy focus:outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">
                    Mobile No <span className="text-red">*</span>
                  </label>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    inputMode="numeric"
                    placeholder="Enter your Mobile No."
                    className="w-full border-b border-gray-300 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-red"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  {tab} <span className="text-red">*</span>
                </label>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  placeholder={`Enter your ${tab}`}
                  className="w-full border-b border-gray-300 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-red"
                />
              </div>
            )}

            {/* DOB */}
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                Date of Birth <span className="text-red">*</span>
              </label>
              <div className="flex items-center border-b border-gray-300 focus-within:border-red">
                <input
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  placeholder="Please enter DOB of Policy Owner"
                  className="flex-1 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none"
                />
                <Calendar size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Captcha */}
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                Captcha <span className="text-red">*</span>
              </label>
              <div className="flex items-end gap-3 border-b border-gray-300 focus-within:border-red">
                <input
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  required
                  placeholder="Please enter captcha"
                  className="flex-1 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none"
                />
                <span
                  className="select-none bg-gradient-to-b from-gray-700 to-gray-900 text-white font-bold tracking-[0.35em] text-base px-3 py-1.5 rounded-md italic skew-x-[-6deg] shadow-inner"
                  aria-label="Captcha code">
                  {captchaCode}
                </span>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="p-1 text-gray-400 hover:text-red"
                  aria-label="Refresh captcha">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>

            {/* Proceed */}
            <button
              type="submit"
              disabled={!ready}
              className={`w-full py-3 rounded-md font-semibold text-white transition-colors ${
                ready ? 'bg-red hover:bg-red-dark' : 'bg-[#A6B7CC] cursor-not-allowed'
              }`}>
              Proceed
            </button>
          </form>
        </div>

        {/* ── RIGHT: WhatsApp panel + Useful Links ───────────── */}
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-[260px]">
                <p className="font-bold text-navy text-[15px] leading-snug">
                  Now chat with our official{' '}
                  <span className="inline-flex items-center gap-1 text-[#25D366] font-bold">
                    <span className="w-5 h-5 rounded-full bg-[#25D366] inline-flex items-center justify-center text-white text-[10px]">W</span>
                    WhatsApp bot Etty
                  </span>{' '}
                  <span className="text-red">in your preferred language!</span>
                </p>

                <p className="text-red font-bold text-sm mt-4">Languages available are</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
                  {LANGS.map((l) => (
                    <span key={l} className="inline-flex items-center gap-1">
                      <span className="text-red">✓</span> {l}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <Headphones size={20} className="text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">
                    Simply text <b>&quot;Hi&quot;</b> to{' '}
                    <span className="text-red font-semibold whitespace-nowrap">+91 82918 90569</span>{' '}
                    <span className="inline-flex w-4 h-4 rounded-full bg-[#25D366] text-white text-[9px] items-center justify-center align-middle">W</span>
                    <br />
                    to send your policy queries via WhatsApp or Scan the QR code.
                  </p>
                </div>
              </div>

              {/* QR */}
              <div className="flex-shrink-0">
                <img
                  src={QR_SRC}
                  alt="Scan to chat on WhatsApp"
                  width={140}
                  height={140}
                  className="rounded"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
            </div>

            {/* USEFUL LINKS */}
            <div className="border-t border-gray-200 mt-6 pt-5">
              <p className="font-bold text-navy mb-3 inline-flex items-center gap-1">
                USEFUL LINKS <ExternalLink size={12} className="text-navy" />
              </p>
              <div className="grid sm:grid-cols-3 gap-y-2 text-sm">
                {USEFUL_LINKS.map((l) => (
                  <span key={l} className="text-red inline-flex items-center gap-1">
                    <ChevronRight size={12} /> {l}
                  </span>
                ))}
                <Link href="/academy" className="text-red font-semibold inline-flex items-center gap-1">
                  <ChevronRight size={12} /> Academy
                </Link>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 px-1">
            If you have any questions related to your policy, feel free to contact us at{' '}
            <a href="mailto:service@hdfclife.com" className="text-navy underline font-medium">
              service@hdfclife.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-10 py-4 px-6">
        <p className="text-xs text-gray-400">© Copyright HDFC Life Insurance company Limited.</p>
      </div>
    </div>
  )
}
