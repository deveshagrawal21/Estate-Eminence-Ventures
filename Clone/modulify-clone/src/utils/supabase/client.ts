import { createBrowserClient } from '@supabase/ssr'

// Define fallback values in case environment variables are not available
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tybjzkzhaxsimxvtwyrl.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5Ymp6a3poYXhzaW14dnR3eXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2OTUxNjIsImV4cCI6MjA1ODI3MTE2Mn0.mD_-lNizJ2JLaYhmsKpPZTZEDe8zXMA6HWIbImWPcvE'

export function createClient() {
  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  )
}
