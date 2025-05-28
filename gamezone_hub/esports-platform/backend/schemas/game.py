from datetime import datetime
from uuid import UUID
from pydantic import BaseModel

class GameBase(BaseModel):
    name: str

class GameCreate(GameBase):
    pass

class Game(GameBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True 