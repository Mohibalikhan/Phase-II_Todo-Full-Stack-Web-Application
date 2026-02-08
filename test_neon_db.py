#!/usr/bin/env python
"""
Test Neon DB connection
"""
import os
from dotenv import load_dotenv
import pathlib

# Load from api/.env.local
api_dir = pathlib.Path(__file__).parent / "api"
load_dotenv(api_dir / ".env.local")

DATABASE_URL = os.getenv("DATABASE_URL")

print("="*60)
print("NEON DB CONNECTION TEST")
print("="*60)

if not DATABASE_URL:
    print("❌ DATABASE_URL not found in api/.env.local")
    exit(1)

print(f"✓ DATABASE_URL found")
print(f"  Host: {DATABASE_URL.split('@')[1].split('/')[0] if '@' in DATABASE_URL else 'N/A'}")

# Try to connect
try:
    from sqlalchemy import create_engine, text
    from sqlalchemy.pool import NullPool
    
    print("\nConnecting to Neon DB...")
    engine = create_engine(DATABASE_URL, poolclass=NullPool, echo=False)
    
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version();"))
        db_version = result.fetchone()[0]
        print(f"✓ Connected successfully!")
        print(f"  Database: {db_version.split(',')[0]}")
        
        # Check if tables exist
        result = conn.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """))
        tables = [row[0] for row in result.fetchall()]
        print(f"\n✓ Tables in database: {len(tables)}")
        for table in tables:
            print(f"  - {table}")
        
        if not tables:
            print("  ⚠ No tables found - need to run init_db.py")
        
except Exception as e:
    print(f"❌ Connection failed!")
    print(f"Error: {str(e)}")
    import traceback
    traceback.print_exc()
    exit(1)

print("\n" + "="*60)
print("NEON DB IS WORKING! ✓")
print("="*60)
