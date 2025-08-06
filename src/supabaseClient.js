import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mzxsisnvwzuouxmfexud.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eHNpc252d3p1b3V4bWZleHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MjIxMzEsImV4cCI6MjA2OTQ5ODEzMX0.cRNtHDIHRS5VJEJ7QA4dt6KPNPAwM11khlA_3hC4xcU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
