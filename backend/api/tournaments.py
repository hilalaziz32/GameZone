from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from uuid import UUID
from datetime import date
from utils.db_connector import get_supabase_client

router = APIRouter()

class TournamentRequest(BaseModel):
    tournament_name: str
    game_name: str
    created_by_user_id: UUID
    format: str
    start_date: date
    end_date: date
    status: str

@router.post("/create-tournament")
async def create_tournament(data: TournamentRequest):
    supabase = get_supabase_client()

    payload = {
        "tournament_name": data.tournament_name,
        "game_name": data.game_name,
        "created_by_user_id": str(data.created_by_user_id),
        "format": data.format,
        "start_date": data.start_date.isoformat(),
        "end_date": data.end_date.isoformat(),
        "status": data.status,
    }

    result = supabase.rpc("create_tournament", payload).execute()

    if result.error:
        raise HTTPException(status_code=400, detail=result.error.message)

    return {"tournament_id": result.data}
