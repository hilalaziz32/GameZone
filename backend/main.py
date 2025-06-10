from utils.db_connector import get_supabase_client
from dotenv import load_dotenv
from api.tournaments import router as tournament_router
from api.zones import router as zone_router
from api.auth import router as auth_router
from fastapi import FastAPI

app = FastAPI()

load_dotenv()

app.include_router(tournament_router, prefix="/tournaments")
app.include_router(zone_router, prefix="/zones")
app.include_router(auth_router, prefix="/auth")













#############################################
# # Get the Supabase client
# supabase_client = get_supabase_client()

# # Example usage of the Supabase client
# # You can replace this with actual logic
# response = supabase_client.table('zones').select('*').execute()
# print(response)
