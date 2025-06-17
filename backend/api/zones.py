from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, UUID4
from typing import Optional, Annotated
from pydantic import StringConstraints
from utils.db_connector import get_supabase_client

router = APIRouter()
 
PAKISTAN_PHONE_REGEX = r"^(\+92[0-9]{10}|03[0-9]{9})$"

class ZoneCreateRequest(BaseModel):
    p_user_id: UUID4
    p_region_id: UUID4
    p_name: str
    p_address: str
    p_open_time: Annotated[str, StringConstraints(pattern=r"^\d{2}:\d{2}:\d{2}$")]  
    p_close_time: Annotated[str, StringConstraints(pattern=r"^\d{2}:\d{2}:\d{2}$")]
    p_description: Optional[str] = None
    p_phone_number: Annotated[str, StringConstraints(pattern=PAKISTAN_PHONE_REGEX)]

@router.post("/zones")
async def create_zone(data: ZoneCreateRequest):
    supabase = get_supabase_client()

    payload = {
        "p_user_id": str(data.p_user_id),
        "p_region_id": str(data.p_region_id),
        "p_name": data.p_name,
        "p_address": data.p_address,
        "p_open_time": data.p_open_time,
        "p_close_time": data.p_close_time,
        "p_description": data.p_description,
        "p_phone_number": data.p_phone_number,  
    }

    result = supabase.rpc("create_zone", payload).execute()

    if result.error:
        raise HTTPException(status_code=400, detail=result.error.message)

    return {"zone_id": result.data}
