from datetime import datetime
from uuid import UUID
from enum import Enum
from pydantic import BaseModel, EmailStr

class UserRole(str, Enum):
    USER = 'user'
    ADMIN = 'admin'

class ProfileBase(BaseModel):
    email: EmailStr
    role: UserRole = UserRole.USER

class ProfileCreate(ProfileBase):
    id: UUID

class Profile(ProfileBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 