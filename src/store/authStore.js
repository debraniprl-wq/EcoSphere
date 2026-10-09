import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  session: null,
  loading: true,

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const profile = await get().fetchProfile(session.user.id)
      set({ user: session.user, session, profile, loading: false })
    } else {
      set({ loading: false })
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const profile = await get().fetchProfile(session.user.id)
        set({ user: session.user, session, profile })
      } else {
        set({ user: null, session: null, profile: null })
      }
    })
  },

  fetchProfile: async (userId) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      return data
    } catch {
      return null
    }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  signUp: async (email, password, fullName, company) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, company }
      }
    })
    if (error) throw error

    // Insert profile
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: fullName,
        company,
        role: 'ESG Manager',
        email
      })
    }

    return data
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null, profile: null })
  },

  updateProfile: async (updates) => {
    const user = get().user
    if (!user) return
    const { data } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()
    set({ profile: data })
    return data
  }
}))
