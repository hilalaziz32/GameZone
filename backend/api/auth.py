from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.db_connector import get_supabase_client

router = APIRouter()

class UserAuth(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup(user: UserAuth):
    supabase = get_supabase_client()
    result = supabase.auth.sign_up({
        "email": user.email,
        "password": user.password
    })

    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])

    return result["data"]

@router.post("/signin")
async def signin(user: UserAuth):
    supabase = get_supabase_client()
    result = supabase.auth.sign_in_with_password({
        "email": user.email,
        "password": user.password
    })

    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])

    return result["data"]
