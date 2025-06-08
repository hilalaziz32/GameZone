from datetime import datetime
from uuid import UUID
from enum import Enum
from pydantic import BaseModel

class TeamStatus(str, Enum):
    ACTIVE = 'active'
    PENDING = 'pending'
    INACTIVE = 'inactive'

class TeamBase(BaseModel):
    name: str
    zone_id: UUID
    game_id: UUID
    created_by_user_id: UUID
    status: TeamStatus = TeamStatus.PENDING

class TeamCreate(TeamBase):
    pass

class Team(TeamBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
