DROP POLICY "Anyone can join the wishlist" ON public.wishlist_signups;

CREATE POLICY "Anyone can join the wishlist"
ON public.wishlist_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);
