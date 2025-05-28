from datetime import datetime, time
from typing import Optional
from uuid import UUID
from pydantic import BaseModel

class RegionBase(BaseModel):
    name: str
    country: Optional[str] = None

class RegionCreate(RegionBase):
    pass

class Region(RegionBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class ZoneBase(BaseModel):
    name: str
    region_id: UUID
    owner_user_id: UUID
    address: Optional[str] = None
    open_time: Optional[time] = None
    close_time: Optional[time] = None
    description: Optional[str] = None

class ZoneCreate(ZoneBase):
    pass

class Zone(ZoneBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True 