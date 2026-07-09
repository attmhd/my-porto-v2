create table if not exists public.portfolio_state (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

-- Add GIN index for efficient JSONB querying (Best Practice: advanced-jsonb-indexing)
create index if not exists portfolio_state_payload_idx on public.portfolio_state using gin (payload);

-- Add index on updated_at for sorting (Best Practice: query-missing-indexes)
create index if not exists portfolio_state_updated_at_idx on public.portfolio_state (updated_at);

alter table public.portfolio_state enable row level security;

-- Refine RLS policies for clarity and role targeting (Best Practice: security-rls-basics)

-- Public can read portfolio state
drop policy if exists "Public can read portfolio state" on public.portfolio_state;
create policy "Public can read portfolio state"
on public.portfolio_state
for select
to anon, authenticated
using (true);

-- Explicit write policies (Warning: Wide-open for demo purposes)
-- In production, restrict these to specific authenticated users.
drop policy if exists "Public can insert portfolio state" on public.portfolio_state;
create policy "Public can insert portfolio state"
on public.portfolio_state
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public can update portfolio state" on public.portfolio_state;
create policy "Public can update portfolio state"
on public.portfolio_state
for update
to anon, authenticated
using (true)
with check (true);

-- Delete policy is implicitly denied (Best Practice: security-rls-basics)
-- Only service_role can delete by default unless a policy is added.
