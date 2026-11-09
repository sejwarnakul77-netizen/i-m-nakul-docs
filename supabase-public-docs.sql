-- Public read-only access for the standalone docs website.
-- This makes ALL existing rows in public.documents publicly readable.
-- Run only because every document in this table is intended to be public.
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON TABLE public.documents TO anon;
DROP POLICY IF EXISTS "Public can read all documents" ON public.documents;
CREATE POLICY "Public can read all documents"
ON public.documents FOR SELECT TO anon USING (true);
-- No INSERT, UPDATE, or DELETE permissions are granted to anon.