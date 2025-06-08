from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

app = FastAPI()

class UserAuth(BaseModel):
    email: str
    password: str

@app.post("/signup")
async def signup(user: UserAuth):
    url = f"{SUPABASE_URL}/auth/v1/signup"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "email": user.email,
        "password": user.password
    }
    async with httpx.AsyncClient() as client:
        r = await client.post(url, json=payload, headers=headers)
        if r.status_code not in [200, 201]:
            raise HTTPException(status_code=400, detail=r.json())
        return r.json()

@app.post("/signin")
async def signin(user: UserAuth):
    url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "email": user.email,
        "password": user.password
    }
    async with httpx.AsyncClient() as client:
        r = await client.post(url, json=payload, headers=headers)
        if r.status_code not in [200, 201]:
            raise HTTPException(status_code=400, detail=r.json())
        return r.json()