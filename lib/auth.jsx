'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const DEMO_USER = {
  name: 'Vishal Eknath Bhilare',
  lastLogin: '28/04/2026',
}

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {}, ready: false })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('hdfc_auth') === '1') setUser(DEMO_USER)
    } catch {}
    setReady(true)
  }, [])

  const login = () => {
    try { localStorage.setItem('hdfc_auth', '1') } catch {}
    setUser(DEMO_USER)
  }
  const logout = () => {
    try { localStorage.removeItem('hdfc_auth') } catch {}
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
