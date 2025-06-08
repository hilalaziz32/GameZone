from typing import List
from uuid import UUID
import asyncpg

# 1. Zones owned by a user
async def get_zone_ids_by_owner(conn: asyncpg.Connection, user_id: UUID) -> List[UUID]:
    rows = await conn.fetch(
        "SELECT zone_id FROM public.fn_get_zone_ids_by_owner($1);",
        user_id
    )
    return [row["zone_id"] for row in rows]

# 2. Teams created by a user
async def get_team_ids_by_creator(conn: asyncpg.Connection, user_id: UUID) -> List[UUID]:
    rows = await conn.fetch(
        "SELECT team_id FROM public.fn_get_team_ids_by_creator($1);",
        user_id
    )
    return [row["team_id"] for row in rows]

# 3. Tournaments created by a user
async def get_tournament_ids_by_creator(conn: asyncpg.Connection, user_id: UUID) -> List[UUID]:
    rows = await conn.fetch(
        "SELECT tournament_id FROM public.fn_get_tournament_ids_by_creator($1);",
        user_id
    )
    return [row["tournament_id"] for row in rows]

# 4. Tournaments in zones owned by a user
async def get_tournament_ids_by_zone_owner(conn: asyncpg.Connection, user_id: UUID) -> List[UUID]:
    rows = await conn.fetch(
        "SELECT tournament_id FROM public.fn_get_tournament_ids_by_zone_owner($1);",
        user_id
    )
    return [row["tournament_id"] for row in rows]

# 5. Matches in tournaments owned by a user
async def get_match_ids_by_zone_owner(conn: asyncpg.Connection, user_id: UUID) -> List[UUID]:
    rows = await conn.fetch(
        "SELECT match_id FROM public.fn_get_match_ids_by_zone_owner($1);",
        user_id
    )
    return [row["match_id"] for row in rows]
