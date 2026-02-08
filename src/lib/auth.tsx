'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { register as apiRegister, login as apiLogin, logout as apiLogout } from './api'

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // On mount, restore auth state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token')
      const storedUser = localStorage.getItem('user')
      
      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          setIsAuthenticated(true)
        } catch (e) {
          console.error('Failed to parse stored user:', e)
          localStorage.removeItem('access_token')
          localStorage.removeItem('user')
        }
      }
    }
    setLoading(false)
  }, [])

  // REGISTER (uses central api helpers which honor NEXT_PUBLIC_API_URL)
  const register = async (email: string, password: string) => {
    setLoading(true)
    try {
      const data = await apiRegister(email, password)
      // backend returns { access_token, token_type, user }
      if (typeof window !== 'undefined' && data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
      setUser(data.user)
      setIsAuthenticated(true)
      router.push('/dashboard')
    } catch (err) {
      setIsAuthenticated(false)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // LOGIN
  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const data = await apiLogin(email, password)
      if (typeof window !== 'undefined' && data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
      setUser(data.user)
      setIsAuthenticated(true)
      router.push('/dashboard')
    } catch (err) {
      setIsAuthenticated(false)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setUser(null)
    setIsAuthenticated(false)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }
    try {
      await apiLogout()
    } catch {}
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
