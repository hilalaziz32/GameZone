from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from utils.db_connector import get_supabase_client
from api.tournaments import router as tournament_router
from api.auth import router as auth_router
from api.zones import router as zones_router

app = FastAPI()

load_dotenv()

# 1. Add CORS middleware **before** including routers!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # for your Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Now include routers
app.include_router(tournament_router, prefix="/tournaments")
app.include_router(auth_router, prefix="/auth")
app.include_router(zones_router, prefix="/zones")



#############################################
# # Get the Supabase client
# supabase_client = get_supabase_client()

# # Example usage of the Supabase client
# # You can replace this with actual logic
# response = supabase_client.table('zones').select('*').execute()
# print(response)
