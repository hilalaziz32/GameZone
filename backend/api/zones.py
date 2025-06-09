from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, UUID4, constr
from typing import Optional
import asyncpg
import os


# Pydantic schema for the input
class ZoneCreateRequest(BaseModel):
    p_user_id: UUID4
    p_region_id: UUID4
    p_name: str
    p_address: str
    p_open_time: constr(regex=r"^\d{2}:\d{2}:\d{2}$")  # "HH:MM:SS"
    p_close_time: constr(regex=r"^\d{2}:\d{2}:\d{2}$")
    p_description: Optional[str] = None



# Create Zone Endpoint
@app.post("/zones/")
async def create_zone(data: ZoneCreateRequest):
    try:
        query = """
            SELECT create_zone(
                $1::uuid,
                $2::uuid,
                $3::text,
                $4::text,
                $5::time,
                $6::time,
                $7::text
            ) AS zone_id;
        """
        async with app.state.db.acquire() as conn:
            row = await conn.fetchrow(query,
                                      data.p_user_id,
                                      data.p_region_id,
                                      data.p_name,
                                      data.p_address,
                                      data.p_open_time,
                                      data.p_close_time,
                                      data.p_description)
        return {"zone_id": row["zone_id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))