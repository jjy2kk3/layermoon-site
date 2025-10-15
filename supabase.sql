
create extension if not exists pgcrypto;
create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text not null,
  category text,
  color text,
  size text,
  price numeric default 0,
  status text default 'in',
  image text,
  inbound date,
  created_at timestamp with time zone default now()
);
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  content text,
  created_at timestamp with time zone default now()
);
create table if not exists portfolio (
  id uuid primary key default gen_random_uuid(),
  title text,
  url text not null,
  note text,
  created_at timestamp with time zone default now()
);
