import { createClient } from '@supabase/supabase-js'

const DEFAULT_SUPABASE_URL = 'https://yklpsywdvlyeujmfbbbx.supabase.co'
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbHBzeXdkdmx5ZXVqbWZiYmJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMDUwMDMsImV4cCI6MjEwNjg4MTAwM30.xxs8dv72Ru7Rdtadi3eZ8p_HIzrKlWV9LXqIAajvqnM'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

