# Layer Moon Full v5
- Better LM Logo + nav
- Real EN/中文 toggle (context + localStorage)
- Admin at /admin (env code or fallback 'lj861201')
- Inventory, Portfolio links, Inbox
- Supabase persistence; API has safe fallbacks
- Health route at /api/health

## Setup
1) Supabase: create project, run `supabase.sql` in SQL Editor.
2) Vercel env:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - ADMIN_ACCESS_CODE=lj861201
3) Deploy and open /admin.
