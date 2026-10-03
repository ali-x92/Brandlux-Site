CREATE TABLE public.wishlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.wishlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the wishlist"
ON public.wishlist_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
