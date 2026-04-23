-- SOLVE Platform Database Schema
-- Execute this in your Supabase SQL Editor

-- 1. Profiles Table (RBAC)
-- Links to Supabase Auth users
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text check (role in ('Admin', 'Editor', 'Viewer')) default 'Viewer',
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can update their own profiles." on public.profiles
  for update using (auth.uid() = id);

-- 2. Articles (News/Blog)
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  featured_image text,
  status text check (status in ('Draft', 'Published')) default 'Draft',
  published_at timestamp with time zone,
  author_id uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.articles enable row level security;

create policy "Published articles are viewable by everyone." on public.articles
  for select using (status = 'Published');

create policy "Admins and Editors can manage all articles." on public.articles
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('Admin', 'Editor')
    )
  );

-- 3. Events
create table public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  event_date timestamp with time zone,
  location text,
  featured_image text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.events enable row level security;

create policy "Events are viewable by everyone." on public.events
  for select using (true);

create policy "Admins can manage events." on public.events
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'Admin'
    )
  );

-- 4. Event Images (Gallery)
create table public.event_images (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references public.events(id) on delete cascade,
  url text not null,
  caption text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.event_images enable row level security;

create policy "Event images are viewable by everyone." on public.event_images
  for select using (true);

create policy "Admins can manage event images." on public.event_images
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'Admin'
    )
  );

-- 5. Resources
create table public.resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  file_url text not null,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.resources enable row level security;

create policy "Resources are viewable by everyone." on public.resources
  for select using (true);

-- 6. Team Members
create table public.team_members (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  position text,
  email text,
  phone text,
  image_url text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.team_members enable row level security;

create policy "Team directory is viewable by everyone." on public.team_members
  for select using (true);

-- 7. Submissions
create table public.submissions (
  id uuid default gen_random_uuid() primary key,
  form_type text,
  payload jsonb,
  status text default 'New',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.submissions enable row level security;

create policy "Admins can view submissions." on public.submissions
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'Admin'
    )
  );
