create table public.games (
  id uuid not null default gen_random_uuid (),
  name text not null,
  created_at timestamp with time zone not null default now(),
  constraint games_pkey primary key (id),
  constraint games_name_key unique (name)
) TABLESPACE pg_default;

create table public.matches (
  id uuid not null default gen_random_uuid (),
  tournament_id uuid not null,
  team1_id uuid not null,
  team2_id uuid not null,
  team1_score integer not null default 0,
  team2_score integer not null default 0,
  winner_team_id uuid null,
  round text null,
  played_at timestamp with time zone null,
  created_at timestamp with time zone not null default now(),
  constraint matches_pkey primary key (id),
  constraint matches_team1_id_fkey foreign KEY (team1_id) references teams (id) on delete CASCADE,
  constraint matches_team2_id_fkey foreign KEY (team2_id) references teams (id) on delete CASCADE,
  constraint matches_tournament_id_fkey foreign KEY (tournament_id) references tournaments (id) on delete CASCADE,
  constraint matches_winner_team_id_fkey foreign KEY (winner_team_id) references teams (id),
  constraint matches_team1_score_check check ((team1_score >= 0)),
  constraint matches_team2_score_check check ((team2_score >= 0))
) TABLESPACE pg_default;

create index IF not exists idx_matches_tournament_id on public.matches using btree (tournament_id) TABLESPACE pg_default;

create index IF not exists idx_matches_team1_id on public.matches using btree (team1_id) TABLESPACE pg_default;

create index IF not exists idx_matches_team2_id on public.matches using btree (team2_id) TABLESPACE pg_default;

create index IF not exists idx_matches_winner_team_id on public.matches using btree (winner_team_id) TABLESPACE pg_default;

create index IF not exists idx_matches_played_at on public.matches using btree (played_at) TABLESPACE pg_default;

create index IF not exists idx_matches_team1_team2 on public.matches using btree (team1_id, team2_id) TABLESPACE pg_default;



create table public.profiles (
  id uuid not null,
  email text not null,
  role public.user_role not null default 'user'::user_role,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_email_key unique (email),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;


create table public.regions (
  id uuid not null default gen_random_uuid (),
  name text not null,
  country text null,
  created_at timestamp with time zone not null default now(),
  constraint regions_pkey primary key (id),
  constraint regions_name_key unique (name)
) TABLESPACE pg_default;

create table public.teams (
  id uuid not null default gen_random_uuid (),
  name text not null,
  zone_id uuid not null,
  game_id uuid not null,
  created_by_user_id uuid not null,
  status text not null default 'pending'::text,
  created_at timestamp with time zone not null default now(),
  constraint teams_pkey primary key (id),
  constraint teams_name_game_id_zone_id_key unique (name, game_id, zone_id),
  constraint teams_created_by_user_id_fkey foreign KEY (created_by_user_id) references profiles (id) on delete RESTRICT,
  constraint teams_game_id_fkey foreign KEY (game_id) references games (id) on delete CASCADE,
  constraint teams_zone_id_fkey foreign KEY (zone_id) references zones (id) on delete CASCADE,
  constraint teams_status_check check (
    (
      status = any (
        array['active'::text, 'pending'::text, 'inactive'::text]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_teams_zone_id on public.teams using btree (zone_id) TABLESPACE pg_default;

create index IF not exists idx_teams_game_id on public.teams using btree (game_id) TABLESPACE pg_default;

create index IF not exists idx_teams_created_by_user_id on public.teams using btree (created_by_user_id) TABLESPACE pg_default;

create index IF not exists idx_teams_status on public.teams using btree (status) TABLESPACE pg_default;

create index IF not exists idx_teams_game_zone on public.teams using btree (game_id, zone_id) TABLESPACE pg_default;


create table public.tournament_teams (
  tournament_id uuid not null,
  team_id uuid not null,
  approved boolean not null default false,
  constraint tournament_teams_pkey primary key (tournament_id, team_id),
  constraint tournament_teams_team_id_fkey foreign KEY (team_id) references teams (id) on delete CASCADE,
  constraint tournament_teams_tournament_id_fkey foreign KEY (tournament_id) references tournaments (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_tournament_teams_team_id on public.tournament_teams using btree (team_id) TABLESPACE pg_default;


create table public.tournaments (
  id uuid not null default gen_random_uuid (),
  name text not null,
  zone_id uuid not null,
  game_id uuid not null,
  created_by_user_id uuid not null,
  status public.tournament_status not null default 'upcoming'::tournament_status,
  format public.tournament_format not null,
  start_date date not null,
  end_date date null,
  created_at timestamp with time zone not null default now(),
  constraint tournaments_pkey primary key (id),
  constraint tournaments_name_zone_id_key unique (name, zone_id),
  constraint tournaments_created_by_user_id_fkey foreign KEY (created_by_user_id) references profiles (id) on delete RESTRICT,
  constraint tournaments_game_id_fkey foreign KEY (game_id) references games (id) on delete CASCADE,
  constraint tournaments_zone_id_fkey foreign KEY (zone_id) references zones (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_tournaments_game_id on public.tournaments using btree (game_id) TABLESPACE pg_default;

create index IF not exists idx_tournaments_zone_id on public.tournaments using btree (zone_id) TABLESPACE pg_default;

create index IF not exists idx_tournaments_status on public.tournaments using btree (status) TABLESPACE pg_default;

create index IF not exists idx_tournaments_start_date on public.tournaments using btree (start_date) TABLESPACE pg_default;


create table public.zones (
  id uuid not null default gen_random_uuid (),
  name text not null,
  region_id uuid not null,
  owner_user_id uuid not null,
  created_at timestamp with time zone not null default now(),
  address text null,
  open_time time without time zone null,
  close_time time without time zone null,
  description text null,
  constraint zones_pkey primary key (id),
  constraint zones_name_region_id_key unique (name, region_id),
  constraint zones_owner_user_id_fkey foreign KEY (owner_user_id) references profiles (id) on delete RESTRICT,
  constraint zones_region_id_fkey foreign KEY (region_id) references regions (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_zones_region_id on public.zones using btree (region_id) TABLESPACE pg_default;

create index IF not exists idx_zones_owner_user_id on public.zones using btree (owner_user_id) TABLESPACE pg_default;