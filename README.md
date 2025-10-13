# Layer Moon Full v4
- Front site with logo, EN/中文 toggle, nav
- Admin at /admin (access code from env or 'lj861201')
- Inventory, Portfolio links, Inbox
- Supabase persistence; API has safe fallbacks
- Health route at /api/health

## Setup
1) Create Supabase project, run `supabase.sql` in SQL Editor.
2) Set env vars in Vercel: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_ACCESS_CODE=lj861201
3) Deploy.
