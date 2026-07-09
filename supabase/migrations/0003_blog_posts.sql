-- Create posts table
create table if not exists public.posts (
  slug text primary key,
  title text not null,
  date text not null,
  description text not null,
  tags text[] not null default '{}',
  content text not null,
  reading_time integer not null default 1,
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.posts enable row level security;

-- Setup SELECT policy (accessible by everyone)
create policy "Allow public read access to posts" on public.posts for select to anon, authenticated using (true);

-- Setup modification policies (only authenticated users can insert, update, or delete)
create policy "Allow authenticated insert on posts" on public.posts for insert to authenticated with check (true);
create policy "Allow authenticated update on posts" on public.posts for update to authenticated using (true) with check (true);
create policy "Allow authenticated delete on posts" on public.posts for delete to authenticated using (true);
