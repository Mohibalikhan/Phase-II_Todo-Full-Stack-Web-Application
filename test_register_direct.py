#!/usr/bin/env python
"""
Test registration directly against the backend to isolate issues
"""
import requests
import json
import sys

BACKEND = "http://127.0.0.1:8001"

def test_backend_health():
    """Check if backend is running"""
    try:
        r = requests.get(f"{BACKEND}/health", timeout=5)
        print(f"✓ Backend health: {r.status_code} - {r.text}")
        return True
    except Exception as e:
        print(f"✗ Backend not responding: {e}")
        return False

def test_register(email, password):
    """Test registration endpoint"""
    url = f"{BACKEND}/api/auth/register"
    payload = {"email": email, "password": password}
    
    print(f"\nTesting: POST {url}")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        r = requests.post(url, json=payload, timeout=10)
        print(f"\nStatus: {r.status_code}")
        print(f"Headers: {dict(r.headers)}")
        print(f"Response body:\n{r.text}")
        
        if r.status_code == 200:
            data = r.json()
            print(f"\n✓ Registration successful!")
            print(f"Access token: {data.get('access_token', 'N/A')[:50]}...")
            print(f"User: {data.get('user', {})}")
            return True
        else:
            print(f"\n✗ Registration failed with status {r.status_code}")
            try:
                print(f"Error details: {r.json()}")
            except:
                pass
            return False
    except requests.Timeout:
        print(f"✗ Request timeout (>10s) - backend may be hanging")
        return False
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("REGISTRATION TEST - Direct Backend")
    print("=" * 60)
    
    if not test_backend_health():
        print("\n⚠ Backend is not running. Start it first:")
        print("  uvicorn api.index:app --host 127.0.0.1 --port 8001")
        sys.exit(1)
    
    test_register("testuser@example.com", "testpassword123")
