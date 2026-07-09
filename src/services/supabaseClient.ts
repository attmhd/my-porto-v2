import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as
  | string
  | undefined;

let supabaseClient: SupabaseClient | null = null;

export const SUPABASE_PORTFOLIO_TABLE =
  (import.meta.env.VITE_SUPABASE_PORTFOLIO_TABLE as string | undefined) ??
  "portfolio_state";

export const SUPABASE_PORTFOLIO_ROW_ID =
  (import.meta.env.VITE_SUPABASE_PORTFOLIO_ROW_ID as string | undefined) ??
  "current";

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!);
  }

  return supabaseClient;
}
