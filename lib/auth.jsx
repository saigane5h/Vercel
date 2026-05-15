'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext(null)

// Demo credentials — replace with real auth (NextAuth, Supabase, etc.)
const DEMO_USERS = [
  { email: 'admin@insurancehub.com', password: 'admin123', name: 'Admin User', role: 'admin' },
  { email: 'learner@insurancehub.com', password: 'learn123', name: 'Demo Learner', role: 'learner' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('ilh_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (found) {
      const userData = { email: found.email, name: found.name, role: found.role }
      setUser(userData)
      localStorage.setItem('ilh_user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password.' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ilh_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
