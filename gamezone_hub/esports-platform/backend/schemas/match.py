from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field

class MatchBase(BaseModel):
    tournament_id: UUID
    team1_id: UUID
    team2_id: UUID
    team1_score: int = Field(default=0, ge=0)
    team2_score: int = Field(default=0, ge=0)
    round: Optional[str] = None
    played_at: Optional[datetime] = None

class MatchCreate(MatchBase):
    pass

class Match(MatchBase):
    id: UUID
    winner_team_id: Optional[UUID] = None
    created_at: datetime

    class Config:
        from_attributes = True
