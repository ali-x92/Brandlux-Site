-- Email notifications + auto-replies for both forms.
-- Requires supabase/functions/form-notify deployed, with secrets RESEND_API_KEY
-- and WEBHOOK_SECRET, and the REPLACE_WEBHOOK_SECRET token below swapped for the
-- same value as WEBHOOK_SECRET. See supabase/setup.sql for the full comments.

create extension if not exists pg_net;

create or replace function public.notify_form_emails()
returns trigger
language plpgsql
security definer
set search_path = net, public
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
