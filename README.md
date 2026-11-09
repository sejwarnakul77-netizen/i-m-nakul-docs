# i.m.nakul — Public Docs

Standalone public Markdown viewer backed by the existing Supabase `public.documents` table.

## Setup
1. In the existing Supabase project, run `supabase-public-docs.sql` in SQL Editor.
2. Copy `.env.example` to `.env.local` and set the Supabase project URL and publishable/anon key.
3. Run `npm install`, then `npm run dev`.

## Deploy
Import this repository into Vercel and add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Set the project name as desired and deploy. Add `i.m.nakul.vercel.app` under Project Settings → Domains if available. Vercel assigns *.vercel.app URLs first-come, first-served; requested alias availability is not guaranteed.

## Security warning
The SQL grants anonymous SELECT on the documents table and creates a public-read policy for every row. This is appropriate only because you confirmed all documents in this table should be public. The app uses only the publishable/anon key; never put a service-role key in frontend environment variables. No write grants or policies are created for anon.