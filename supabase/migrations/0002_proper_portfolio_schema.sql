-- Drop old table if appropriate or keep it for compatibility, but here we create the proper relational tables.

-- 1. Create user_info table
create table if not exists public.user_info (
  id text primary key default 'current',
  name text not null,
  role text not null,
  tagline text not null,
  about text not null,
  location text not null,
  email text not null,
  cv_url text not null,
  updated_at timestamptz not null default now()
);

-- 2. Create projects table
create table if not exists public.projects (
  id text primary key,
  title text not null,
  description text not null,
  technologies text[] not null default '{}',
  github_url text,
  demo_url text,
  category text not null,
  updated_at timestamptz not null default now()
);

-- 3. Create tools table
create table if not exists public.tools (
  id text primary key,
  slug text unique not null,
  title text not null,
  description text not null,
  github_url text,
  demo_url text,
  category text not null,
  features text[] not null default '{}',
  installation text not null,
  usage text not null,
  updated_at timestamptz not null default now()
);

-- 4. Create tech_stack table
create table if not exists public.tech_stack (
  name text primary key,
  icon_name text not null,
  category text not null,
  updated_at timestamptz not null default now()
);

-- 5. Create education table
create table if not exists public.education (
  id text primary key,
  institution text not null,
  degree text not null,
  year text not null,
  description text,
  updated_at timestamptz not null default now()
);

-- 6. Create certificates table
create table if not exists public.certificates (
  id text primary key,
  name text not null,
  issuer text not null,
  date text not null,
  url text not null,
  updated_at timestamptz not null default now()
);

-- 7. Create setup table
create table if not exists public.setup (
  id text primary key default 'current',
  hardware text not null,
  os text not null,
  code_editor text not null,
  updated_at timestamptz not null default now()
);

-- Enable RLS for all new tables
alter table public.user_info enable row level security;
alter table public.projects enable row level security;
alter table public.tools enable row level security;
alter table public.tech_stack enable row level security;
alter table public.education enable row level security;
alter table public.certificates enable row level security;
alter table public.setup enable row level security;

-- Setup SELECT policies (accessible by everyone: anon and authenticated)
create policy "Allow public read access to user_info" on public.user_info for select to anon, authenticated using (true);
create policy "Allow public read access to projects" on public.projects for select to anon, authenticated using (true);
create policy "Allow public read access to tools" on public.tools for select to anon, authenticated using (true);
create policy "Allow public read access to tech_stack" on public.tech_stack for select to anon, authenticated using (true);
create policy "Allow public read access to education" on public.education for select to anon, authenticated using (true);
create policy "Allow public read access to certificates" on public.certificates for select to anon, authenticated using (true);
create policy "Allow public read access to setup" on public.setup for select to anon, authenticated using (true);

-- Setup ALL modification policies (only authenticated users can insert, update, or delete)
-- Using direct target roles: TO authenticated instead of auth.role() = 'authenticated'

-- user_info policies
create policy "Allow authenticated insert on user_info" on public.user_info for insert to authenticated with check (true);
create policy "Allow authenticated update on user_info" on public.user_info for update to authenticated using (true) with check (true);
create policy "Allow authenticated delete on user_info" on public.user_info for delete to authenticated using (true);

-- projects policies
create policy "Allow authenticated insert on projects" on public.projects for insert to authenticated with check (true);
create policy "Allow authenticated update on projects" on public.projects for update to authenticated using (true) with check (true);
create policy "Allow authenticated delete on projects" on public.projects for delete to authenticated using (true);

-- tools policies
create policy "Allow authenticated insert on tools" on public.tools for insert to authenticated with check (true);
create policy "Allow authenticated update on tools" on public.tools for update to authenticated using (true) with check (true);
create policy "Allow authenticated delete on tools" on public.tools for delete to authenticated using (true);

-- tech_stack policies
create policy "Allow authenticated insert on tech_stack" on public.tech_stack for insert to authenticated with check (true);
create policy "Allow authenticated update on tech_stack" on public.tech_stack for update to authenticated using (true) with check (true);
create policy "Allow authenticated delete on tech_stack" on public.tech_stack for delete to authenticated using (true);

-- education policies
create policy "Allow authenticated insert on education" on public.education for insert to authenticated with check (true);
create policy "Allow authenticated update on education" on public.education for update to authenticated using (true) with check (true);
create policy "Allow authenticated delete on education" on public.education for delete to authenticated using (true);

-- certificates policies
create policy "Allow authenticated insert on certificates" on public.certificates for insert to authenticated with check (true);
create policy "Allow authenticated update on certificates" on public.certificates for update to authenticated using (true) with check (true);
create policy "Allow authenticated delete on certificates" on public.certificates for delete to authenticated using (true);

-- setup policies
create policy "Allow authenticated insert on setup" on public.setup for insert to authenticated with check (true);
create policy "Allow authenticated update on setup" on public.setup for update to authenticated using (true) with check (true);
create policy "Allow authenticated delete on setup" on public.setup for delete to authenticated using (true);
