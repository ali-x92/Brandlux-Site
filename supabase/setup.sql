-- One-shot setup for a fresh Supabase project (zupjwqtzhckpfguhzqnq).
-- This is the net result of everything in supabase/migrations/ — paste it once into
-- the Supabase SQL editor and run it. Safe to re-run only if the tables are absent.

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
WITH CHECK (
  char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send a contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 80
  AND char_length(message) BETWEEN 1 AND 1000
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- ---------------------------------------------------------------------------
-- EMAIL NOTIFICATIONS + AUTO-REPLIES
-- Fires supabase/functions/form-notify on every form submission.
-- Before running this block, replace REPLACE_WEBHOOK_SECRET below with the same
-- long random string you save as the WEBHOOK_SECRET edge-function secret:
--   npx supabase secrets set WEBHOOK_SECRET=<same-string> RESEND_API_KEY=<key>
-- Safe to run before the function exists: a failed pg_net call does not affect
-- the insert. Inspect outcomes with:
--   select id, status_code, error_msg, created from net._http_response order by created desc;
-- ---------------------------------------------------------------------------

create extension if not exists pg_net;

create or replace function public.notify_form_emails()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url     := 'https://zupjwqtzhckpfguhzqnq.supabase.co/functions/v1/form-notify',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer REPLACE_WEBHOOK_SECRET'
    ),
    body    := jsonb_build_object(
      'table',     TG_TABLE_NAME,
      'schema',    TG_TABLE_SCHEMA,
      'operation', TG_OP,
      'record',    to_jsonb(NEW)
    ),
    timeout_milliseconds := 10000
  );
  return new;
end $$;

drop trigger if exists wishlist_signup_email on public.wishlist_signups;
create trigger wishlist_signup_email
  after insert on public.wishlist_signups
  for each row execute function public.notify_form_emails();

drop trigger if exists contact_message_email on public.contact_messages;
create trigger contact_message_email
  after insert on public.contact_messages
  for each row execute function public.notify_form_emails();
