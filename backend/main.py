from utils import get_supabase_client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the Supabase client
supabase_client = get_supabase_client()

# Example usage of the Supabase client
# You can replace this with actual logic
response = supabase_client.table('zones').select('*').execute()
print(response)
