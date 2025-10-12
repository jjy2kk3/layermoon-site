import { createClient } from "@supabase/supabase-js";
export function getAdminClient(){
  const url = process.env.SUPABASE_URL as string;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  if (!url || !key) { throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"); }
  return createClient(url, key, { auth: { persistSession: false } });
}
export function isAllowed(code: string | null){
  return !!(code && process.env.ADMIN_ACCESS_CODE && code === process.env.ADMIN_ACCESS_CODE);
}
