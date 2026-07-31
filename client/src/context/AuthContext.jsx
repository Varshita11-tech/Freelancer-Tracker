import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, signupRequest } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('ft-user')
    if (saved) setUser(JSON.parse(saved))
    setLoading(false)
  }, [])

  const persist = (userData, token) => {
    setUser(userData)
    localStorage.setItem('ft-user', JSON.stringify(userData))
    if (token) {
      localStorage.setItem('ft-token', token)
    }
  }

  const login = async (credentials) => {
    const { user: userData, token } = await loginRequest(credentials)
    persist(userData, token)
    return userData
  }

  const signup = async (details) => {
    const { user: userData, token } = await signupRequest(details)
    persist(userData, token)
    return userData
  }

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates }
    persist(updated)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ft-user')
    localStorage.removeItem('ft-token')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
