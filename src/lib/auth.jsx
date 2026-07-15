import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { insforge } from './insforge'

const AuthContext = createContext({ user: null, profile: null, loading: true })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId) => {
    try {
      const { data, error } = await insforge.database
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()
      if (!error && data) {
        setProfile(data)
      }
    } catch (err) {
      // Profile table may not exist yet — silently continue
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function hydrateAuth() {
      try {
        const { data, error } = await insforge.auth.getCurrentUser()
        if (cancelled) return

        if (error || !data?.user) {
          setUser(null)
          setProfile(null)
        } else {
          setUser(data.user)
          await fetchProfile(data.user.id)
        }
      } catch (err) {
        // Network error during hydration — treat as unauthenticated
        if (cancelled) return
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    }

    void hydrateAuth()
    return () => {
      cancelled = true
    }
  }, [fetchProfile])

  const signOut = useCallback(async () => {
    await insforge.auth.signOut()
    setUser(null)
    setProfile(null)
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const { data, error } = await insforge.auth.getCurrentUser()
      if (!error && data?.user) {
        setUser(data.user)
        await fetchProfile(data.user.id)
        return data.user
      }
      return null
    } catch (err) {
      return null
    }
  }, [fetchProfile])

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
