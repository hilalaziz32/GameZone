from datetime import datetime, date
from typing import Optional, List
from uuid import UUID
from enum import Enum
from pydantic import BaseModel

class TournamentStatus(str, Enum):
    UPCOMING = 'upcoming'
    ONGOING = 'ongoing'
    COMPLETED = 'completed'

class TournamentFormat(str, Enum):
    SINGLE_ELIMINATION = 'single_elimination'
    DOUBLE_ELIMINATION = 'double_elimination'
    ROUND_ROBIN = 'round_robin'

class TournamentBase(BaseModel):
    name: str
    zone_id: UUID
    game_id: UUID
    created_by_user_id: UUID
    status: TournamentStatus = TournamentStatus.UPCOMING
    format: TournamentFormat
    start_date: date
    end_date: Optional[date] = None

class TournamentCreate(TournamentBase):
    pass

class Tournament(TournamentBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class TournamentTeam(BaseModel):
    tournament_id: UUID
    team_id: UUID
    approved: bool = False

    class Config:
        from_attributes = True
