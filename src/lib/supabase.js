import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Gracefully handle missing env vars — show a helpful message instead of crashing
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    '[EcoSphere] Missing Supabase environment variables.\n' +
    'Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel project settings.'
  )
}

export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_KEY || 'placeholder-key'
)
