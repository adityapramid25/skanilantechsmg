import { createClient } from '@supabase/supabase-js';

// 1. Safe for Client-Side (NEXT_PUBLIC_ prefix)
// These variables are injected into the browser and can be used in Client Components.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Client-safe Supabase instance using the Anon Key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Server-Side Only (No prefix)
// This function returns a Supabase instance with the Service Role Key.
// WARNING: The Service Role Key bypasses Row Level Security (RLS).
// NEVER use this in a Client Component or expose it to the browser.
export const getServiceSupabase = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey) {
    throw new Error('Missing Supabase environment variable: SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
