import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE__ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase structural environment URL or Anon Key variables.");
}

// This creates the client instance exactly once
export const supabase = createClient(supabaseUrl, supabaseAnonKey);