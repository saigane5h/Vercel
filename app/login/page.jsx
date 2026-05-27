'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Calendar, RefreshCw } from 'lucide-react'

const TABS = ['Mobile No', 'Email ID', 'Policy No', 'Client ID']
const LANGS = ['English', 'हिन्दी', 'বাংলা', 'తెలుగు', 'தமிழ்', 'मराठी', 'ગુજરાતી', 'ਪੰਜਾਬੀ', 'മലയാളം', 'ಕನ್ನಡ']
const USEFUL_LINKS = [
  'DT Payout', 'Branch Locator', 'Become an advisor',
  'Pay Premium', 'Policy Servicing', 'Service Query - Chat',
  'Application Tracker', 'Buy Term Insurance Plan Online', 'Unit Prices',
  'Make a Claim', 'Escalations', 'Submit Life Certificate Online',
  'Maturity Payout',
]

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [tab, setTab] = useState('Mobile No')
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')
  const [captcha, setCaptcha] = useState('')

  const handleProceed = (e) => {
    e.preventDefault()
    login()
    router.push('/portal')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top logo bar */}
      <div className="border-b border-gray-200 px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="w-9 h-9 rounded bg-red flex items-center justify-center text-white font-extrabold">H</span>
          <span className="font-bold text-navy text-lg">HDFC Life</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* LEFT — login card */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex rounded-full bg-gray-100 p-1 mb-5">
            <button type="button" className="flex-1 py-2 rounded-full bg-red text-white text-sm font-semibold">Individual Login</button>
            <button type="button" className="flex-1 py-2 rounded-full text-gray-600 text-sm font-semibold">Special Life Login</button>
          </div>

          <div className="flex border-b border-gray-200 mb-5">
            {TABS.map(t => (
              <button key={t} type="button" onClick={() => setTab(t)}
                className={`flex-1 pb-2 text-sm font-medium ${tab === t ? 'text-red border-b-2 border-red' : 'text-gray-500'}`}>
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={handleProceed} className="space-y-5">
            <div>
              <label className="block text-xs text-gray-500 mb-1">{tab} <span className="text-red">*</span></label>
              <div className="flex gap-2">
                {tab === 'Mobile No' && <span className="text-gray-600 text-sm pt-2">+91</span>}
                <input value={mobile} onChange={e => setMobile(e.target.value)} required
                  placeholder={`Enter your ${tab}`}
                  className="flex-1 border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-red" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Date of Birth <span className="text-red">*</span></label>
              <div className="flex items-center border-b border-gray-300">
                <input value={dob} onChange={e => setDob(e.target.value)} required
                  placeholder="Please enter DOB of Policy Owner"
                  className="flex-1 py-2 text-sm focus:outline-none" />
                <Calendar size={16} className="text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Captcha <span className="text-red">*</span></label>
              <div className="flex items-center gap-3">
                <input value={captcha} onChange={e => setCaptcha(e.target.value)} required
                  placeholder="Please enter captcha"
                  className="flex-1 border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-red" />
                <span className="bg-gray-200 px-3 py-1 rounded font-mono font-bold tracking-widest text-gray-700 select-none">465988</span>
                <RefreshCw size={16} className="text-gray-400 cursor-pointer" />
              </div>
            </div>

            <button type="submit" className="w-full btn-red py-3">Proceed</button>
          </form>
        </div>

        {/* RIGHT — WhatsApp + useful links */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-navy mb-1">Now chat with our official WhatsApp bot Etty in your preferred language!</h2>
          <p className="text-sm text-red font-semibold mt-3 mb-2">Languages available are</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
            {LANGS.map(l => <span key={l}>✓ {l}</span>)}
          </div>
          <p className="text-sm text-gray-600">Simply text <b>&quot;Hi&quot;</b> to <span className="text-red font-semibold">+91 82918 90569</span> on WhatsApp.</p>

          <div className="border border-gray-200 rounded-lg p-4 mt-6">
            <p className="font-bold text-navy mb-3">USEFUL LINKS</p>
            <div className="grid sm:grid-cols-3 gap-y-2 text-sm">
              {USEFUL_LINKS.map(l => (
                <span key={l} className="text-red flex items-center gap-1">› {l}</span>
              ))}
              <Link href="/" className="text-red font-semibold flex items-center gap-1">› Academy</Link>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Questions about your policy? <a href="mailto:service@hdfclife.com" className="text-red underline">service@hdfclife.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
