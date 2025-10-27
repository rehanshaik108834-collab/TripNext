from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os
from dotenv import load_dotenv

load_dotenv()

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

async def get_database() -> AsyncIOMotorDatabase:
    return db